import  React, {Component} from 'react'
import {View,Text,TextInput,Dimensions,StyleSheet,Modal,ActivityIndicator,TouchableOpacity,Image, TouchableHighlightComponent,AppState} from 'react-native'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import PINCode from '@haskkor/react-native-pincode'
import Axios from 'axios'
import url from './Url';
import { TouchableHighlight } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen'
import { Button,Card } from 'react-native-paper';
import { color } from 'react-native-reanimated';




class Loginpage extends Component {


   constructor(){

     super();
   
      this.state={
     
            email:'',
            password:'',
            signup:false,
            pin:'',
            bool:false,
            login:false,
            x:''
            
            
            
        }
    }

 

async  handleLogin  ()  {
let data ={email:this.state.email.trim(),password:this.state.password}
this.setState({
  login:true
})
try{
if(data.email !== '' && data.password !== ''){

  

  const res= await  Axios.post(url +'login',data);
 
  if(res.data.message=='login succesful'){
  
   await AsyncStorage.setItem('email',res.data.email)
   await AsyncStorage.setItem('pin',res.data.pin)
   this.setState({

    login:false
   })
   this.props.navigation.navigate('Pincode')

}
else if(res.data.message =='user does not exist'){

this.setState({

  login:false
 })
 Alert.alert(res.data.message )
}
else
Alert.alert('Wrong credentials check email or password again')
this.setState({
  login:false
})


}
else
Alert.alert('Invalid credentials')
this.setState({
  login:false
})
}
catch(err){
Alert.alert(JSON.stringify(err.message))
this.setState({
  login:false
})
}
 }


 async  handleSignup  ()  {
    let data ={email:this.state.email.trim(),
        password:this.state.password,
        pin:this.state.pin.trim()}
        this.setState({
          bool:true
        })
       try{
         
        if(data.email !== '' && data.password !== '' && data.pin.length == 4){
       
          
        const res= await  Axios.post(url +'signup',data)
        
        this.setState({
         bool:false
       })
       Alert.alert(JSON.stringify(res.data.message))
       if (res.data.message =='sigunp complete')
       this.setState({
         signup:false,
         email:'',
         password:'',
         pin:'',
         bool:false
       })
        }
        else{
          Alert.alert('Invalid credentials')
           this.setState({
             bool:false
           })
          }
        
  
       }
    
    catch(err){
    Alert.alert(JSON.stringify(err.message))
    this.setState({
      bool:false
    })
    }
     }




  render(){

    return(
      
      <View  style={{flex:1,backgroundColor:'#def0fc'}}>
   
           <View style={{paddingBottom:200,alignItems:'center',paddingTop:30}}>
           <Text style={{fontSize:24,color:'#7189FF',}}>Welcome to Animal Lab</Text>
           </View>
         
         
          <View style={{justifyContent:'center',alignItems:'center'}}>
        <TextInput  style={{width:Dimensions.get('window').width-40,backgroundColor:'white',margin:10,elevation:20}} placeholder="Enter email" onChangeText ={ (e)=> 
        this.setState({
            email:e
            })
          } />


          <TextInput  style={{width:Dimensions.get('window').width-40,backgroundColor:'white',margin:10,elevation:20}} placeholder="Enter password"  secureTextEntry={true}    onChangeText ={ (e)=> 
        this.setState({
            password:e
            })
          } />

     <View style={{margin:15}}>
         <View style={{flexDirection:'row', justifyContent:'space-between'}} >
         
             <View style={{marginRight:10}}>
               <View style={{flexDirection:'row'}} >
               <ActivityIndicator size="large" color="#7189FF"  animating={this.state.login}/>
               <Button  mode='contained' color='#7189FF'  labelStyle={{color:'white'}} onPress={()=>this.handleLogin()} >Login</Button>
             
               </View>
            
     </View>
     
         <View style={{marginLeft:10,marginRight:34}}>
        <Button mode='contained'  color='#7189FF'  labelStyle={{color:'white'}} onPress={() =>this.setState({
             signup:true,
             email:'',  
             password:''})}>Signup</Button>
         </View>
         
     </View>
     
     </View>
     <View style={{padding:20}}>
     <Text style={{fontSize:20,color:'#7189FF'}}>Login for existing user/</Text>
     
     <Text style={{fontSize:20,color:'#7189FF'}}>Signup for new user</Text>
     <Text>{this.state.x}</Text>
     </View>
     </View>
             
                <Modal 
                    animationType="slide"
                    transparent={false}
                    visible={this.state.signup}

                    onShow={()=>this.setState({
                      email:'',
                      password:'',
                      pin:''
                    })}
                    onRequestClose={() => {
                        this.setState({
                           signup: false,
                           email:'',
                           password:'',
                           pin:''
                        })
                    }}>
             <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#def0fc'}}>
             <Text style={{fontSize:20,color:'#7189FF',paddingBottom:20}}>Fill up Sign in Details</Text>
               <TextInput  style={{width:Dimensions.get('window').width-40,backgroundColor:'white',elevation:20,margin:10}} placeholder="Enter email" onChangeText ={ (e)=> 
                 this.setState({
                   email:e
                   })
                   } />


                  <TextInput  style={{width:Dimensions.get('window').width-40,backgroundColor:'white',elevation:20,margin:10}} placeholder="Enter password"  secureTextEntry={true}  onChangeText ={ (e)=> 
                    this.setState({
                   password:e
                    })
                    } />
                 
                    <TextInput  style={{width:Dimensions.get('window').width-40,backgroundColor:'white',elevation:20,margin:10}} placeholder="Enter 4 digit pin code"  secureTextEntry={true} keyboardType={'numeric'} onChangeText ={ (e)=> 
                    this.setState({
                   pin:e
                    })
                    } />
                    <ActivityIndicator size="large" color="#7189FF"  animating={this.state.bool}/>
                    <Button  mode='contained' color='#7189FF'  
                    labelStyle={{color:'white'}} 
                    onPress={()=>this.handleSignup()} 
                    >
                    Signup
                    </Button>
              
                   </View>
                </Modal>


   

      </View>
        )
                  
                  
          

                  
    }
}




export default Loginpage