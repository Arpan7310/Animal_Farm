import React , {Component} from 'react'
import {StyleSheet,Text,View,Dimensions,ScrollView,Image,Animated,PanResponder} from 'react-native'
import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper'
import Collapsible from './Collapsible'
import Axios from  'axios'
import { Alert } from 'react-native';
import url from './Url'
import Container from './Container'
import Breedercontainer from './Breedercontainer'
import Spinner from 'react-native-loading-spinner-overlay';
class Colonydetails extends Component {






  async componentDidMount () {


  
  try{

const res= await Axios.get(url +'colony?colonyId='+this.props.navigation.getParam('colonyId'))
this.batches=res.data.batch;
this.containers=res.data.ms;
this.breeders=res.data.breeders;
this.data=res.data

this.setState({
    spinner:false
})
  }

  catch(err){

Alert.alert('',JSON.stringify(err))


  }

}

   constructor(props){
        super(props)
        this.state={
            
            type:'',
            color1:'grey',
            color2:'grey',
            color3:'grey',
            color4:'grey',
           spinner:true
           
        }
       

   this.color='grey';
       this.type='' ;
    this.icons={

        'down':require('./assets/down.png'),
        'up':require('./assets/up.png')
      }
 this.batches={};

this.containers={};
this.breeders={};
this.data={};
 
    }

 
    



      colory (text){
     
     if(text =='Market'){

        this.setState({
            color1:'lightblue',
            color2:'grey',
            color3:'grey',
            color4:'grey',
            type:'Market'
        })
        
     }


     else  if(text =='Selection'){

        this.setState({
            color2:'lightblue',
            color3:'grey',
            color4:'grey',
            color1:'grey',
            type:'Selection'

        })
        
     }

     else  if(text =='Breeder'){

        this.setState({
            color3:'lightblue',
            color2:'grey',
            color4:'grey',
            color1:'grey',
            type:'Breeder'

        })
        
     }
     else  if(text =='Batch'){

        this.setState({
            color4:'lightblue',
            color3:'grey',
            color2:'grey',
            color1:'grey',
            type:'Batch'

        })
        
     }

      
      }

card (text,color) {

  
 
    return(
        
        
      
        <View style ={styles.card}>
               <Text style ={[styles.fontStyle,{color:color}]}>{text}</Text>
                </View>
                
               

    )
}




    render(){

      
                             return(
            
                        <View style={{backgroundColor:'#FFFFFF'}}>

<Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
              
                 <ScrollView
                 >
                 <TouchableOpacity onPress={()=>this.props.navigation.pop()} >
                    <Image source={require('./assets/path.png')} style={{margin:10}}
                 />
                 </TouchableOpacity>
                  
                             <Text style={{margin:10,fontSize:30,paddingLeft:10}}>{this.data.name}</Text>
                  <Text style={{margin:10,fontSize:20,color:'grey',paddingLeft:10}}>{this.props.navigation.getParam('breed')}</Text>
                             <Text style={{margin:10,fontSize:15,fontWeight:'bold',color:'grey',paddingLeft:10}}>{

                                 this.data.type}
                             </Text>
                  

               <View style={[styles.background,{backgroundColor:'#E9E9E9'}]}>
               <View style={{flexDirection:'row',justifyContent:'center',marginBottom:10,marginTop:45}}>
               <TouchableWithoutFeedback
               onPress={()=>this.colory('Market')}>
               { this.card ('Market',this.state.color1) }
               </TouchableWithoutFeedback>
               <TouchableWithoutFeedback
               onPress={()=>this.colory('Selection')}>
               { this.card ('Selection',this.state.color2) }
               </TouchableWithoutFeedback> 
                  
                
                 </View>
                 <View style={{flexDirection:'row',justifyContent:'center',marginBottom:40}}>
                 <TouchableWithoutFeedback
               onPress={()=>this.colory('Breeder')}>
               { this.card ('Breeder',this.state.color3) }
               </TouchableWithoutFeedback> 
               <TouchableWithoutFeedback
               onPress={()=>this.colory('Batch')}>
               { this.card ('Batch',this.state.color4) }
               </TouchableWithoutFeedback> 
                 </View>

         
         <View style={{alignItems:'center'}}>
          {this.state.type == 'Market' ? (
              
              this.containers.map(item=>{
            let container={};

             if(item._id.charAt(0)=='M')
            
                 {

                  return(
               // this.card2('Market',' 21 weeks (2 months)','8',item)
                     <Container  
                     container={item}
                       />
                  )}
              })):(<View></View>)}
          {this.state.type == 'Breeder' ? (
      
     






          this.breeders.map(breeder=>{
           let array=[],colonyId=[];


           breeder.dames.map(o=>{

            colonyId.push(o.data.colonyId)
        })
            breeder.batches.map(batch=>{


    this.batches.map(container=>{
  
    if(batch == container._id.$oid)
  array.push(container)
   

    })
    


  })
          return(
            <Breedercontainer   breeder={breeder}
            array={array} colonyId={colonyId}
           />
          ) 
          })
          
          
          
         ):(<View></View>)}
          {this.state.type == 'Batch' ? (this.batches.map(batch=>{
      let containers={};

              this.containers.map(container=>{

                  if(container._id ==batch.mmboxId){
                      containers.mm=container
                  }
                  if(container._id == batch.mfboxId){
                      containers.mf=container
                  }

                  if(container._id== batch.smboxId){
                      containers.sm=container
                  }

                  if(container._id == batch.sfboxId){
                      containers.sf=container
                  }

              })
              
           return(
               <Collapsible type={'Batch'} count={batch.count}  containers={containers}
               age={parseInt((new Date().getTime()- new Date (batch.dob).getTime())/(24*3600*1000))+' days'} />
           )
  

          })):(<View></View>)}
          {this.state.type == 'Selection' ? ( this.containers.map(item=>{
            let container={};

             if(item._id.charAt(0)=='S')
            {


                  return(
               // this.card2('Market',' 21 weeks (2 months)','8',item)
                     <Container  
                     container={item}
                       />)}})):(<View></View>)}
      
         
        </View>
          
                 </View>
              </ScrollView>

        
              </View>
           
            
            
        )
    }
}

export default Colonydetails
const height= Dimensions.get('window').height
const width= Dimensions.get('window').width
const styles=StyleSheet.create({

background:{

//backgroundColor:'#E9E9E9',
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
modal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.5)",
    
  },
  modalContainer: {
    width: "90%",
    height: "60%",
   
  },

  spinnerTextStyle:{
    color: '#FFF'
  }

})

