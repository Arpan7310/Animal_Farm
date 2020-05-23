import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  AppRegistry,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableNativeFeedback,
  TouchableHighlight,
  Alert,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import QRCodeScanner from 'react-native-qrcode-scanner';
import BreederPage from './BreederPage';
import Axios from 'axios'
import Card from './Card'
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  onSuccess = async (e) => {
    const qr = JSON.parse(e.data);

    if (qr.type !== 'B' && qr.type !== 'S' && qr.type !== 'M' && qr.type !== 'R') {
      Alert.alert('unrecognized QR code, please try again' , qr.type);
      return;
    }
    const map = {
      'B' : 'BreederPage',
      'M' : 'Msbox',
      'S': 'Msbox'
    };
    try {
     
      this.setModalVisible(!this.state.modalVisible);
     
      this.props.navigation.push(map[qr.type], {qr});  
    } catch (err) {
      Alert.alert('Something went wrong, try again' , JSON.stringify(err));
    }
    
  };


  async Logout (){

    await AsyncStorage.removeItem('pin');
    this.props.navigation.navigate('Loginpage')
  
   }
 card (text,route) {
  
return(
<TouchableOpacity onPress={()=>this.props.navigation.navigate(route)}>
<View
            style={{
              width: Dimensions.get('window').width - 20,
              height: 100,
              borderRadius: 20,
              alignItems: 'center',
              margin: 15,
              backgroundColor: 'white',
              borderColor: 'grey',
              borderWidth: 0.2,
            }}>
            <Text style={{color: 'grey', fontSize: 24, padding: 30}}>
              {text}
            </Text>
          </View>
          </TouchableOpacity>

)
 }

Scanner (text) {
return(
  <View>
 <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            
              this.setModalVisible(!this.state.modalVisible);
          }}>
          <QRCodeScanner onRead={this.onSuccess}
          topContent={
            <Text style={styles.topContent}>Scan For A Container</Text>
          }
           reactivate={false} />
        </Modal>

 <TouchableOpacity

         
onPress={() => {
  this.setModalVisible(true);
}}>
<View
  style={{
    width: Dimensions.get('window').width - 20,
    height: 150,
    backgroundColor: '#7189FF',
    flexDirection: 'row',
    borderRadius: 10,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',

  }}>
  <Image
    source={require('./qrcode.png')}
    style={{flex: 2, height: 100, width: 100}}
  />
  <Text
    style={{flex: 4, marginLeft: 30, color: 'white', fontSize: 24}}>
    {text}
  </Text>
</View>
</TouchableOpacity>

</View>

)


}
 render() {
    return (
      <ScrollView>
         {this.Scanner('Scan Container')}
         {this.card('Reset Pin','Store') }
         {this.card('Create Colony','CreateColony') }
         
         <TouchableOpacity onPress={()=>this.Logout()}>
    <View
            style={{
              width: Dimensions.get('window').width - 20,
              height: 100,
              borderRadius: 20,
              alignItems: 'center',
              margin: 15,
          
              backgroundColor: 'white',
              borderColor: 'grey',
              borderWidth: 0.2,
            }}>
            <Text style={{color: 'grey', fontSize: 24, padding: 30}}>
              Logout
            </Text>
          </View>
          </TouchableOpacity>
     </ScrollView>
    );
  }
}

export default Homepage;

const styles=StyleSheet.create({
  topContent:{
    fontSize:24,
    color:'black'
  }
})
