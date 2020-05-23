import React ,{Component} from 'react'

import {Text,View,Animated,StyleSheet,Dimensions,Image,TouchableWithoutFeedback,Easing} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper'


class Collapsible extends Component{

  containers=this.props.containers;



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
        let initialValue    = this.state.expanded? (this.state.maxHeight + this.state.minHeight+35) : (this.state.minHeight-3),
        finalValue      =this.state.expanded? (this.state.minHeight-3) : (this.state.maxHeight + this.state.minHeight+35);
       
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
        let icon=this.icons['down'];
        if(this.state.expanded){
          icon = this.icons['up'];   //Step 4
        }
        let scaleValue = new Animated.Value(0);

        const cardScale = scaleValue.interpolate({
            inputRange: [0,  1],
            outputRange: [1,  0.9]
          });
  let transformStyle = { ...styles.swipercard, transform: [{ scale: cardScale }] };
  let transformStyle2 = { ...styles.swipercard2, transform: [{ scale: cardScale }] };
  let transformStyle3 = { ...styles.swipercard3, transform: [{ scale: cardScale }] };
  let transformStyle4 = { ...styles.swipercard4, transform: [{ scale: cardScale }] };
  let transformStyle5 = { ...styles.notassigned, transform: [{ scale: cardScale }] };
        return(
             <Animated.View
      style={[styles.card2,{height:this.state.animation}]}
      
      >
       <View
      
       onLayout={this._setMinHeight.bind(this)}>
    <View style={{flexDirection:'row'}}>
    <Text style={{fontSize:24,paddingLeft:25,paddingTop:40}}>{this.props.type}</Text>
  <Icon name='ios-apps' size={35}  color={'black'} style={{paddingTop:40,paddingLeft:width/1.85}} />
      
    </View>
       
       <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:15,paddingLeft:25,paddingTop:10}}>Age {this.props.age}</Text>
        
       
        </View>
      
       
       <Text style={{fontSize:35,paddingLeft:20,marginTop:40,fontWeight:'bold'}}>{this.props.count}</Text>

 
       <View style={styles.buttonImage}>

       <TouchableWithoutFeedback
            onPress={this.toggle.bind(this)}
          
          
            >
           <Image 
           
            source={icon} 
            
            style={styles.arrow}/>
          
           </TouchableWithoutFeedback>
       </View>
           
      
       </View>

{Object.keys(this.props.containers).length !== 0 ? ( <Swiper style={{paddingTop:15,paddingBottom:15}} horizontal={true} showsPagination={false}  >


{this.props.containers.sf ? ( <TouchableWithoutFeedback
onPressIn={() => {
scaleValue.setValue(0);
Animated.timing(scaleValue, {
 toValue: 1,
 duration: 250,
 easing: Easing.linear,
 useNativeDriver: true
}).start();


}}
onPressOut={() => {
Animated.timing(scaleValue, {
 toValue: 0,
 duration: 100,
 easing: Easing.linear,
 useNativeDriver: true
}).start();
}}
>
<Animated.View  onLayout={this._setMaxHeight.bind(this)}  style={transformStyle2}>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:24,padding:20,color:'white'}}>Selection</Text>
<Icon name='ios-female' size={35}  color={'white'}style={{padding:20,paddingLeft:width/2.5}} />
</View>
<View style={{flexDirection:'row'}}>
<Text style={{padding:20,color:'white'}}>Age {parseInt((new Date().getTime()- new Date (this.containers.sf.dob).getTime())/(24*3600*1000))+' days'}</Text>
 <Text style={{padding:20,paddingLeft:width/2.5,color:'white'}}>Female</Text> 
 
</View>
<Text style={{fontWeight:'bold',fontSize:24,padding:20,color:'white'}}> {this.props.containers.sf.count}</Text>

</Animated.View>
</TouchableWithoutFeedback>):(<TouchableWithoutFeedback
onPressIn={() => {
scaleValue.setValue(0);
Animated.timing(scaleValue, {
 toValue: 1,
 duration: 250,
 easing: Easing.linear,
 useNativeDriver: true
}).start();


}}
onPressOut={() => {
Animated.timing(scaleValue, {
 toValue: 0,
 duration: 100,
 easing: Easing.linear,
 useNativeDriver: true
}).start();
}}
>
<Animated.View  onLayout={this._setMaxHeight.bind(this)}  style={transformStyle2}>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:24,padding:20,color:'white'}}>Selection</Text>
<Icon name='ios-female' size={35}  color={'white'}style={{padding:20,paddingLeft:width/2.5}} />
</View>
<View style={{flexDirection:'row'}}>
<Text style={{padding:20,color:'white'}}>Age 0  days</Text>
 <Text style={{padding:20,paddingLeft:width/2.5,color:'white'}}>Female</Text> 
 
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontWeight:'bold',fontSize:24,padding:20,color:'white'}}>0</Text>
<Text style={{padding:20,paddingLeft:width/2.5,color:'white'}}>Not yet assigned</Text> 
</View>


