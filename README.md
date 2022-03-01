# Setup

1. Scaricare il repository in locale.
2. Importare le collections presenti all'interno della cartella ./mongodb-collections su mongodb attraverso usando il seguente comando.
```
mongoimport --collection gardens --db smart-gardening ./path/to/gardens.json
mongoimport --collection gardeners --db smart-gardening ./path/to/gardeners.json
mongoimport --collection maintenances --db smart-gardening ./path/to/maintenances.json
mongoimport --collection sensors --db smart-gardening ./path/to/sensors.json
```
3. Entrare all'interno della cartella ./code con una console in cui è possibile utilizzare i comandi NPM e lanciare il comando `npm install`; aspettare che venga completata l'installazione dei package richiesti dall'applicazione
5. Rimanendo all'interno della cartella ./code, sempre da console, lanciare il comando node index.js; aspettare il messaggio da parte del server che comunica di essere in ascolto sulla porta 3000
6. Aprire il proprio browser e digitare l'indirizzo http://localhost:3000/. Ora potete utilizzare GardenCare!
