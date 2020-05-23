import React ,{Component} from 'react'

import {Text,View,StyleSheet,Animated,Dimensions} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
class Modalcard extends Component {



constructor(props){

    super(props)
this.state={
visible: new Animated.Value(0)
}
}

    render() {


    const modalStyle = {
        opacity: this.state.visible,
      }
        return(

             <Animated.View style={[StyleSheet.absoluteFill, styles.modal,modalStyle]} pointerEvents="none">
     <View style={styles.modalContainer}>
     <View   style={styles.swipercard2} >
        <View style={{flexDirection:'row'}}>
         <Text style={{fontSize:24,padding:20,color:'white'}}>Selection</Text>
        <Icon name='md-female' size={35}  color={'white'}style={{padding:20,paddingLeft:width/2.5}} />
         </View>
         <View style={{flexDirection:'row'}}>
         <Text style={{padding:20,color:'white'}}>Age 21 weeks (2 months)</Text>
          <Text style={{padding:20,paddingLeft:width/7,color:'white'}}>Female</Text>
          
         </View>
         <Text style={{fontWeight:'bold',fontSize:24,padding:20,color:'white'}}>8</Text>
       
        </View>
     </View>
     
     </Animated.View>
        )
    }
}


const styles=StyleSheet.create({

modal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.5)",
    
  },
  modalContainer: {
 justifyContent:'center',
 alignItems:'center'
   
  },
    swipercard2:{
        backgroundColor:'rgb(175,122,197)',
        marginLeft:10,
        marginRight:10,
       
        borderRadius:10
    }
})


const height= Dimensions.get('window').height
const width= Dimensions.get('window').width
export default Modalcard