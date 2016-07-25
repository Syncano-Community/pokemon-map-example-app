import { observable } from 'mobx'
import Syncano from 'syncano';

import _ from 'lodash';

const connection = Syncano({
    baseUrl: 'https://api.syncano.rocks',
    apiKey: '3287b43491f3ebefa95bcb91e76c62a701f3c09b',
    defaults: {
      instanceName: 'pokemon-map'
  }
});

class AppStore {
  @observable markers = [];
  @observable pokemons = [];
  @observable term = '';
  @observable centerMap = { lat: 0, lng: 0 };
  @observable zoomMap = 3;

  constructor(){
    this.markers = [];
  }

  fetchMarkers = () => {
    console.info('::fetchMarkers');
    const { DataObject } = connection;
    let objects = [];

    const all = DataObject.please({className: 'markers'}).all({}, {}, true, Infinity);

    all.on('page', function(page) {
      objects = [...objects, ...page];
    });

    all.on('stop', () => {
      console.log('all::page', objects.length);
      const markers = _.map(objects, (marker, index) => {
        return {
          position: {
            lat: marker.geo.latitude,
            lng: marker.geo.longitude
          },
          key: marker.id,
          defaultAnimation: 2,
          showInfo: false,
          pokemon: this.getPokemonInfo(marker.pokemon_id)
        }
      });
      this.markers = markers;
    });
  }

  fetchPokemons = () => {
    console.info('::fetchPokemons');
    const { DataObject } = connection;
    let objects = [];

    const all = DataObject.please({className: 'pokemon'}).all({}, {}, true, Infinity);

    all.on('page', function(page) {
      objects = [...objects, ...page];
    });

    all.on('stop', () => {
      this.pokemons = objects;
      this.fetchMarkers();
    });
  }

  getPokemonInfo = (marker_pokemon_id = 1) => {
    console.info('::getPokemonInfo');
    return _.find(this.pokemons, { pokemon_id: marker_pokemon_id });
  }

  handleSearchTerm = (marker) => {
    return marker.pokemon && _.toLower(marker.pokemon.name).includes(_.toLower(this.term));
  }

  setSearchTerm = (term) => {
    this.term = term;
  }

  setCenterMap = (position) => {
    this.centerMap = position;
    this.zoomMap = 6;
  }

  // addTodo(text) {
  //   const marker = {
  //     id: this.markers.length,
  //     text,
  //     other: null
  //   }
  //   this.markers.unshift(marker)
  //   return marker
  // }

}

export default AppStore;
