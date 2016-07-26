var Syncano = require('syncano'); // CommonJS
var connection = Syncano({
  baseUrl: 'https://api.syncano.io',
  accountKey: '35a804b63e6b00d0abb5af3e104edebbc9d719a0',
  defaults: {
    instanceName: 'pokemon-map',
    className: 'markers'
  }
});
var dataObjects = [];
for (var i = 0; i <= 100; i++) {
  dataObjects.push(connection.DataObject({
    geo: {
      'latitude': Math.floor(Math.random() * (85 - (-85))) - 85,
      'longitude': Math.floor(Math.random() * (180 - (-180))) - 180
    },
    pokemon_id: Math.floor(Math.random() * (151 - 1)) + 1
  }));
}
console.log(dataObjects.length);
connection.DataObject
  .please()
  .bulkCreate(dataObjects)
  .then((response) => console.log(response))
  .catch((error) => console.log(error));