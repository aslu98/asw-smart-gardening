# aws-smart-gardening

## Project setup
```
npm install
```

Create MongoDB database and import collections: go inside mongodb/bin, use json files from directory mongodb-collections

```
mongoimport --collection Gardens --db smart-gardening ./path/to/gardens.json
mongoimport --collection Gardeners --db smart-gardening ./path/to/gardeners.json
mongoimport --collection Maintenances --db smart-gardening ./path/to/maintenances.json
mongoimport --collection Sensors --db smart-gardening ./path/to/sensors.json
```
