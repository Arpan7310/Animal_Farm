

import React, { Component } from 'react';

import {createStore,applyMiddleware}  from 'redux'
import {Provider} from 'react-redux'
import  Reducer from './components/reducer/Reducer'
import thunk from 'redux-thunk'



import {Text,View } from 'react-native'
 import Switch from './components/Switch'

 const store=createStore(Reducer,applyMiddleware(thunk))
class App extends Component  {

 

  render() {
  
    return (

      <Provider store={store}>
        <Switch />
      </Provider>
     
     
     )
    
    
}
}





export default App
