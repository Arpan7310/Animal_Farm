import React, { Component } from 'react'

import { View, Text, Picker, Button, Modal, Alert,Image,TouchableOpacity,TextInput} from 'react-native'
import AddDame from './AddDame';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Card from './Card'

import Axios from 'axios'
import url from './Url';
class CreateColony extends Component {
map = {};

    constructor(props) {
        super(props);
        this.state = {
            breeder:[],
            sire: null,
            language: '',
            type: '',
            modalVisible: false,
            array: [],
            c: 0,
            object: null,
            toVerify: '',
            addDameVisible: false,
            length:0,
            currentBId: '',
            cname:'',
            restId:null
        }

    }



onMyAss = (arr) => {

    Alert.alert('', arr);
    arr = JSON.parse(arr);
    const body = {
        'breederId': this.state.currentBId,
        'dames': arr.dames
    }

    const asda = this.state.breeder;
    asda.push(body);
    this.setState({
        breeder: asda
    });
};
    onSuccess = (e) => {
        const body = JSON.parse(e.data);
        Axios.post(url + 'verifyIdentity', { id: body.id, type: body.type, verifyType: this.state.toVerify }).then((res) => {
            
            if (res.data.isValid== true) {
                Alert.alert('Inside isvalid true');
                if (this.state.toVerify === 'sire') {
                    if (res.data.data) {
                        this.setState({
                            sire: res.data.data
                        });
                    }
                }
                    else if (this.state.toVerify === 'rest'){

                        this.setState({
                           restId:body.id

                        })

                    }
                    
                
            
            


                
                else {
                   
                    if (this.map[body.id]) {
                        Alert.alert('This breeder box is already added to list');
                        return;
                    }

                    this.map[body.id] = true;
                    const arry=this.state.array;
                    arry.push({data: body.id});
                  this.setState({
                      array:arry
                  })
                 
                }
            } else {
                Alert.alert('err',JSON.stringify(res.data));
            }
        }).catch((err) => {
            Alert.alert('1err', JSON.stringify(err));
        })
        this.setState({modalVisible: false});
    }


    delete = (x) => {

        let arry = this.state.array.filter((item) => {
            return item.data !== x
        })
        this.map[x] = false;
       this.setState({
           array:arry
       })
       arry = this.state.breeder.filter((item) => {
           return item.breederId !== x
       })
      this.setState({
          breeder:arry
      })
    }



    async uploadData() {
        const body = {
           restboxId:this.state.restId,
          breed: this.state.language,
          breeder_ids: this.state.breeder,
          sire_batchId: this.state.sire.batchId,
          sire_colonyId:this.state.sire.colonyId,
          colonyname:this.state.cname
        };
        try {
          const res = await Axios.post(url + 'createColony', body);
          Alert.alert('data uploaded', JSON.stringify(res.data.status));
          this.props.navigation.pop();
        } catch(err) {
          Alert.alert('Something went wrong', JSON.stringify(err));
        }
      }

    render() {
        return (
            <View style={{ alignItems: 'center' }}>

                <Text>Select Breed</Text>
                <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 190, borderRadius: 10, borderWidth: 1.2 }}
                    mode={"dropdown"}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ language: itemValue })
                    }   >
                    <Picker.Item label="BALB/c" value="BALB/c" />
                    <Picker.Item label="Swiss Albino" value="Swiss Albino" />
                    <Picker.Item label="C57BL6" value="C57BL6" />
                </Picker>

                <TouchableOpacity onPress={() => this.setState({
                    modalVisible: true,
                    toVerify: 'sire'
                })}>
                    <Card text={(this.state.sire)? this.state.sire.colonyId : 'add Sire details'} />
                </TouchableOpacity>
                <TextInput placeholder="enter colony name" onChangeText={text =>this.setState({
                    cname:text})} />
                <TouchableOpacity onPress={() => this.setState({
                    modalVisible: true,
                    toVerify: 'breeder'
                })}>
                    <Card text='Add Breeder' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({
                    modalVisible: true,
                    toVerify: 'rest'
                })}>
                    <Card text={(this.state.restId)? this.state.restId :'Add Rest'} />
                </TouchableOpacity>



                {this.state.array.map((d) =>
                    <TouchableOpacity onPress={() => {
                        this.setState({addDameVisible: true, currentBId: d.data});
                        {/* this.props.navigation.push('AddDame',{breederId: d.data, onGoBack: this.updateDames}); */}
                        
                        }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderWidth: 0.5, borderRadius: 15, margin: 10 }}>
                            <Image source={require('./assets/mice.png')} style={{ marginRight: 40 }} />
                            <Text>
                                Breeder {d.data}
                            </Text>
                            
                            <TouchableOpacity onPress={() => Alert.alert(
                                'Are you Sure You Want To Delete ?',
                                '',
                                [{ text: 'Cancel' },
                                { text: 'OK', onPress: () => this.delete(d.data) }]
                            )}>
                                <Image source={require('./assets/delete.png')} style={{ marginLeft: 50 }} />
                            </TouchableOpacity>
 
                        </View>
                    </TouchableOpacity>
                )}
            
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({
                            modalVisible: false
                        })
                    }}>
                    <QRCodeScanner onRead={this.onSuccess} reactivate={false} />
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.addDameVisible}
                    onRequestClose={() => {
                        this.setState({
                            addDameVisible: false
                        })
                    }}>
                    <AddDame dismiss={() => {
                        this.setState({addDameVisible: false})}} onGoBack={this.onMyAss} />
                </Modal>
                <Button onPress={()=>this.uploadData()} title='upload data' />
            </View>
        )
    }
}

export default CreateColony