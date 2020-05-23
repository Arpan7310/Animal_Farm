import React ,{Component} from 'react'
import {View,Text,Dimensions,ScrollView}   from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Axios from 'axios';
import url from './Url'
import { Alert } from 'react-native';
import Card from './Card'
 class Market extends Component{



  response={
  

  };

array=[];

date='';


  componentWillMount(){

Axios.post(url +'getContainerDetails',this.props.navigation.getParam('qr')).then((res)=>{
this.response=res.data
this.array=res.data.weight
this.date=(new Date(res.data.weight_taken_at).toUTCString())
this.forceUpdate();
Alert.alert('data is ',JSON.stringify(this.response))



}
).catch((err)=>{
Alert.alert("Something went wrong",JSON.stringify(err))

})


  }

    render(){

        return(
    <ScrollView>
    <View style={{flexDirection:'column',alignItems:'center'}}>
     <View style={{width:Dimensions.get('window').width-20,height:300,backgroundColor:'#7189FF',flexDirection:'column',borderRadius:10,margin:15,justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'white',fontSize:24}}>Colony 3</Text>
    <Text style={{color:'white',fontSize:24}}>Type:Harem</Text>
    
    <Text style={{color:'white',fontSize:24}}>Market</Text>
    <Text style={{color:'white',fontSize:24}}>{this.response.colonyId}</Text>
    <Text style={{color:'white',fontSize:24}}>Total Mice Present {this.response.count}</Text>
    <Text style={{color:'white',fontSize:24,textTransform:'capitalize'}}>Gender {this.response.gender}</Text>
      </View>
    
   <Card text={JSON.stringify(new Date(this.response.weight_taken_at))} />
  
    <View style={{width:Dimensions.get('window').width-20,height:100,borderRadius:20,alignItems:'center',margin:15,elevation:5,backgroundColor:'white',borderColor:'grey',borderWidth:0.2}}>
    <Text style={{color:'grey',fontSize:24,padding:30}} onPress={()=>this.props.navigation.push('MarketDeath')}>Report Death</Text>
    </View>
  

    
    </View>
<Card text={this.date} />
    {this.array.map((item)=>{
     return(

       <Card text={item} />
     )


    })}
   </ScrollView>
     

        )
    }
}

export default Market