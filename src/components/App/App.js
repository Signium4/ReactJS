import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '../../reducers/index';
import DisplayComponentRedux from "../DisplayComponent/DisplayComponent"


const store = createStore(rootReducer)

const App = () => {

  return (
    <Provider store={store}>
      <DisplayComponentRedux />
    </Provider>
  )
}

export default App;
