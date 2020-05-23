import React ,{Component} from 'react' 

import {StyleSheet,Text,View,ScrollView,Image,Animated,TouchableWithoutFeedback}  from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
class FloatingButton extends Component{
animation=new Animated.Value(0)



close_modal () {
  this.props.togglemodal(true);
  this.toggleMenu();
}


toggleMenu = () =>{



  const toValue = this.open ? 0:1

  Animated.spring(this.animation,{
    toValue,
    friction:5,
    useNativeDriver:false
  }).start()

  this.open =!this.open
}

render(){


  const rotation={

    transform:[
      {
      rotate:this.animation.interpolate({
        inputRange:[0,1],
        outputRange:["0deg","45deg"]
      })
    }
  ]
  }


  const thumbStyle={


    transform:[
      {scale:this.animation},
      {
        translateY:this.animation.interpolate({
          inputRange:[0,1],
          outputRange:[0,-80]
        })
      }
    ]
  }
 

  const opacity=this.animation.interpolate({

    inputRange:[0,0.5,1],
    outputRange:[0,0,1]
  })
 return(
<View style={[styles.container,this.props.style]}>





<TouchableWithoutFeedback

onPress={()=>this.close_modal()}>
    <Animated.View style={[styles.button,styles.secondary,thumbStyle,opacity]}>
        <FontAwesome5 name='book-dead'  size={20}  color={this.props.color}  />
    </Animated.View>
</TouchableWithoutFeedback>





<TouchableWithoutFeedback onPress={()=>this.toggleMenu()}>
    <Animated.View style={[styles.button,rotation,{backgroundColor:this.props.color}]}>
        <Icon name='plus'  size={24}  color='#FFF'  />
    </Animated.View>
</TouchableWithoutFeedback>


</View>
 )

  }
}
export default FloatingButton


const styles=StyleSheet.create({


  container:{
   
    
    alignItems:'center',
    position:'absolute'

  },
  button:{

 height:60,
 width:60,
 position:'absolute',
 borderRadius:60/2,
 alignItems:'center',
 justifyContent:'center',
 shadowRadius:10,
 shadowColor:'#F02A4B',
 shadowOpacity:0.3,
 shadowOffset:{height:10},
 elevation:10,

  },

  menu:{
      backgroundColor:'#F02A4B',
  },

  secondary:{

    width:48,
    height:48,
    borderRadius:48/2,
    backgroundColor:'#FFF',
  
   
  }
})