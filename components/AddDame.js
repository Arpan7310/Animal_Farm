import React , {Component} from 'react'


import {Text,View,Modal,TouchableOpacity,Dimensions,Image,Alert,ScrollView} from 'react-native'
import Axios from 'axios'

import QRCodeScanner from 'react-native-qrcode-scanner';
import url from './Url'; 
class AddDame extends Component{
    

    constructor(){

        super()
        this.state={
            modalVisible:false,
            array:[],
            c:0,
            toVerify:'dame'
        }
    }

    onSuccess = (e) =>{

    const body =JSON.parse(e.data)
    Axios.post(url + 'verifyIdentity',{id:body.id,type:body.type,verifyType:this.state.toVerify}).then((res)=>{

        if(res.data.isValid){
         
            
        const arr=this.state.array;

        arr.push({data:res.data.data,id:this.state.c++});
        this.setState({
            array:arr
        })


        }
        else {

            Alert.alert(JSON.stringify(res.data.isValid))
        }
    }).catch((err)=>{

        Alert.alert(JSON.stringify(err))
    })
    
    this.setState({modalVisible: false});
    }


    
  delete =(x) => {


    let array=this.state.array.filter((item)=>{
    return item.id!==x})

    
  this.setState({
    array:array,
  
  })
  
  
    }

    render(){
        return(
            <View>
            <TouchableOpacity onPress={() =>
                this.setState({
                 modalVisible:true
                  })}

               style={{position:'absolute'}}
             >
            <View style={{ width: Dimensions.get('window').width - 20, height: 150, backgroundColor: '#7189FF', flexDirection: 'column', borderRadius: 10, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={require('./assets/add.png')} style={{marginRight:15}} />
              <Text style={{  color: 'white', fontSize: 24}} >Add Mice</Text>
             
              </View>
              
             <Text style={{  color: 'white', fontSize: 24 }}>Total Count {this.state.array.length }</Text>
            </View>
           
          </TouchableOpacity>
          <ScrollView style={{marginBottom:70,marginTop:170}}>
          {this.state.array.map((x)=>{
        return(
          <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-evenly',borderWidth:0.5,borderRadius:15,margin:10}}>
            <Image source={require('./assets/mice.png')} style={{marginRight:40}} /> 
          <Text >
           Dame {x.data.colonyId}
          </Text>
          <TouchableOpacity onPress={()=>Alert.alert(
            'Are you Sure You Want To Delete ?',
             '',
            [ { text: 'Cancel'},
             {text: 'OK', onPress: () => this.delete(x.id)} ]
               )}>
          <Image source={require('./assets/delete.png') }  style={{marginLeft:50}} /> 
          </TouchableOpacity>
          
          </View>
            
        )
         })}
         </ScrollView>
         <TouchableOpacity onPress={ ()=> {
           if (this.state.array == null || this.state.array.length == 0) {
             Alert.alert('Error', 'Please add atleast one dame to include this breeder');
             return;
           }
              this.props.onGoBack(JSON.stringify({dames: this.state.array}));
              this.props.dismiss();
            }
            }
            style={{position:"absolute" ,marginTop:Dimensions.get('window').height-180}}>
            <View style={{ width: Dimensions.get('window').width - 20, height: 50, backgroundColor: '#7189FF', flexDirection: 'row', borderRadius: 10, margin: 10, justifyContent: 'center', alignItems: 'center' ,}}>
              <Text style={{  color: 'white', fontSize: 24 }}>DONE</Text>
            </View>
          </TouchableOpacity>
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.'),
            this.setState({
           modalVisible:false})
          }}>
          <QRCodeScanner onRead={this.onSuccess} reactivate={false} />
        </Modal>
            </View>
        )
    }
}

export default AddDame