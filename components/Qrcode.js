'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Alert
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera as Camera } from 'react-native-camera';
class Qrcode extends Component {


    constructor(props){
        super(props);
        this.state=
        {
            a:""
        }
    }
 
  onSuccess = (e) => {
      
    this.setState({
        a:JSON.parse(e.data).type
    })

    if (this.state.a =='B')
    return this.props.navigation.navigate('Addmice');
  else if (this.state.a =='S')
    return this.props.navigation.navigate('ColonyPage');
      
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () =>
      this.setState({ focusedScreen: true ,
      a:''})
    );
    navigation.addListener('willBlur', () =>
      this.setState({ focusedScreen: false })
    );
  
    
  }

  

  render() {
    const { hasCameraPermission, focusedScreen} = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (focusedScreen ){
      return (<QRCodeScanner
        onRead={this.onSuccess}
        reactivate={true}
        topContent={
          <Text style={styles.centerText}>
            Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
          </Text>
        }
        
      />);
    } else {
      return <View
       />;
    }
  }
}


const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});



export default Qrcode
