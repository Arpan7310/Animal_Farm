import React ,{Component} from 'react'
import {View,Text,Dimensions,ScrollView,Alert,ActivityIndicator,TouchableWithoutFeedback,TouchableOpacity}   from 'react-native'

import Axios from 'axios';
import url from './Url';
import ReportDeath from './ReportDeath';
import Spinner from 'react-native-loading-spinner-overlay';
 class BreederPage extends Component{

constructor(props){
  super(props)
  this.state={
    x:{},
    y:[],
    btype:null,
    spinner:true

  }
this.dames={};

}
 async componentDidMount() {
 try{
   const res= await Axios.post( url+'getContainerDetails', this.props.navigation.getParam('qr'))

   this.setState({
          x:res.data,
          y:res.data.neonates,
          btype:res.data.breed,
          spinner:false,
      

   })

this.dames=res.data.dames
this.forceUpdate();
 }
 catch(err){
   Alert.alert('',JSON.stringify(err))
 }
 
  }

Card (text,route){

  return(
 <TouchableOpacity onPress={()=>this.props.navigation.push(route,{

   breedertype:this.state.btype,
   colonyId:this.state.x.colonyId,
   breederId:this.state.x['_id'],
   neonates:this.state.y,
   breed:this.state.x.breed
   
   })}>
 <View style={{width:Dimensions.get('window').width-20,
 height:100,borderRadius:20,alignItems:'center',margin:15,backgroundColor:'white',borderColor:'grey',borderWidth:0.2}}>
 <Text style={{color:'grey',fontSize:24,padding:30}}>{text}</Text>
 </View>
 </TouchableOpacity>
  )

}


   render(){
       return(


    <View style={{flexDirection:'column',alignItems:'center'}}>
    
<Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />
        <TouchableWithoutFeedback
        
        
        onPress={()=>this.props.navigation.push('Colonydetails',{colonyId:this.state.x.colonyId,breed:this.state.x.breed})}>
    <View style={{width:Dimensions.get('window').width-20,height:150,backgroundColor:'#7189FF',
    flexDirection:'column',borderRadius:10,margin:15,justifyContent:'center',alignItems:'center',
    position:'absolute',elevation:1}}>
    <Text style={{color:'white',fontSize:14}}>{this.state.x.cName}</Text>
    <Text style={{color:'white',fontSize:14}}>Colony ID {this.state.x.colonyId}</Text>
    <Text style={{color:'white',fontSize:14}}>Breed:{this.state.x.breed}</Text>
    <Text style={{color:'white',fontSize:14}}>Box Id:{this.state.x._id}</Text>
      <Text style={{color:'white',fontSize:14}}>Nenonates batches :{this.state.y.length}</Text>
    <Text style={{color:'white',fontSize:14}}>Dames:{this.state.x.ndames}</Text>
   

     </View>
     </TouchableWithoutFeedback>
   
     <ScrollView style={{marginTop:180}}>
{this.Card('Report Birth','ReportBirth')}
   {this.Card('Report Death','ReportDeath')}

  
   
  
   
   {this.state.y.map((x)=>{
     return(
      <TouchableOpacity onPress={() =>
      this.props.navigation.push('Addmice',{'id': x.batchId,'colonyId': this.state.x.colonyId,'breederId':this.state.x['_id']})
   }>
    <View style={{width:Dimensions.get('window').width-20,height:100,borderRadius:20,alignItems:'center',margin:15,backgroundColor:'white',borderColor:'grey',borderWidth:0.2}}>
    <Text style={{color:'grey',fontSize:24,padding:30}} >{'Age: ' + parseInt((new Date().getTime() - new Date(x.dob).getTime()) / (1000*60*60*24)) + ' days'}</Text>
    </View>
    </TouchableOpacity>
   
     )   
   })}
  </ScrollView>


    </View>
            
     

        )
    }
}

export default BreederPage