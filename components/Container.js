import React ,{Component} from 'react'

import {Text,View,Animated,StyleSheet,Dimensions,Image,TouchableWithoutFeedback,Easing} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper'


class Container extends Component{

 



    constructor(props){


        super(props)



        this.state={
            expanded    : false,
            animation   : new Animated.Value(230)
        }

        this.icons={

            'down':require('./assets/down.png'),
            'up':require('./assets/up.png')
          }



         this. container=this.props.container;
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
        let initialValue    = this.state.expanded? (this.state.maxHeight + this.state.minHeight+25) : (this.state.minHeight+25),
        finalValue      =this.state.expanded? (this.state.minHeight+25) : (this.state.maxHeight + this.state.minHeight+25);
       
    this.setState({
        expanded : !this.state.expanded  //Step 2
    });

      this.state.animation.setValue(initialValue);  //Step 3
        Animated.spring(     //Step 4
            this.state.animation,
            
            {
                toValue: finalValue,
              
                
              bounciness:0,
              
            
               
            }
        ).start()
    
    
    
      }
    render() {
       let transformStyle={},title='',i='';
    i=this.container._id.charAt(0)
        let scaleValue = new Animated.Value(0);

        const cardScale = scaleValue.interpolate({
            inputRange: [0,  1],
            outputRange: [1,  0.9]
          });

if(i == 'S')
title='Selection';
if(i == 'M')
title='Market';



          if(this.container.gender=='male' && i=='M')
   transformStyle = { ...styles.container,
     transform: [{ scale: cardScale }],
     height:this.state.animation,
     backgroundColor:'rgb(88,214,141)' };
          if(this.container.gender=='female' && i=='M' )
          transformStyle = { ...styles.container,
             transform: [{ scale: cardScale }],
             height:this.state.animation,
             backgroundColor:'rgb(255, 179, 179)' }


             if(this.container.gender=='female' && i=='S' )
             transformStyle = { ...styles.container,
                transform: [{ scale: cardScale }],
                height:this.state.animation,
                backgroundColor:'rgb(175,122,197)' }

                if(this.container.gender=='male' && i=='S' )
                transformStyle = { ...styles.container,
                   transform: [{ scale: cardScale }],
                   height:this.state.animation,
                   backgroundColor:'rgb(248,196,113)' }
        return(

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
    <Text style={{fontSize:24,paddingLeft:25,paddingTop:40,color:'white'}}>{title}</Text>
    {i=='M'? (this.container.gender == 'female' ? <Icon name='ios-female' size={30} color={'white'}  style={{paddingLeft:width/2,paddingTop:40}}/>
  :<Icon name='ios-male' size={30} color={'white'}  style={{paddingLeft:width/2,paddingTop:40}}/> ):(
    this.container.gender == 'female' ? <Icon name='ios-female' size={30} color={'white'}  style={{paddingLeft:width/2.25,paddingTop:40}}/>
    :<Icon name='ios-male' size={30} color={'white'}  style={{paddingLeft:width/2.25,paddingTop:40}}/>)}

    
  
   
    </View>
       
       <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:15,paddingLeft:25,paddingTop:10,color:'white'}}>
        Age {parseInt((new Date().getTime()- new Date (this.container.dob).getTime())/(24*3600*1000))+' days'}
        </Text>
        <Text style={{paddingLeft:width/2.06,paddingTop:10,color:'white'}}>{this.container.gender}</Text>
       
        </View>
      
       
       <Text style={{fontSize:35,paddingLeft:20,paddingTop:30,fontWeight:'bold',color:'white'}}>{this.container.count}</Text>

 
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

      
      <Text style={{paddingTop:35,color:'white',padding:10,paddingLeft:23}}>Box code { this.container._id}</Text>
 
      <Text style={{paddingTop:10,color:'white',padding:10,paddingLeft:23}}>Colony  { this.container.colonyId}</Text>
      
    
  </Animated.View>
                
                
       </Animated.View>
       </TouchableWithoutFeedback>
      
     
      
        )
    }
}


export default Container

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
        elevation:20,
        marginBottom:15,
        overflow:'hidden',
        marginBottom:40,
        marginTop:20
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
    }
    
    })