import React ,{Component} from 'react'
import {View,Text,Dimensions,ScrollView}   from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

 class Selector extends Component{


    render(){

        return(
            <ScrollView>
              <View style={{flexDirection:'column',alignItems:'center'}}>
              
                <View style={{width:Dimensions.get('window').width-20,height:150,backgroundColor:'#7189FF',flexDirection:'column',borderRadius:10,margin:15,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{color:'white',fontSize:24}}>{this.props.navigation.getParam('count')}</Text>
                  <Text style={{color:'white',fontSize:24}}>Type:Harem</Text>
                  <Text style={{color:'white',fontSize:24}}>Generation:F1</Text>
                  <Text style={{color:'white',fontSize:24}}>Market</Text>
                </View>
                
                <View style={{width:Dimensions.get('window').width-20,height:100,borderRadius:20,alignItems:'center',margin:15,elevation:5,backgroundColor:'white',borderColor:'grey',borderWidth:0.2}}>
                  <Text style={{color:'grey',fontSize:24,padding:30}} onPress={()=>this.props.navigation.push('MarketDeath')}>Report Death</Text>
                </View>

                <View style={{width:Dimensions.get('window').width-20,height:100,borderRadius:20,alignItems:'center',margin:15,elevation:5,backgroundColor:'white',borderColor:'grey',borderWidth:0.2}}>
                  <Text style={{color:'grey',fontSize:24,padding:30}}>Show Previous Records</Text>
                </View>
              </View>
            </ScrollView>
     
        )
    }
}

export default Selector