import React ,{Component} from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import Card from './Card'
import { ScrollView } from 'react-native-gesture-handler'
class Selectbreed extends Component{


    render(){
        return(
        <View>
            <ScrollView>
            <TouchableOpacity onPress={()=>this.props.navigation.push('Filter')}>   
            <Card text='Bable c' />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.push('Filter')}>   
            <Card text='Swiss Albino' />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.push('Filter')}>   
            <Card text='Bable c' />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.push('Filter')}>   
            <Card text='Swiss Albino' />
            </TouchableOpacity>
            </ScrollView>
            
         </View>
        )
    }
}

export default Selectbreed