</Animated.View>
</TouchableWithoutFeedback>)}


{this.props.containers.mf?( <TouchableWithoutFeedback
onPressIn={() => {
scaleValue.setValue(0);
Animated.timing(scaleValue, {
 toValue: 1,
 duration: 250,
 easing: Easing.linear,
 useNativeDriver: true
}).start();


}}
onPressOut={() => {
Animated.timing(scaleValue, {
 toValue: 0,
 duration: 100,
 easing: Easing.linear,
 useNativeDriver: true
}).start();
}}
>
<Animated.View  onLayout={this._setMaxHeight.bind(this)}  style={transformStyle}  >
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:24,padding:20,color:'white'}}>Market</Text>
<Icon name='ios-female' size={35}  color={'white'}style={{padding:20,paddingLeft:width/2.5}} />
</View>
<View style={{flexDirection:'row'}}>
<Text style={{padding:20,color:'white'}}>Age {parseInt((new Date().getTime()- new Date (this.containers.mf.dob).getTime())/(24*3600*1000))+' days'}</Text>
 <Text style={{padding:20,paddingLeft:width/2.5,color:'white'}}>Female</Text>
 
</View>
<Text style={{fontWeight:'bold',fontSize:24,padding:20,color:'white'}}>{this.containers.mf.count}</Text>

</Animated.View>
</TouchableWithoutFeedback>):( <TouchableWithoutFeedback
onPressIn={() => {
scaleValue.setValue(0);
Animated.timing(scaleValue, {
 toValue: 1,
 duration: 250,
 easing: Easing.linear,
 useNativeDriver: true
}).start();


}}
onPressOut={() => {
Animated.timing(scaleValue, {
 toValue: 0,
 duration: 100,
 easing: Easing.linear,
 useNativeDriver: true
}).start();
}}
>
<Animated.View  onLayout={this._setMaxHeight.bind(this)}  style={transformStyle}  >
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:24,padding:20,color:'white'}}>Market</Text>
<Icon name='ios-female' size={35}  color={'white'}style={{padding:20,paddingLeft:width/2.5}} />
</View>
<View style={{flexDirection:'row'}}>
<Text style={{padding:20,color:'white'}}>0 days</Text>
 <Text style={{padding:20,paddingLeft:width/2.5,color:'white'}}>Female</Text>
 
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontWeight:'bold',fontSize:24,padding:20,color:'white'}}>0</Text>
<Text style={{padding:20,paddingLeft:width/2.5,color:'white'}}>Not yet assigned</Text>

</View>


</Animated.View>
</TouchableWithoutFeedback>)}

{this.props.containers.mm?( <TouchableWithoutFeedback
onPressIn={() => {
scaleValue.setValue(0);
Animated.timing(scaleValue, {
 toValue: 1,
 duration: 250,
 easing: Easing.linear,
 useNativeDriver: true
}).start();


}}
onPressOut={() => {
Animated.timing(scaleValue, {
 toValue: 0,
 duration: 100,
 easing: Easing.linear,
 useNativeDriver: true
}).start();
}}
>
<Animated.View  onLayout={this._setMaxHeight.bind(this)}  style={transformStyle3}>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:24,padding:20,color:'white'}}>Market</Text>
<Icon name='ios-male' size={35}  color={'white'}style={{padding:20,paddingLeft:width/2.5}} />
</View>
<View style={{flexDirection:'row'}}>
<Text style={{padding:20,color:'white'}}>Age {parseInt((new Date().getTime()- new Date (this.containers.mm.dob).getTime())/(24*3600*1000))+' days'}</Text>
 <Text style={{padding:20,paddingLeft:width/2.5,color:'white'}}>Male</Text>
 
