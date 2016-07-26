import React from 'react';

import HeaderGettingStartedDropdown from './HeaderGettingStartedDropdown';

import { FlatButton } from 'material-ui';
import { Toolbar } from 'material-ui/Toolbar';

export default class TopNavigation extends React.Component {

  constructor(props) {
    super(props);
  }

  getStyles() {
    return {
      topToolbar: {
        background: 'rgb(36, 66, 115)',
        height: 50,
        padding: 0,
        justifyContent: 'flex-start'
      },
      logo: {
        width: 120,
        height: 19,
        margin: 'auto 20px'
      },
      flatButtonLabelStyle: {
        color: '#fff',
        opacity: 0.6,
        textTransform: 'none',
        marginTop: 15
      },
      flatButtonHoverColor: {
        color: 'rgb(36, 66, 115)'
      }
    };
  }

  render() {
    const styles = this.getStyles();

    return (
      <Toolbar style={styles.topToolbar}>
        <img src="./src/components/TopNavigation/syncano-logo-white.png" style={styles.logo} alt=""/>
        <HeaderGettingStartedDropdown />
        <FlatButton
          href='https://github.com/Syncano-Community/pokemon-map-example-app'
          target='_blank'
          label="Github"
          labelStyle={styles.flatButtonLabelStyle}
          hoverColor={styles.flatButtonHoverColor}
          style={{ marginTop: 7 }}
        />
        <span style={{...styles.flatButtonLabelStyle, marginLeft: 80, opacity: .8}}>Right Click on the Map to Add New Pokemon</span>
      </Toolbar>
    );
  }
}
