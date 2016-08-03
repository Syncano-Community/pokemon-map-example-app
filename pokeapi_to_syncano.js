var Syncano = require('syncano'); // CommonJS
var PokeApi = require('pokeapi');

var connection = Syncano({
  apiKey: '<YOUR_API_KEY>',
  defaults: {
    instanceName: '<YOUR_INSTANCE_NAME>',
    className: 'pokemons'
  }
});
var api = PokeApi.v1();
var dataObjects = [];
var pokemons = [];

const toSyncano = function() {
  connection.DataObject
    .please()
    .bulkCreate(dataObjects)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

for (var i = 1; i <= 151; i++) {
  api.get('pokemon', i)
  .then(function(response) {
    console.log(response);
    var types = [];
    response.types.forEach((type) => { types.push(type.name) });
    connection.DataObject.please().create({
      pokemon_id: response.national_id,
      name: response.name,
      type: types,
      image_url: 'http://pokeapi.co/media/sprites/pokemon/' + response.national_id + '.png'
    });
  })
}
