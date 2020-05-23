import React ,{Component}  from 'react'


import {Text,View} from 'react-native'

import SplashScreen from 'react-native-splash-screen'
import AsyncStorage from '@react-native-community/async-storage';

class Splashscreen extends Component{


   async  componentDidMount (){ 
       this.hello();
           
    }
constructor(){
    super();
    this.state={

        'pin':''
    }
}



  async   hello (){
        try{
        this.setState({
            pin:  await AsyncStorage.getItem('pin')
        })   
        if(this.state.pin == null){
          this.props.navigation.navigate('Loginpage')  ;
              SplashScreen.hide();}
              if(this.state.pin !==  null){
                this.props.navigation.navigate('Pincode')  ;
                SplashScreen.hide();

              }
         
        }
        catch(err){
         
       

        }



    }
render(){
  
    return(
        <View>
            
      <Text></Text> 
        </View>
    )
}
}

export default Splashscreen