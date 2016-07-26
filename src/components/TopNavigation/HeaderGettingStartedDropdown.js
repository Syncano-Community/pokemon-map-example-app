import React, { Component } from 'react';
import { FlatButton, Popover, Menu, MenuItem, FontIcon } from 'material-ui';

class HeaderGettingStartedDropdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  getStyles() {
    return {
      flatButtonLabelStyle: {
        color: '#fff',
        opacity: 0.6,
        textTransform: 'none'
      },
      flatButtonHoverColor: {
        color: 'rgb(36, 66, 115)'
      },
      gettingStartedHeaderContainer: {
        marginTop: '7px',
        marginLeft: 150
      },
      fontIconColor: {
        color: 'rgba(255,255,255,0.6)'
      }
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.gettingStartedHeaderContainer}>
        <FlatButton
          onTouchTap={this.handleTouchTap}
          label="Getting Started"
          labelPosition="before"
          labelStyle={styles.flatButtonLabelStyle}
          hoverColor={styles.flatButtonHoverColor}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu onItemTouchTap={this.handleRequestClose}>
            <a
              href="http://docs.syncano.io/"
              target="_blank"
            >
              <MenuItem primaryText="Documentation" />
            </a>
            <a
              href="https://www.syncano.io/blog/tag/tutorials/"
              target="_blank"
            >
              <MenuItem primaryText="Tutorials" />
            </a>
            <a
              href="http://docs.syncano.io/docs/getting-started-with-syncano"
              target="_blank"
            >
              <MenuItem primaryText="Quick Start Guide" />
            </a>
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default HeaderGettingStartedDropdown;
