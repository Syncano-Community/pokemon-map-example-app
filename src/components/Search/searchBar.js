import React, { Component } from 'react';
import update from 'react-addons-update';
import { observer, inject } from 'mobx-react';

import _ from 'lodash';

import { AutoComplete, Paper, MenuItem, Avatar } from 'material-ui';
import Download from 'material-ui/svg-icons/file/file-download';


@inject('appState') @observer
class SearchBar extends Component {

  constructor(props, context) {
    super(props, context);
  }

  renderMenuItems() {
    const { appState } = this.props;

    return _.map(appState.markers, (marker, index) => ({
      text: marker.pokemon.name,
      value:
        <MenuItem 
          key={index}
          primaryText={marker.pokemon.name}
          secondaryText={_.map(marker.pokemon.type, (type) => `${type} `)}
          style={{ lineHeight: '75px' }}
          onTouchTap={() => appState.setCenterMap(marker.position)}
          leftIcon={
            <Avatar 
              style={{ 
                backgroundImage: `url(${marker.pokemon.image_url})`,
                backgroundPosition: 'center',
                backgroundSize: '50px 50px',
                width: '50px',
                height: '50px',
                borderRadius: '50%'
              }}/>}
            />
    }));
  }

  render() {
    const { appState } = this.props;

    const styles = {
      paper: {
        display: 'inline-block',
        float: 'left'
    }};

    return (
      <Paper style={styles.paper}>
        <AutoComplete
          floatingLabelText="Where Pokemon was visible!"
          fullWidth={false}
          openOnFocus={true}
          filter={(searchText, key) => _.toLower(key).includes(_.toLower(searchText))}
          maxSearchResults={10}
          style={{margin: '0 15'}}
          onNewRequest={(value) => appState.setSearchTerm(value.text)}
          dataSource={this.renderMenuItems()}
        />
      </Paper>
    );
  }
}

export default SearchBar;
