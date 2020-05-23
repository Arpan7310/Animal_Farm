import React ,{Component} from 'react'
import {View,Text,Dimensions,TextInput,TouchableOpacity,CheckBox, Alert} from 'react-native'
import { RadioButton } from 'react-native-paper';
import url from './Url'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Axios from 'axios';
class ReportDeath extends Component{



constructor(props){
    super(props);
    this.state={
        checked:'first',
        death:null,
        type:"",
        bool:false,
        batch_id:'',
        dob:'Nothing selected yet'
    }
}


 async reportDeath (){
let data={};

  data={
    type:'breeder',
    id:this.props.navigation.getParam('breederId'),
    count:this.state.death,
    death_type:this.state.type,
  
  }

  if(this.state.type=='neo'){

  data={
    ...data,
    batch_id:this.state.batch_id
  }
}
console.log(data)
try{

const res = await Axios.post(url +'reportDeath',data);
this.props.navigation.pop();
if(res.data.message)
Alert.alert(JSON.stringify(res.data.message))


}

catch(err){

Alert.alert(JSON.stringify(err.message))
}

}


    render(){
        const { checked } = this.state; 
        return(
 <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    
    <View style={{width:Dimensions.get('window').width-20,height:150,backgroundColor:'#7189FF',flexDirection:'column',borderRadius:10,margin:15,justifyContent:'center',alignItems:'center'}}>
    
    <Text style={{color:'white',fontSize:24}}>{this.props.navigation.getParam('colonyId')}</Text>
    <Text style={{color:'white',fontSize:24}}>{this.props.navigation.getParam('breederId')}</Text>
    <Text style={{color:'white',fontSize:24}}>{this.props.navigation.getParam('breedertype')}</Text>
   </View>
   <View>
   <View style={{flexDirection:'row',alignItems:'center',marginRight:120}}>
          <RadioButton
          value="first"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ checked: 'first' ,type:'sire',death:1,bool:false}) }}
        color='#7189FF'
          />
          <Text  style={{color:'grey'}}>Sire</Text>
          </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <RadioButton
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ checked: 'second',type:'dame',bool:true }); }}
          color='#7189FF'
        /> 
        <Text  style={{color:'grey'}}>Dame</Text>
        <RadioButton
          value="third"
          status={checked === 'third' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ checked: 'third', type:'neo',bool:true }); }}
          color='#7189FF'
        /> 
        <Text  style={{color:'grey'}}>Neo</Text>
        </View>
   <TextInput   editable={this.state.bool} 
 
   onChangeText={(e)=>this.setState({
       death:parseInt(e) })} 
       keyboardType={'numeric'}
          placeholder="enter dead" 
          style={{width:Dimensions.get('window').width-40,borderBottomColor:'grey',margin:10,borderBottomWidth:1}} keyboardType='numeric'/>
   </View>
  
    {this.state.type=='neo' ? 
    
    
    <View>
      <Text style={{color:'grey'}}>Select batch for Neo</Text>
     { this.props.navigation.getParam('neonates').map(item=>{
return(

  <TouchableWithoutFeedback
  onPress={()=>this.setState({
    batch_id:item.batchId,
    dob:item.dob
  })}
  
  style={{height:40,width:300,margin:10,borderRadius:10,borderColor:'grey',borderWidth:2,
 justifyContent:'center' ,alignItems:'center'}}>

<Text >Age {parseInt((new Date().getTime() - new Date(item.dob).getTime()) / (1000*60*60*24))} days</Text>
  </TouchableWithoutFeedback>
)
  })}
{this.state.dob =='Nothing selected yet'?<Text>{this.state.dob}</Text>: <Text>Selected value Age 
  {parseInt((new Date().getTime() - new Date(this.state.dob).getTime()) / (1000*60*60*24))} days
  </Text>}
 
    </View>
    
    :<View></View>}

 

   
    
   <TouchableOpacity style={{margin:25}}
   
   onPress={()=> Alert.alert(
    'Are You Sure?',
    '',
    [{text:'Yes',onPress: ()=> this.reportDeath()},
    {text:'cancel',onPress: ()=>console.log("cancel pressed")}]
  )}>
    <View style={{width:Dimensions.get('window').width-40,height:50,backgroundColor:'#7189FF',flexDirection:'column',borderRadius:10,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'white'}}>Update</Text>
    </View>
      </TouchableOpacity>
    </View>
        )
    }
}

export default ReportDeath