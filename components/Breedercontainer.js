import React ,{Component} from 'react'

import {Text,View,Animated,StyleSheet,Dimensions,Image,TouchableWithoutFeedback,Easing} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper'


class Breedercontainer extends Component{





    constructor(props){


        super(props)



        this.state={
            expanded    : false,
            animation   : new Animated.Value(223)
        }

        this.icons={

            'down':require('./assets/down.png'),
            'up':require('./assets/up.png')
          }
        this.array=[];
        this.colonyId=[];
        
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
        let initialValue    = this.state.expanded? (this.state.maxHeight + this.state.minHeight+25) : (this.state.minHeight-3),
        finalValue      =this.state.expanded? (this.state.minHeight-3) : (this.state.maxHeight + this.state.minHeight+25);
       
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

  let transformStyle2 = { ...styles.swipercard2, transform: [{ scale: cardScale }] };
 
  let transformStyle5 = { ...styles.notassigned, transform: [{ scale: cardScale }] };


console.log(this.props.colonyId)

    return(
        
        <Animated.View
  style={[styles.card2,{height:this.state.animation}]}
  
  >
   <View
  
   onLayout={this._setMinHeight.bind(this)}>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:24,paddingLeft:18.5,paddingTop:40}}>Breeder</Text>
<Icon name='ios-leaf' size={35}  color={'black'} style={{paddingTop:40,paddingLeft:width/2}} />
  
</View>
   
    <Text style={{fontSize:15,paddingLeft:16,paddingTop:10}}> {this.props.breeder._id}</Text>
     
  
<Text style={{fontSize:15,paddingLeft:16,paddingTop:40}}> Batches {this.props.breeder.batches.length}</Text>

<View style={{flexDirection:'row'}}>
    <Text style={{fontSize:15,paddingLeft:20,marginTop:5}}>Dames {this.props.breeder.ndames}</Text>

    
           <View style={{paddingLeft:width/2.5}}>
           {this.props.colonyId.map(o=>{
      
      return(
        <Text style={{fontSize:15,
          color:'black',padding:2
            }}> {o}</Text>
      )
    })}
           </View>
   
  
 </View>
   


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





{this.props.array.length !== 0 ? ( 




<Swiper  horizontal={true} showsPagination={false}  >


{this.props.array.map(item=>{


item.status == 'neo' ? transformStyle2={...transformStyle2,backgroundColor:'rgb(240,128,128)'}:
transformStyle2={...transformStyle2,backgroundColor:'#557ce7'}
return (
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

<Animated.View  onLayout={this._setMaxHeight.bind(this)}  style={transformStyle2}>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:24,padding:20,color:'white'}}>Batch</Text>
<Icon name='ios-apps' size={35}  color={'white'}style={{padding:20,paddingLeft:width/2.2}} />
</View>
<View style={{flexDirection:'row'}}>
<Text style={{padding:20,color:'white'}}>Age {parseInt((new Date().getTime()- new Date (item.dob).getTime())/(24*3600*1000))+' days'} </Text>
<Text style={{padding:20,paddingLeft:width/2.33,color:'white'}}>{item.status}</Text> 

</View>
<Text style={{fontWeight:'bold',fontSize:24,padding:20,color:'white'}}>{item.count}</Text>

</Animated.View>
</TouchableWithoutFeedback>
)
})}
</Swiper>




):(


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


export default Breedercontainer

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
       // backgroundColor:'rgb(240,128,128)',
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