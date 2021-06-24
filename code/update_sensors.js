const axios = require('axios');
const DBURL = "http://localhost:3000/api"

const flag_options = [
    {
        fieldname: "Temperature",
        max_value: 30,
        min_value: 5,
    },
    {
        fieldname: "Humidity",
        max_value: 65,
        min_value: 35,
    }
]

function update_sensors(){
    let updated_sensors = 0;

    axios.get(DBURL + "/sensors")
        .then(sensors_response => {
            let sensors = sensors_response.data
            for (let i = 0; i < sensors.length; i++){
                axios.get("https://api.thingspeak.com/channels/"
                    + sensors[i].API + "/fields/"
                    + sensors[i].APIfield + "/last.json")
                    .then(update_response => {
                        let value = parseInt(update_response.data[sensors[i].APIfield]).toFixed(0)
                        let opt = flag_options.filter(o => o.fieldname == sensors[i].fieldname)[0]
                        let body = {
                            API: sensors[i].API,
                            APIfield: sensors[i].APIfield,
                            value: value,
                            flagOn: (value > opt.max_value || value < opt.min_value)
                        }
                        axios.post(DBURL +'/sensors', body)
                            .then(_ => {
                                updated_sensors++
                                if (updated_sensors == sensors.length){
                                    console.log("All sensors updated")
                                }
                            })
                            .catch(error => (console.log(error)));
                        if (body.flagOn != sensors[i].flagOn){
                            console.log("new flag")
                            if (body.flagOn){
                                axios.get(DBURL + "/gardens/"+ sensors[i].garden +"/addFlag")
                                    .catch(error => (console.log(error)));
                            } else {
                                axios.get(DBURL + "/gardens/"+ sensors[i].garden +"/removeFlag")
                                    .catch(error => (console.log(error)));
                            }
                        }
                    })
                    .catch(error => (console.log(error)));
            }
        })
        .catch(error => (console.log(error)));
    process.send({news: "sensors updating"});
}

update_sensors()
setInterval(update_sensors, 300000); //update ogni 5 minuti
