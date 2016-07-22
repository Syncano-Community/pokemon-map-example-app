import React, { Component } from 'react';
import update from 'react-addons-update';
import { observer, inject } from 'mobx-react';

import _ from 'lodash';

import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { default as MarkerClusterer } from 'react-google-maps/lib/addons/MarkerClusterer';
import { triggerEvent } from 'react-google-maps/lib/utils';

@inject('appState') @observer
class Map extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleWindowResize = _.throttle(this.handleWindowResize, 500);
  }

  componentDidMount() {
    this.props.appState.fetchPokemons();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize() {
    console.info('handleWindowResize', this._googleMapComponent);
    triggerEvent(this._googleMapComponent, 'resize');
  }

  handleMapClick = (event) => {
    const { appState } = this.props;

    appState.markers.push({
      position: event.latLng,
      defaultAnimation: 2,
      key: Date.now()
    });
  }

  handleMarkerClick(marker) {
    marker.showInfo = !marker.showInfo;
  }

  render() {
    const { appState } = this.props;

    return (
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              height: '100%',
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => (this._googleMapComponent = map) && console.log(map.getZoom())}
            defaultZoom={3}
            defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
            // onClick={this.handleMapClick}
          >
            <MarkerClusterer
              averageCenter
              enableRetinaIcons
              gridSize={ 60 }
            >
              {_.map(appState.markers, (marker, index) => {
                return (
                  <Marker
                    {...marker}
                    onClick={this.handleMarkerClick.bind(this, marker)}
                    visible={this.props.appState.handleSearchTerm(marker)}
                    icon={marker.pokemon.image_url || null}
                  >
                    {marker.showInfo && this.props.appState.handleSearchTerm(marker) && <InfoWindow 
                      onClick={this.handleClick}
                    >
                      {marker.pokemon ? marker.pokemon.name : 'Undefined :O'}
                    </InfoWindow>}
                  </Marker>
                );
              })}
            </MarkerClusterer>
          </GoogleMap>
        }
      />
    );
  }
}

export default Map;
