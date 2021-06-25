const axios = require('axios');
const DBURL = "http://localhost:3000/api"

const flag_options = [
    {
        fieldname: "Temperature",
        max_value: 28,
        min_value: 7,
    }, {
        fieldname: "Humidity",
        max_value: 65,
        min_value: 35,
    }, {
        fieldname: "TVOC",
        max_value: 10,
        min_value: 0,
    }, {
        fieldname: "O2",
        max_value: 21.5,
        min_value: 20,
    },{
        fieldname: "Gamma",
        max_value: 22.5,
        min_value: 0,
    },
]

function update_sensors(){
    let updated_sensors = 0;
    let new_flags = 0;
    axios.get(DBURL + "/sensors")
        .then(sensors_response => {
            let sensors = sensors_response.data
            for (let i = 0; i < sensors.length; i++){
                axios.get("https://api.thingspeak.com/channels/"
                    + sensors[i].API + "/fields/"
                    + sensors[i].APIfield + "/last.json")
                    .then(update_response => {
                        let value = parseFloat(update_response.data[sensors[i].APIfield]).toFixed(1)
                        let opt = flag_options.filter(o => o.fieldname == sensors[i].fieldname)[0]
                        let body = {
                            API: sensors[i].API,
                            APIfield: sensors[i].APIfield,
                            value: value,
                            flagOn: (value > opt.max_value || value < opt.min_value)
                        }
                        if (body.flagOn != sensors[i].flagOn){
                            new_flags++
                            if (body.flagOn){
                                axios.get(DBURL + "/gardens/"+ sensors[i].garden +"/addFlag")
                                    .catch(error => (console.log(error)));
                            } else {
                                axios.get(DBURL + "/gardens/"+ sensors[i].garden +"/removeFlag")
                                    .catch(error => (console.log(error)));
                            }
                        }
                        axios.post(DBURL +'/sensors', body)
                            .then(_ => {
                                updated_sensors++
                                if (updated_sensors == sensors.length){
                                    console.log("All sensors updated ("+ new_flags +" new flags).")
                                }
                            })
                            .catch(error => console.log("thingspeak API error"));
                    })
                    .catch(error => (console.log(error)));
            }
        })
        .catch(error => (console.log(error)));
}

update_sensors()
setInterval(update_sensors, 300000); //update ogni 5 minuti
