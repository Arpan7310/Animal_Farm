import React ,{Component} from 'react'
import {Text,View,Dimensions,TextInput,TouchableOpacity} from 'react-native'

import {connect,Provider}  from 'react-redux'
import {fetchdata} from './reducer/Action'
 class MarketDeath extends Component{

componentDidMount () {

    const {fetchdata} =this.props;
    fetchdata();
}



    render(){
        const {userData,error,bool} =this.props;
        return(
     <View style={{alignItems:'center',justifyContent:'center'}}>
  
      
      {userData.map(item=>{
          return(
          <Text>{item.title}</Text>
          )
      })}
  
    </View>
        )
    }
}



const mapStateToProps = (state) => {

    return {

        userData:state.data,
        error:state.error,
        bool:state.bool
    }
}

const mapDispatchToProps = (dispatch) => {

    return {

       fetchdata:()=> dispatch(fetchdata())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MarketDeath)