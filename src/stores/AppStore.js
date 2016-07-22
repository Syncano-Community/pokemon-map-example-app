import { observable, computed, transaction, action } from 'mobx'
import Syncano from 'syncano';
import PokeApi from 'pokeapi';

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
  @observable hasInitialDataLoaded = false;

  constructor(makers){
    this.markers = [];
  }

  fetchMarkers = () => {
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
      this.hasInitialDataLoaded = true;
    });
  }

  fetchPokemons = () => {
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

  getPokemonInfo = (marker_id = 1) => {
    return _.find(this.pokemons, { pokemon_id: marker_id });
  }

  handleSearchTerm = (marker) => {
    return marker.pokemon && _.toLower(marker.pokemon.name).includes(_.toLower(this.term));
  }

  setSearchTerm = (term) => {
    this.term = term;
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
