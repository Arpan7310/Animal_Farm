import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, Modal, TouchableHighlight, Alert, pageSheet, formatSheet } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import Axios from 'axios'
import url from './Url'
class WeaningReport extends Component {


    constructor(){
        super()
        this.state={
            x:{},
            modalVisible: false,
            type:'a'
            
        }
    }

    componentWillMount() {
       
     
    this.props.navigation.addListener('willFocus', e =>{  Axios.post( url +'getWeaningData', 
        {
            id: this.props.navigation.getParam('id')
        }).then(res => {
           this.setState({
               x:res.data
           })
          
        }).catch(err => {
            Alert.alert('Could not connect to server', JSON.stringify(err));
        }); 
}
      )

  
}


 onSuccess = (e) => {
    let body=JSON.parse(e.data)
    Axios.post(url +'verifyContainer',{batchId:this.props.navigation.getParam('id'),qr:body,colonyId:this.props.navigation.getParam('colonyId'),boxType:this.state.type})
.then((res)=>{
    if( res.data.isValid ==true)
  this.props.navigation.push('Addmice',{array: res.data.weight, type: this.state.type, containerId: body.id, batchId:this.props.navigation.getParam('id')});

    Alert.alert(JSON.stringify(res.data.isValid))
}).catch(err=>{
    Alert.alert(JSON.stringify(err));
})
this.setState({
    modalVisible:!this.state.modalVisible
})
        

}






async completeWeaning (){

const body ={

    batchId:this.props.navigation.getParam('id'),
    breederId:this.props.navigation.getParam('breederId')
}
try{


    const res = await Axios.post( url +'completeWeaning',body);

 this.props.navigation.pop();

   
}
catch(err){
    Alert.alert('SOmething is wrong' ,JSON.stringify(err))
}

}
   render() {
        return (
            <View style={{flexDirection:'column',alignItems:'center' }}>
                <View style={{ width: Dimensions.get('window').width-20, height: 180, borderWidth: 0.2, borderColor: 'grey',  marginTop: 35,flexDirection:'column',alignItems:'center' }}>

                    <Text style={{  fontSize: 20, color: 'grey' }}>Add To Market</Text>
                    <View style={{ flexDirection: 'row',justifyContent:'center' }}>

                        <TouchableOpacity onPress={() => this.setState({
                            
                      modalVisible:!this.state.modalVisible ,
                        type:'mmboxId'
                            })
                           
               } >
                            <View style={{ width: 100, height: 100, backgroundColor: '#7189FF', borderRadius: 5, margin: 35 }}>
                                <Text style={{ color: 'white', margin: 20 }}>{this.state.x.mmboxId} Male</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => 

                            this.setState({
                            
                            modalVisible:!this.state.modalVisible ,
                              type:'mfboxId'
                                  })


                           } >
                            <View style={{ width: 100, height: 100, backgroundColor: '#FF92F4', borderRadius: 5, margin: 35 }} >
                                <Text style={{ color: 'white', padding: 20 }}>{this.state.x.mfboxId} Female</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ width: Dimensions.get('window').width-20, height: 180, borderWidth: 0.2, borderColor: 'grey',   marginTop: 35,flexDirection:'column',alignItems:'center'}}>
                    <Text style={{  fontSize: 20, color: 'grey' }}>Add To Selection</Text>
                    <View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'center' }}>

                        <TouchableOpacity onPress={() => this.setState({
                            
                            modalVisible:!this.state.modalVisible ,
                              type:'smboxId'
                                  })
                           } >
                            <View style={{ width: 100, height: 100, backgroundColor: '#7189FF', borderRadius: 5, margin: 35 }} >
                                <Text style={{ color: 'white', margin: 20 }}>{this.state.x.smboxId} Male</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({
                            
                            modalVisible:!this.state.modalVisible ,
                              type:'sfboxId'
                                  })
                           } >
                            <View style={{ width: 100, height: 100, backgroundColor: '#FF92F4', borderRadius: 5, margin: 35 }}>
                                <Text style={{ color: 'white', padding: 20 }}>{this.state.x.sfboxId} Female</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                       
                            this.setState({
                                modalVisible:!this.state.modalVisible
                            })
                    }}>

                    <QRCodeScanner
                        onRead={this.onSuccess}
                        reactivate={true}
                    />
                </Modal>

                <TouchableOpacity
                    onPress={() => {

                        Alert.alert("Are you sure?",
                        "",
                        [
                            {text:'Yes',onPress: () => this.completeWeaning()},
                            {text:'cancel', onPress: () => console.log("cancelled")}
                        ])
                       
                    }}>

                    <View style={{ width: Dimensions.get('window').width - 40, height: 50, backgroundColor: '#7189FF', flexDirection: 'column', borderRadius: 10, margin: 15, justifyContent: 'center', alignItems: 'center',marginTop:60 }}>
                        <Text style={{ color: 'white' }}>Complete Weaning</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default WeaningReport