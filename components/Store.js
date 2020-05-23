import React ,{Component} from 'react'
import PINCode from '@haskkor/react-native-pincode'
import {View,Button,Alert,Text} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios'
import url from './Url'
class Store extends Component{
  


   componentWillMount(){

   this.props.navigation.addListener(  'willFocus' ,  async  e =>{
   
    try{
    this.setState({
      email:await AsyncStorage.getItem('email'),
      x:await AsyncStorage.getItem('pin')
    })
   }

  

  catch(err){
Alert.alert(err)
  }
})

}

  constructor(){

    super()
    this.state={
      rpin:'',
      email:'',
      x:''
    }

  }
  async removeData   ()  {
try{
    
   let data={
               email:this.state.email,
               pin:this.state.rpin,
               } 
       const res =   Axios.post(url + 'resetpin' ,data)
       
       
       await AsyncStorage.setItem('pin',this.state.rpin);
       Alert.alert('Pin has been reset')
       this.props.navigation.pop()
        } catch (err) {
          Alert.alert(JSON.stringify(err.message))
        }
      };

    render(){
        return(
       <View style={{flex:1}}>
        
       <PINCode 
             finishProcess={()=>this.removeData()}
           
                status={'choose'}
                storePin={(e)=>{
                  this.setState({
                    rpin:e
                  })
                }}
                
                /> 
               
       </View>
         
          )
    }
}

export default Store