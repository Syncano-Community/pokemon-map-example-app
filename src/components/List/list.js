import React, { Component } from 'react';
import update from 'react-addons-update';
import { observer, inject } from 'mobx-react';

import _ from 'lodash';

import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import { Paper, Menu, MenuItem } from 'material-ui';
import SearchBar from './../Search/searchBar';


@inject('appState') @observer
class List extends Component {

  constructor(props, context) {
    super(props, context);
  }

  renderMenuItems() {
    const { appState } = this.props;

    return _.map(appState.markers, (marker, index) => {
      return (
        index < 10 && this.props.appState.handleSearchTerm(marker) &&
          <MenuItem 
            primaryText={marker.pokemon_id}
            leftIcon={<RemoveRedEye />}
            key={marker.key}
          />
      )
    })
  }

  render() {
    const styles = {
      paper: {
        display: 'inline-block',
        float: 'left',
        margin: '16px 32px 16px 0',
    }};

    return (
      <div>
        <Paper style={styles.paper}>
        <SearchBar />
          <Menu>
            {this.renderMenuItems()}
          </Menu>
        </Paper>
      </div>
    );
  }
}

export default List;
