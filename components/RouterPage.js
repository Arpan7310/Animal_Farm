import React ,{Component} from 'react'

import {View,Text,Button} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';




class RouterPage extends Component{

retrieveData = async () => {
        try {
         
       
          if (   await AsyncStorage.getItem('mykey') == null) 
            // We have data!!
        this.props.navigation.navigate('Store')
    
          
          if( await AsyncStorage.getItem('mykey') == 'cnu')
          this.props.navigation.navigate('Pincode')
      
        } catch (error) {
          // Error retrieving data
        }
      };




    render(){
        return(
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',flex:1}}>
      <Button title='Login' onPress={this.retrieveData} />
          </View>
          )
        
   }
           
        
    }



        
        
    

      
  


export default RouterPage