import React , {Component} from 'react'
import {View,Text,Dimensions,TouchableOpacity} from 'react-native'


class Card extends Component{

   render(){
    
   return(
           
      <View style={{width:Dimensions.get('window').width-20,
        height:60,
        alignItems:'center',
        margin:15,
        backgroundColor:'white',
        borderColor:'grey',
        borderWidth:0.2,
        justifyContent:'center'}}>
         <Text style={{color:'grey',fontSize:16}}>{this.props.text} </Text>
        </View>
        
         )
    }
}

export default Card
