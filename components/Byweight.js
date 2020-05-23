import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Dimensions,TextInput,ScrollView} from 'react-native'
import DatePicker from 'react-native-datepicker'
class Byweight extends Component{

    constructor(props){
        super(props);
        this.state = {date:"2016-05-15"}
    }
    render(){
        return(
            <ScrollView>
            <View style={{  justifyContent: 'center', alignItems: 'center' ,width:Dimensions.get('window').width-20,height:250,elevation:5,backgroundColor:'white',borderColor:'grey',margin:10,flexDirection:'column',borderRadius:10}}>
        <View style={{borderBottomWidth:0.9,borderBottomColor:'grey',width:Dimensions.get('window').width-40,marginBottom:25,marginLeft:10}}>
        <TextInput keyboardType='numeric' placeholder='min weight'  />
        </View>
    

<View style={{borderBottomWidth:0.5,borderBottomColor:'grey',width:Dimensions.get('window').width-40,marginBottom:25,marginLeft:10}}>
<TextInput keyboardType='numeric' placeholder='max weight'  />
</View>
<DatePicker
        style={{width: 190,marginRight:175,borderColor:'transparent'}}
        date={this.state.date}
       mode='date'
        placeholder="select date"
        format="YYYY-MM-DD"
    
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft:28,
           
          borderColor:'transparent'
          },
          dateInput: {
        
            borderColor:'white',
            
          },
          
        
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />

<TouchableOpacity>
<View style={{width:Dimensions.get('window').width-100,height:40,elevation:5,backgroundColor:'#7189FF',borderRadius:20,flexDirection:'row',justifyContent:'center',margin:10}} >
<Text style={{color:'white',marginTop:10}}>Search</Text>
</View>
</TouchableOpacity>


    
    </View>
     
            </ScrollView>
          
        )
    }
}
export default Byweight