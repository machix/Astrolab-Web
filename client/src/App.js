import React, { Component } from 'react';
// import { Provider } from 'react-redux';

import AppContainer from './AppContainer';
// import store from './store.js';

class App extends Component { 
  render() {
    return (
      // <Provider store={store}>
        <AppContainer />
      // </Provider>
    );
  }
}

export default App;