</View>
<Text style={{fontWeight:'bold',fontSize:24,padding:20,color:'white'}}>{this.containers.mm.count}</Text>

</Animated.View>
</TouchableWithoutFeedback>):(<View></View>)}


{this.props.containers.sm?( <TouchableWithoutFeedback
onPressIn={() => {
scaleValue.setValue(0);
Animated.timing(scaleValue, {
 toValue: 1,
 duration: 250,
 easing: Easing.linear,
 useNativeDriver: true
}).start();


}}
onPressOut={() => {
Animated.timing(scaleValue, {
 toValue: 0,
 duration: 100,
 easing: Easing.linear,
 useNativeDriver: true
}).start();
}}
>
<Animated.View  onLayout={this._setMaxHeight.bind(this)}  style={transformStyle4}>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:24,padding:20,color:'white'}}>Selection</Text>
<Icon name='ios-male' size={35}  color={'white'}style={{padding:20,paddingLeft:width/2.5}} />
</View>
<View style={{flexDirection:'row'}}>
<Text style={{padding:20,color:'white'}}>Age {parseInt((new Date().getTime()- new Date (this.containers.sm.dob).getTime())/(24*3600*1000))+' days'}</Text>
 <Text style={{padding:20,paddingLeft:width/2.5,color:'white'}}>Male</Text>
 
</View>
<Text style={{fontWeight:'bold',fontSize:24,padding:20,color:'white'}}>{this.containers.sm.count}</Text>

</Animated.View>
</TouchableWithoutFeedback>
):(<TouchableWithoutFeedback
  onPressIn={() => {
  scaleValue.setValue(0);
  Animated.timing(scaleValue, {
   toValue: 1,
   duration: 250,
   easing: Easing.linear,
   useNativeDriver: true
  }).start();
  
  
  }}
  onPressOut={() => {
  Animated.timing(scaleValue, {
   toValue: 0,
   duration: 100,
   easing: Easing.linear,
   useNativeDriver: true
  }).start();
  }}
  >
  <Animated.View  onLayout={this._setMaxHeight.bind(this)}  style={transformStyle4}>
  <View style={{flexDirection:'row'}}>
  <Text style={{fontSize:24,padding:20,color:'white'}}>Selection</Text>
  <Icon name='ios-male' size={35}  color={'white'}style={{padding:20,paddingLeft:width/2.5}} />
  </View>
  <View style={{flexDirection:'row'}}>
  <Text style={{padding:20,color:'white'}}>Age 0 days</Text>
   <Text style={{padding:20,paddingLeft:width/2.5,color:'white'}}>Male</Text>
   
  </View>
  <Text style={{fontWeight:'bold',fontSize:24,padding:20,color:'white'}}>0</Text>
  
  </Animated.View>
  </TouchableWithoutFeedback>)}


</Swiper>):(
  
  
  <TouchableWithoutFeedback
onPressIn={() => {
scaleValue.setValue(0);
Animated.timing(scaleValue, {
 toValue: 1,
 duration: 250,
 easing: Easing.linear,
 useNativeDriver: true
}).start();


}}
onPressOut={() => {
Animated.timing(scaleValue, {
 toValue: 0,
 duration: 100,
 easing: Easing.linear,
 useNativeDriver: true
}).start();
}}
>
  
  
  
  
  
  <Animated.View  onLayout={this._setMaxHeight.bind(this)} style={transformStyle5}>
  
  
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:24,padding:20,color:'white'}}>No container assigned Yet</Text>
<Icon name='ios-male' size={35}  color={'white'}style={{padding:20,paddingLeft:width/2.5}} />
</View>
<View style={{flexDirection:'row'}}>
<Text style={{padding:20,color:'white'}}>Not yet assigned</Text>
 <Text style={{padding:20,paddingLeft:width/7,color:'white'}}>Not yet assigned</Text>
 
</View>
<Text style={{fontWeight:'bold',fontSize:24,padding:20,color:'white'}}>0</Text>

  
  
  
  </Animated.View>
  </TouchableWithoutFeedback>)}
      
      
              
                
                
       </Animated.View>
      
     
      
        )
    }
}


export default Collapsible

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
      borderRadius:10,
      marginTop:15,
    }
    
    })