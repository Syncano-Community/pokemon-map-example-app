import { observable } from 'mobx'
import Syncano from 'syncano';

import _ from 'lodash';
import { default as update } from 'react-addons-update';

const connection = Syncano({
    apiKey: 'e100bf4efdd60b25430071ec5b146aac4e6a33d3',
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
  @observable popover = { show: false, position: {}};

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
      const markers = _.map(objects, (marker) => {
        return marker.geo && marker.pokemon_id && this.setMarkerObj(marker);
      });
      this.markers = markers;
    });
  }

  fetchPokemons = () => {
    console.info('::fetchPokemons');
    const { DataObject } = connection;
    let objects = [];

    const all = DataObject.please({className: 'pokemons'}).all({}, {}, true, Infinity);

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

  setMarkerObj(marker) {
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
  }

  setSearchTerm = (term = '') => {
    this.term = term;
  }

  setCenterMap = (position) => {
    _.map(this.markers, (marker) => {
      marker.showInfo = false;
    })
    this.centerMap = position;
    this.zoomMap = 6;
  }

  openPopover = (event) => {
    this.setPosition = event.latLng;
    this.popover.position = event.pixel;
    this.popover.show = true;
  }

  addPokemon = (pokemon) => {
    const { DataObject } = connection;
    const newPokemon = {
          geo: {
            latitude: this.setPosition.lat(),
            longitude: this.setPosition.lng()
          },
          key: this.markers.length,
          pokemon_id: pokemon.id
        };

    DataObject.please({className: 'markers'}).create(newPokemon)
      .then(() => {
        this.popover.show = false;
      });
    
    this.fetchMarkers();
  }
}

export default AppStore;
