import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Dimensions, TextInput, ScrollView } from 'react-native'
import { RadioButton } from 'react-native-paper';
class Byage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: 'first',

    };
  }
  render() {
    const { checked } = this.state;
    return (
      <ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width - 20, height: 300, elevation: 5, backgroundColor: 'white', borderColor: 'grey', margin: 10, flexDirection: 'column', borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 120 }}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ checked: 'first' }); }}
                color='#7189FF'
              />
              <Text style={{ color: 'grey' }}>weeks</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ checked: 'second' }); }}
                color='#7189FF'
              />
              <Text style={{ color: 'grey' }}>months</Text>
            </View>

          </View>
          <View style={{ borderBottomWidth: 0.9, borderBottomColor: 'grey', width: Dimensions.get('window').width - 40, marginBottom: 25, marginLeft: 10 }}>
            <TextInput keyboardType='numeric' placeholder='min weight' />
          </View>


          <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey', width: Dimensions.get('window').width - 40, marginBottom: 25, marginLeft: 10 }}>
            <TextInput keyboardType='numeric' placeholder='max weight' />
          </View>


          <TouchableOpacity>
            <View style={{ width: Dimensions.get('window').width - 100, height: 40, elevation: 5, backgroundColor: '#7189FF', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', margin: 10 }} >
              <Text style={{ color: 'white', marginTop: 10 }}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>





    )
  }
}
export default Byage
