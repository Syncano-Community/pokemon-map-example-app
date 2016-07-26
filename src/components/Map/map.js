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
    this.getPosition();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  getPosition() {
    const { appState } = this.props;

    navigator.geolocation.getCurrentPosition((position) => {
      const lat  = position.coords.latitude;
      const lng = position.coords.longitude;

      appState.setCenterMap({lat, lng});
    });
  }

  handleWindowResize() {
    console.info('handleWindowResize', this._googleMapComponent);
    triggerEvent(this._googleMapComponent, 'resize');
  }

  handleMarkerClick(marker) {
    marker.showInfo = !marker.showInfo;
    this.props.appState.setCenterMap(marker.position);
  }

  render() {
    const { appState } = this.props;

    return (
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              height: 'calc(100% - 50px)',
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            defaultZoom={3}
            zoom={appState.zoomMap}
            defaultCenter={{ lat: 25.363882, lng: 135.044922 }}
            center={ appState.centerMap }
            onZoomChanged={() => appState.setSearchTerm()}
          >
            <MarkerClusterer
              averageCenter
              minimumClusterSize={3}
              gridSize={ 60 }
            >
              {appState.markers && _.map(appState.markers, (marker, index) => {
                return (
                  <Marker
                    {...marker}
                    onClick={this.handleMarkerClick.bind(this, marker)}
                    visible={appState.handleSearchTerm(marker)}
                    icon={marker.pokemon.image_url}
                  >
                    {marker.showInfo && appState.handleSearchTerm(marker) && 
                    <InfoWindow>
                      {marker.pokemon && (
                        <div>
                          {marker.pokemon.name}
                          {marker.pokemon.types.map((type) => type)}
                        </div>
                      )}
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
