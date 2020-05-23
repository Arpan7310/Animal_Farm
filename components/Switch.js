import {createSwitchNavigator} from 'react-navigation'
import { createAppContainer } from 'react-navigation';
import Pincode from './Pincode'
import Stack from './Stack'
import React ,{Component} from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import {View} from 'react-native'
import Store from './Store'
import Loginpage from './Loginpage'
import Splashscreen from './Splashscreen'

const Navigator=createSwitchNavigator({
    Splashscreen:Splashscreen,
    Loginpage:Loginpage,
    Store:Store,
    Pincode:Pincode,
    Stack:Stack,
},
   {
       initialRouteName:'Splashscreen'
   }
  
)




export default createAppContainer(Navigator);