const axios = require('axios');
const express = require('express');
const DBURL = "http://localhost:3000/api"
const controller = require('./src/controllers/gardeningController');

const update_app = express();
update_app.route('/api/sensors/:API/:APIfield/:value')
    .get(controller.update_sensor)

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

    axios.get(DBURL + "/sensors/")
        .then(sensors_response => {
            let sensors = sensors_response.data
            for (let i = 0; i < sensors.length; i++){
                axios.get("https://api.thingspeak.com/channels/"
                    + sensors[i].API + "/fields/"
                    + sensors[i].APIfield + "/last.json")
                    .then(update_response => {
                        let value = parseInt(update_response.data[sensors[i].APIfield]).toFixed(0)
                        axios.get(DBURL +'/sensors/'
                            + sensors[i].API +'/'
                            + sensors[i].APIfield+'/'
                            + value)
                            .then(updated_sensor_response => {
                                console.log("updated sensors: " + ++updated_sensors)
                            })
                            .catch(error => (console.log(error)));
                    })
                    .catch(error => (console.log(error)));
            }
        })
        .catch(error => (console.log(error)));
    process.send({news: "sensors updating"});
}

update_sensors()
setInterval(update_sensors, 300000); //update ogni 5 minuti
