# aws-smart-gardening

## Project setup
```
npm install
```

Create MongoDB database and import collections: go inside mongodb/bin, use json files from directory mongodb-collections

```
mongoimport --collection gardens --db smart-gardening ./path/to/gardens.json
mongoimport --collection gardeners --db smart-gardening ./path/to/gardeners.json
mongoimport --collection maintenances --db smart-gardening ./path/to/maintenances.json
mongoimport --collection sensors --db smart-gardening ./path/to/sensors.json
```


Util to export mongodbcollections

```
mongoexport --collection=gardens --db=smart-gardening --out=gardens.json
mongoexport --collection=gardeners --db=smart-gardening --out=gardeners.json
mongoexport --collection=maintenances --db=smart-gardening --out=maintenances.json
mongoexport --collection=sensors --db=smart-gardening --out=sensors.json
```
