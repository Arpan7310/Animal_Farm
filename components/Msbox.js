import React ,{Component} from 'react'

import {Text,View,Animated,StyleSheet,Dimensions,Image,TouchableWithoutFeedback,Easing,TextInput, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper'
import FloatingButton  from './FloatingButton'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { Button} from 'react-native-paper';
import Axios from 'axios'
import url from './Url'
class Msbox extends Component{

 
 async componentDidMount() {

this.props.navigation.addListener('willFocus' , async e =>{

  try{
    const res=await Axios.post(url +'getContainerDetails',this.props.navigation.getParam('qr'))
    
    this.data=res.data;
  
    console.log(this.data)
    }
    catch(err){
    Alert.alert('',JSON.stringify(err))
    
    }
    

})


}




    constructor(props){

       super(props)

        this.state={
            expanded    : false,
            animation   : new Animated.Value(230),
            modal:false,
            death_count:null
        }

        this.icons={

            'down':require('./assets/down.png'),
            'up':require('./assets/up.png')
          }



         this.qr=this.props.navigation.getParam('qr');
         this.gender='male';
         this.data={};
         this.backgroundColor='';
         this.title='';
       
    }

    
  _setMaxHeight(event){
    this.setState({
        maxHeight   : event.nativeEvent.layout.height
    });
}

_setMinHeight(event){
  this.setState({
      minHeight   : event.nativeEvent.layout.height
  });
}



    toggle () {
        let initialValue    = this.state.expanded? (this.state.maxHeight + this.state.minHeight) : (this.state.minHeight),
        finalValue      =this.state.expanded? (this.state.minHeight) : (this.state.maxHeight + this.state.minHeight);
       
    this.setState({
        expanded : !this.state.expanded  //Step 2
    });

      this.state.animation.setValue(initialValue);  //Step 3
        Animated.spring(     //Step 4
            this.state.animation,
            {
                toValue: finalValue,
                 bounciness:0,
                useNativeDriver:false
               
            }
        ).start()
    
      }


      togglemodal = (value) =>{
        
        this.setState({
            modal:value
        })


      }


   async  reportDeath (value) {
let data={};
data={

  type:'market_selection',
 id:this.qr.id,
  count:this.state.death_count,
 
}

this.setState({
  modal:value
})
console.log(data)
try{

  const res = await Axios.post(url +'reportDeath',data)
  
   const res2= await Axios.post(url +'getContainerDetails',this.props.navigation.getParam('qr'))
   this.data=res2.data;
   this.forceUpdate();
}
catch(err){

  Alert.alert('',JSON.stringify(err))
}
        
      }
    render() {
       let transformStyle={},i='';
        i=this.props.navigation.getParam('qr').type;
        let scaleValue = new Animated.Value(0);

        const cardScale = scaleValue.interpolate({
            inputRange: [0,  1],
            outputRange: [1,  0.9]
          });

if(i == 'S')
this.title='Selection';
if(i == 'M')
this.title='Market';



          if(this.data.gender=='male' && i=='M')
          this.backgroundColor='rgb(88,214,141)'
  
          if(this.data.gender=='female' && i=='M' )
          this. backgroundColor='rgb(255, 179, 179)' 


             if(this.data.gender=='female' && i=='S' )
             this.  backgroundColor='rgb(175,122,197)' 

                if(this.data.gender=='male' && i=='S' )
              this.   backgroundColor='rgb(248,196,113)' 

                transformStyle = { ...styles.container,
                  transform: [{ scale: cardScale }],
                  height:this.state.animation,
                  backgroundColor:this.backgroundColor }

        return(
<View style={styles.containery}>

<TouchableOpacity onPress={()=>this.props.navigation.pop()}>
<Icon name='ios-arrow-back' size={34} color={this.backgroundColor} style={{paddingTop:25}} />
</TouchableOpacity>

<FloatingButton style={{bottom:100}} 
color={this.backgroundColor}
navigation={this.props.navigation} 
togglemodal={this.togglemodal}
/>


 <TouchableWithoutFeedback


onPressIn={() => {
scaleValue.setValue(0);
Animated.timing(scaleValue, {
 toValue: 1,
 duration: 250,
 easing: Easing.linear,
 useNativeDriver: false
}).start();


}}
onPressOut={() => {
Animated.timing(scaleValue, {
 toValue: 0,
 duration: 100,
 easing: Easing.linear,
 useNativeDriver: false
}).start();
}}
>
             <Animated.View
      style={transformStyle}
      
      >
       <View
      
       onLayout={this._setMinHeight.bind(this)}>
    <View style={{flexDirection:'row'}}>
    <Text style={{fontSize:24,paddingLeft:25,paddingTop:40,color:'white'}}>{this.title}</Text>
    {i=='M'? (this.data.gender == 'female' ? <Icon name='ios-female' size={30} color={'white'}  style={{paddingLeft:width/2,paddingTop:40}}/>
  :<Icon name='ios-male' size={30} color={'white'}  style={{paddingLeft:width/2,paddingTop:40}}/> ):(
    this.data.gender == 'female' ? <Icon name='ios-female' size={30} color={'white'}  style={{paddingLeft:width/2.25,paddingTop:40}}/>
    :<Icon name='ios-male' size={30} color={'white'}  style={{paddingLeft:width/2.25,paddingTop:40}}/>)}

    
  
   
    </View>
       
       <View style={{flexDirection:'row'}}>
      
        <Text style={{fontSize:15,paddingLeft:25,paddingTop:10,color:'white'}}>
        Age {parseInt((new Date().getTime()- new Date (this.data.dob).getTime())/(24*3600*1000))+' days'}
        </Text>
        <Text style={{paddingLeft:width/2.06,paddingTop:10,color:'white'}}>{this.data.gender}</Text>
       
        </View>
      
       
       <Text style={{fontSize:35,paddingLeft:20,paddingTop:30,fontWeight:'bold',color:'white'}}>
         {this.data.count}
       </Text>

 
       <View style={styles.buttonImage}>

       <TouchableWithoutFeedback
            onPress={this.toggle.bind(this)}
          
          
            >
      {!this.state.expanded?  <Icon name="ios-arrow-down" color={'white'} size={24}   />
      :
       <Icon name="ios-arrow-up" color={'white'} size={24}   /> }    
          
           </TouchableWithoutFeedback>
       </View>
           
      
       </View>

  <Animated.View   onLayout={this._setMaxHeight.bind(this)}   >  

      
      <Text style={{paddingTop:15,color:'white',paddingBottom:5,paddingLeft:23}}>Box code { this.qr.id}</Text>
 
      <Text style={{paddingTop:5,color:'white',paddingBottom:5,paddingLeft:23}}>Colony {this.data.colonyId}</Text>
      
    
  </Animated.View>
                
                
       </Animated.View>
       </TouchableWithoutFeedback>
        


      <Modal  
      animationIn={'slideInUp'}
      animationInTiming={500}
      isVisible={this.state.modal}
     animationOutTiming={500}
      backdropColor={'white'}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      animationOut={'slideOutDown'}
      backdropOpacity={0.5}
      onBackdropPress={()=>this.togglemodal(false)}
      
      onBackButtonPress={()=>this.togglemodal(false)}>
     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      
      <View style={{backgroundColor:'white', height:250,width:width/2,
      borderRadius:5,
      elevation:45,
    
    justifyContent:'center',
    alignItems:'center'}}>


     
     
     
     

      <TextInput   editable={this.state.bool} 
  
       onChangeText={(e)=>this.setState({
        death_count:parseInt(e) })} 
          placeholder="enter dead" style={{width:width/2.5,
          borderBottomColor:'grey',
          margin:10,borderBottomWidth:1}} keyboardType={'numeric'}/>


           <Button onPress={()=> Alert.alert(
    'Are You Sure?',
    '',
    [{text:'Yes',onPress: ()=> this.reportDeath()},
    {text:'cancel',onPress: ()=>console.log("cancel pressed")}]
  )} mode={'contained'} color={this.backgroundColor} 
           
       style={{margin:20}}
           labelStyle={{color:'white'}}


           >Update</Button>
   </View>

     </View>



      </Modal>
       </View>
      
        )
    }
}


export default Msbox

const height= Dimensions.get('window').height
const width= Dimensions.get('window').width
const styles=StyleSheet.create({

    background:{
    
    backgroundColor:'#E9E9E9',
    alignItems:'center',
    borderTopLeftRadius:45,
    borderTopRightRadius:45,
    marginTop:height/30,
    
    },
    
    card :{
    
        backgroundColor:'#FFFFFF',
        height:50,
        width:width/2.30,
        margin:10,
        elevation:5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
       
    },
    card2:{
    
        backgroundColor:'#FFFFFF',
      
        width:width/1.1,
      
        
        borderRadius:5,
        elevation:20,
        marginBottom:15,
        overflow:'hidden',
        marginBottom:40,
        marginTop:20
        
       
    },


    container:{
       
      
        width:width/1.1,
      
        
        borderRadius:5,
        elevation:75,
        marginBottom:15,
        overflow:'hidden',
        marginBottom:40,
        marginTop:70
    },
    
    
    title:{
       
     
      
        marginLeft:10,
        marginRight:10,
        flexDirection:'row'
    },
    
    body:{
       
        
    },
    
    fontStyle:{
        fontSize:15,
        fontWeight:'bold',
        
    },
    fontStyle2:{
        fontSize:15,
        fontWeight:'bold',
        marginLeft:5,
        marginTop:5
    },
    buttonImage : {
       
     paddingLeft:width/1.3,
     
    
    
    },
    arrow:{
        width   : 30,
        height  : 30,
    },
    
    swipercard:{
       
        backgroundColor:'rgb(255, 179, 179)',
        borderRadius:10,
        elevation:15,
        marginLeft:10,
        marginRight:10,
          
          
        
       
      
    },
    swipercard2:{
        backgroundColor:'rgb(175,122,197)',
        marginLeft:10,
        marginRight:10,
        elevation:15,
        borderRadius:10
    },
    swipercard3:{
        backgroundColor:'rgb(88,214,141)',
        marginLeft:10,
        marginRight:10,
        elevation:15,
        borderRadius:10
    
    },
    swipercard4:{
        backgroundColor:'rgb(248,196,113)',
        marginLeft:10,
        marginRight:10,
        elevation:15,
        borderRadius:10
    },

    notassigned:{
      backgroundColor:'grey',
      marginLeft:10,
      marginRight:10,
      elevation:15,
      borderRadius:10
    },

    
  containery:{

    flex:1,
    alignItems:'center',


   
     

  }
    
    })