import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import AppStore from './stores/AppStore';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';

const appStore = new AppStore();

injectTapEventPlugin();

render(
  <AppContainer>
    <Provider appState={appStore}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <NextApp appState={appStore} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
