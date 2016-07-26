import React from 'react';
import { observer, inject } from 'mobx-react';

import { RaisedButton, Avatar, Popover, PopoverAnimationVertical, AutoComplete, Menu, MenuItem } from 'material-ui';

@inject('appState') @observer
class AddPopover extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(event) {
    if (event.keyCode == 27 /*esc*/) {
      this.props.appState.popover.show = false;
    }
  }

  renderMenuItems() {
    const { appState } = this.props;

    return _.map(appState.pokemons, (pokemon, index) => ({
      text: pokemon.name,
      id: pokemon.pokemon_id,
      value:
        <MenuItem 
          key={index}
          primaryText={pokemon.name}
          secondaryText={_.map(pokemon.type, (type) => `${type} `)}
          style={{ lineHeight: '75px' }}
          leftIcon={
            <Avatar 
              style={{ 
                backgroundImage: `url(${pokemon.image_url})`,
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

    return (
      <Popover
        open={appState.popover.show}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        animation={PopoverAnimationVertical}
        zDepth={2}
        style={{ marginTop: appState.popover.position.y, marginLeft: appState.popover.position.x }}
      >
        <AutoComplete
          hintText="Type pokemon name"
          filter={(searchText, key) => _.toLower(key).includes(_.toLower(searchText))}
          maxSearchResults={10}
          style={{margin: '0 15'}}
          onNewRequest={(pokemon) => appState.addPokemon(pokemon)}
          dataSource={this.renderMenuItems()}
          ref={function(input) {
              input && input.focus();
          }}
        />
      </Popover>
    );
  }
}

export default AddPopover;
