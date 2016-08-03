var Syncano = require('syncano'); // CommonJS
var connection = Syncano({
  apiKey: '<YOUR_API_KEY>',
  defaults: {
    instanceName: '<YOUR_INSTANCE_NAME>',
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