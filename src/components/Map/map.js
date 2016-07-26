import React, { Component } from 'react';
import update from 'react-addons-update';
import { observer, inject } from 'mobx-react';

import _ from 'lodash';

import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { default as MarkerClusterer } from 'react-google-maps/lib/addons/MarkerClusterer';
import { triggerEvent } from 'react-google-maps/lib/utils';
import AddPopover from '../AddPopover/AddPopover';

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
    const typeColorStyle = {
      normal: '#ccc',
      flying: 'rgb(75, 204, 245)',
      bug: 'rgb(132, 0, 0)',
      poison: 'rgb(77, 134, 48)',
      fighting: 'rgb(115, 0, 0)',
      ground: 'rgb(17, 49, 0)',
      rock: 'rgb(109, 109, 109)',
      ghost: 'rgba(99, 99, 99, 0.11)',
      steel: 'rgb(208, 208, 208)',
      fire: 'rgb(173, 0, 0)',
      water: 'rgb(0, 141, 226)',
      grass: 'rgb(29, 202, 0)',
      electric: 'rgb(178, 202, 0)',
      psychic: 'rgb(154, 0, 247)',
      ice: 'rgb(195, 246, 255)',
      dragon: 'rgb(245, 0, 0)',
      dark: 'rgb(43, 43, 43)',
      fairy: 'rgb(255, 202, 0)',
      unknown: '#fff',
      shadow: 'rgb(195, 195, 195)',
    };

    return (
      <div>
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
              onRightclick={appState.openPopover}
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
                          <div style={{ fontSize: 20 }}>
                            {marker.pokemon.name}
                            {marker.pokemon.types.map((type, index) =>
                              <div 
                                style={{
                                  backgroundColor: typeColorStyle[type] || null,
                                  padding: 5,
                                  margin: '5 0',
                                  textTransform: 'capitalize',
                                  color: '#fff'}}
                                key={index}
                              >
                                  {type}
                              </div>
                            )}
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
        <AddPopover/>
      </div>
    );
  }
}

export default Map;
