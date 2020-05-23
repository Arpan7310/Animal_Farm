


import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation';

import Byage from './Byage'
import Byweight from './Byweight'
const tabs=createMaterialTopTabNavigator({

   Byweight:Byweight,
  Byage:Byage,
    


},
{
tabBarOptions: {
    style: {
        backgroundColor: 'white',
      
      },
 
    indicatorStyle:{
        backgroundColor:'#7189FF'
    },
    activeTintColor:'#7189FF',
    inactiveTintColor:'grey'

}
}
)




export default createAppContainer(tabs)