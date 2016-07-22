import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TopNavigation from './components/TopNavigation/topNavigation';
import SearchBar from './components/Search/SearchBar';
import Gmap from './components/Map/map';

@observer
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <TopNavigation />
          <SearchBar />
          <Gmap />


          <DevTools />
        </div>
      </MuiThemeProvider>
    );
  }
};

export default App;
