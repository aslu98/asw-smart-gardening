# aws-smart-gardening

## Project setup
```
npm install
```

Create MongoDB database and import collections:
Go inside mongodb/bin

```
mongoimport --collection Gardens --db smart-gardening ./path/to/gardens.json
mongoimport --collection Gardeners --db smart-gardening ./path/to/gardeners.json
mongoimport --collection Maintenances --db smart-gardening ./path/to/maintenances.json
mongoimport --collection Sensors --db smart-gardening ./path/to/sensors.json
```
