import React, { Component } from 'react'

import { Text, 
View, 
Modal, 
TextInput, 
TouchableOpacity,
 Dimensions, 
 formatSheet, 
 TouchableHighlight, 
 Alert, 
 useState ,
 Image,
 ScrollView,
 Picker,
 Button,
 StyleSheet} from 'react-native'
import Axios from 'axios';
import { RadioButton } from 'react-native-paper';
import url from './Url'
import { AppState } from 'react-native';
import Card from './Card'
import QRCodeScanner from 'react-native-qrcode-scanner';
import Spinner from 'react-native-loading-spinner-overlay';

class Addmice extends Component {


  
  mmqr={
    id:''
  };
  mfqr={
    id:""
  };
  smqr={
   id:''
  };
  sfqr={
    id:''
  };
  x=false;
  c=0;
  ob={
    id:'',
    value:'',
    box:'',
    gender:''
  };

heading={

mmboxId:'',
mfboxId:'',
smboxId:'',
sfboxId:''

};

boxId={

};


async componentDidMount(){


  
    try{
      const res= await Axios.post(url +'getWeaningData',{'id':this.props.navigation.getParam('id')})

      if(res.data.data){
     let arry=res.data.data
    arry.map(item=>{
       item.id=this.state.c++
       
     })

     this.setState({
      array:arry
    })

    }

    if(res.data.boxId)
    this.storeid(res.data.boxId);
    this.setState({
      spinner:false
    })

      }
      catch(err){
      console.log(err.message)
      console.log(this.props.navigation.getParam('id'))
      }
  


}


storeid(id){
  this.boxId=id;

}


constructor(props) {
    super(props);
    this.state = {
      checked:'first',
       modalVisible: false,
       
       array:[],
       y:null,
       c:0,
       language:'',
       sm:false,
       mm:false,
       sf:false,
       mf:false,
       modal:false,
       qr:false,
       mmt:'Click to scan market male',
       mft:'Click to scan market female',
       smt:'Click to scan selection male',
       sft:'Click to scan selection female',
       type:'',
       mma:[],
  sma:[],
  mfa:[],
  sfa:[],
  spinner:true

     
       
      }
 }


 onSuccess =(e) =>{

  let body=JSON.parse(e.data)
  Axios.post(url +'verifyContainer',{batchId:this.props.navigation.getParam('id'),qr:body,colonyId:this.props.navigation.getParam('colonyId'),boxType:this.state.type}).then((res)=>{
    console.log(this.state.type)
    console.log(body.id)
    if( res.data.isValid ==true){
      if(body.id.charAt()=='M'){
      if(  this.state.type == 'mmboxId'){
        if(this.state.mmt == 'Click to scan market male'){
        if( body.id !== ( this.state.mft))
         this.common(body)
         else 
         Alert.alert('conatiner used')
        }
          else if( body.id !== (this.state.mft))
          this.common(body)
         else
         Alert.alert('container used')
    }
    else if (  this.state.type == 'mfboxId'){
      if(this.state.mft == ('Click to scan market female')){
        if(body.id !== (this.state.mmt))
       this.common(body)
       else 
       Alert.alert('Container used ')
     }
     else if( body.id !== (this.state.mmt))
     this.common(body)
         else
         Alert.alert('container used')
    }
  
  }
 else  if(body.id.charAt()=='S'){
    if(  this.state.type == 'smboxId'){
      if(this.state.mmt == 'Click to scan selection male'){
      if( body.id !== ( this.state.sft))
       this.common(body)
       else
       Alert.alert('Container used')
      }
        else if( body.id !== (this.state.sft))
        this.common(body)
       else{
       Alert.alert('container used')
       this.setState({
         qr:false
       })
       }
  }
  else if (  this.state.type == 'sfboxId'){
    if(this.state.mft == ('Click to scan selection female')){
      if(body.id !== (this.state.smt))
     this.common(body)
     else 
     Alert.alert('Container used')
   }
   else if( body.id !== (this.state.smt))
   this.common(body)
       else{
       Alert.alert('container used')
       this.setState({
         qr:false
       })
      }
  }

}

 }
  else{
  Alert.alert('wrong container type',JSON.stringify(res.data.isValid))
  this.setState({
    qr:false
  })
  }
  }).catch(err =>{
    Alert.alert('',JSON.stringify(err.message))
  })

  }

  common (body){
    let a=body.id
    
    if(this.state.type=='mmboxId'){
    this.mmqr={id:body.id,type:this.state.type}
    this.forceUpdate();}
    if(this.state.type=='mfboxId'){
    this.mfqr={id:body.id,type:this.state.type}
    this.forceUpdate();}
    if(this.state.type=='smboxId'){
    this.smqr={id:body.id,type:this.state.type}
    this.forceUpdate();}
    if(this.state.type=='sfboxId'){
    this.sfqr={id:body.id,type:this.state.type}
    this.forceUpdate();}
    
    if(this.state.type=='mmboxId'){
      this.setState({
        qr:false,
        mmt:a
      });
      this.heading['mmboxId']="Container Updated  ID is " +a +"Market Male"
     this.boxId['mmboxId']=a;
        this.forceUpdate();
      
    }
      if(this.state.type=='mfboxId'){
      this.setState({
        qr:false,
        mft:a
      })
      this.heading['mfboxId']="Container Updated  ID is " +a +"Market Female"
      this.boxId['mfboxId']=a;
      this.forceUpdate();
     
      }
      if(this.state.type=='smboxId'){
      this.setState({
        qr:false,
        smt:a
      })
       this.heading['smboxId']="Container Updated  ID is " +a + "Selection Male"
       this.boxId['smboxId']=a;
      this.forceUpdate();
      }
      if(this.state.type=='sfboxId'){
      this.setState({
        qr:false,
        sft:a
      })
       this.heading['sfboxId']="Container Updated  ID is " +a + "Selection Female"
       this.boxId['sfboxId']=a;
      this.forceUpdate();
      }

  }


  setModalVisible(visible) {
    this.setState(
      {
        modalVisible: visible,
  
      }
    );
  }

 handleSubmit = () => {
const arry=this.state.array;
this.ob.id=this.state.c++;

  arry.push(this.ob)
  this.setState({
    array:arry
    })
  this.ob={
    id:'',
    value:'',
    box:'',
    gender:''
  };
  
 this.setModalVisible(!this.state.modalVisible)
     
  }



  delete =(i,b,g) => {

    let array=this.state.array.filter((item)=>{
  return item.id!==i})
this.setState({
  array:array
  })

}

  updateValue (i,d,g) {

  
const narry=this.state.array.map(item =>{

if(i==item.id)
return{
  ...item,box:d
}
else 
return item
})
this.setState({
  array:narry
})
}

updateContainer () {
this.c=0;
this.seperateArray();
let a=0, b=0 ,c=0,d=0;
this.state.array.map((item)=>{
if(item.gender=='male' && item.box=='market')
a++;
if(item.gender=='male' && item.box=='selection')
b++;
if(item.gender=='female' && item.box=='market')
c++;
if(item.gender=='female' && item.box=='selection')
d++;
})
if(a>0){
this.setState({
  mm:true 
})
this.c++;
}
else
this.setState({
  mm:false
})

if(b>0){
this.setState({
  sm:true
})
this.c++
}
else
this.setState({
  sm:false
})
if(c>0){
this.setState({
  mf:true
})
this.c++
}
else
this.setState({
  mf:false
})

if(d>0){
this.setState({
  sf:true
})
this.c++
}
else
this.setState({
  sf:false
})

this.setState({
  modal:true
})

}

seperateArray (){
  let arry1=[], arry2=[], arry3=[], arry4 =[];
  this.state.array.map(item=>{
  if(item.gender=='male' && item.box=='market')
   arry1.push(item.value)
   if(item.gender=='male' && item.box=='selection')
   arry2.push(item.value)
   if(item.gender=='female' && item.box=='market')
   arry3.push(item.value)
   if(item.gender=='female' && item.box=='selection')
   arry4.push(item.value)
})


arry1.sort((a,b)=> a.value < b.value);
arry2.sort((a,b)=> a.value < b.value);
arry3.sort((a,b)=> a.value < b.value);
arry4.sort((a,b)=> a.value < b.value);
if(this.boxId['mmboxId'])
this.textinbutton_mm(arry1,this.boxId['mmboxId'])
else 
this.textinbutton_mm(arry1)

if(this.boxId['smboxId'])
this.textinbutton_sm(arry2,this.boxId['smboxId'])
else
this.textinbutton_sm(arry2)

if(this.boxId['mfboxId'])
this.textinbutton_mf(arry3,this.boxId['mfboxId'])
else 
this.textinbutton_mf(arry3)


if(this.boxId['sfboxId'])
this.textinbutton_sf(arry4,this.boxId['sfboxId'])
else
this.textinbutton_sf(arry4)



this.setState({
  mma:arry1
})
this.setState({
  sma:arry2
})
this.setState({
  mfa:arry3
})
this.setState({
  sfa:arry4
})

}


textinbutton_mm(arry1,id){

  
  if(JSON.stringify(this.state.mma) == JSON.stringify(arry1))
     this.heading['mmboxId']=this.heading['mmboxId']
    else if(id)
   { this.heading['mmboxId']="Scan to update " + id + ' container' +" Market Male"
    this.mmqr.id='';
    this.forceUpdate();
    }
    else
    this.heading['mmboxId']="Scan to select new Markert male" 

}
textinbutton_sm(arry2,id){
  if(JSON.stringify(this.state.sma) == JSON.stringify(arry2))
  this.heading['smboxId']=this.heading['smboxId']
 else if(id)
{ this.heading['smboxId']="Scan to update " + id + ' container' + " Selection Male"
 this.smqr.id='';
 this.forceUpdate();
 }
 else
   this.heading['smboxId']="Scan to select new Selection Male"
 
    }
   

textinbutton_mf(arry3,id){
  if(JSON.stringify(this.state.mfa) == JSON.stringify(arry3))
  this.heading['mfboxId']=this.heading['mfboxId']
 else if(id){
 this.heading['mfboxId']="Scan to update " + id + ' container' + " Market Female"
 this.mfqr.id='';
 this.forceUpdate();
 }
 else
  this.heading['mfboxId'] ="Scan to select new Market Female"
 
}
textinbutton_sf(arry4,id){
  if(JSON.stringify(this.state.sfa) == JSON.stringify(arry4))
  this.heading['sfboxId']=this.heading['sfboxId']
 else if(id)
{ this.heading['sfboxId']="Scan to update " + id + ' container'  +" Selection Female"
 this.sfqr.id='';
 this.forceUpdate();
 }
 else
 this.heading['sfboxId']="Scan to select new Selection Female"
}

 async uploadData() {

  let body={}
  let res={}, el={};
  let a=0;
  let data=[],arry=[];
  this.state.array.map(item=>{
    res=Object.assign({},item)
    arry.push(res)
    })

    arry.map(item=>{
      delete item.id
    })
  
  this.mmqr.weights=this.state.mma
  this.mfqr.weights=this.state.mfa
 
  this.smqr.weights=this.state.sma
  this.sfqr.weights=this.state.sfa
  
console.log(this.mmqr)
console.log(this.mfqr)
console.log(this.smqr)
console.log(this.sfqr)

  body.batchId=this.props.navigation.getParam('id')

 if (this.mmqr.weights.length !== 0)
   data.push(this.mmqr)
    if (this.mfqr.weights.length !== 0)
    data.push(this.mfqr)
    if (this.smqr.weights.length !== 0)
 data.push(this.smqr)
    if (this.sfqr.weights.length !== 0)
    data.push(this.sfqr)
    body.data=data;
    body.weights=arry;



      if(this.mmqr.id!=='')
      a++;
      else 
      this.x=false;
    
    
 
      if(this.mfqr.id!=='')
      a++;
      else 
      this.x=false;
    
    
 
      if(this.smqr.id!=='')
      a++;
      else 
      this.x=false;
    
    
      if(this.sfqr.id!=='')
      a++;
      else 
      this.x=false;
    
    

  try {
    


  if(a==this.c)
  { res = await Axios.post(url + 'addWeaningData',body);
    this.setState({
      modal:false
    })
  this.props.navigation.pop();
 
 

   }
   else{
      Alert.alert('Scan all containers')
      console.log(body)
     }
  } catch(err) {
    Alert.alert('Something went wrong', JSON.stringify(err.message));
    Alert.alert('',JSON.stringify(body))
    console.log(body)
  }
}




updatefobject (){
  this.setState({ checked: 'second' })
  this.ob.gender='female',this.ob.box='market'
}
updatemobject (){
  this.setState ( { checked: 'first' })
  this.ob.gender='male',this.ob.box='market'
}

 async completeWeaning(){

 let  data={
    batchId:this.props.navigation.getParam('id'),
    breederId:this.props.navigation.getParam('breederId')
  }
try{
 await Axios.post(url +'completeWeaning',data)
 Alert.alert('Weaning completed');
  this.props.navigation.pop();
}
catch(err){
Alert.alert(JSON.stringify(err))
}
}

render() {
   
  const { checked } = this.state; 
    return (
    
       <View>
       <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
          <TouchableOpacity onPress={() =>
            this.setModalVisible(true)}

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

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            presentationStyle={formatSheet}
             onRequestClose={() => {
               this.setModalVisible(!this.state.modalVisible)
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#00000080'

              }}
            >
              <View
                style={{
                  width: 300,
                  height: 400,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  flexDirection: 'column',  alignItems: 'center',justifyContent:'center'
                }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <Text style={{color:'grey',marginBottom:50,marginTop:20}}> Please Enter Weight Below</Text>
                  <View style={{flexDirection:'row' ,justifyContent:'space-between'}} >
                  
                  <Image source={require('./assets/weight.png')} />
                  <TextInput keyboardType={'numeric'} placeholder="enter weight here " onChangeText={(e) => this.ob.value=e
                  } />
                </View>
                </View>
                <Text style={{color:'grey',marginTop:10}}>Select Gender</Text>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:10}} >
                  
                <RadioButton
                 value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                 
                onPress={() => this.updatemobject() }
                color='#7189FF'
                 />
                <Text  style={{color:'grey'}}>Male</Text>

                <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => this.updatefobject()}
                color='#7189FF'
                 />
                <Text  style={{color:'grey'}}>Female</Text>
                </View>


                <TouchableOpacity
                  onPress={(e) => {
                 this.ob.value !== '' && this.ob.gender !=='' ? (this.handleSubmit()
                  ) : (Alert.alert('Any one field is missing'))
                  }}>
                  <View style={{ width: 250, height: 50, backgroundColor: '#7189FF', flexDirection: 'column', borderRadius: 10, marginTop: 80, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>Add</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

      
       <ScrollView style={{marginBottom:70,marginTop:180}}>
        <Text style={{fontSize:20,color:'#7189FF',marginLeft:100}}>List of Male Species</Text>
         {this.state.array.sort((a,b)=> a.value < b.value).map((item)=>{
        if(item.gender=='male')
        return(
          <View style={{flexDirection:'row', alignItems:'center',borderWidth:0.5,borderRadius:15,margin:10}}>
          <Image source={require('./assets/mice.png')} style={{marginRight:10}} /> 
             <Picker
                    selectedValue={item.box}
                    style={{ height: 50, width: 150, borderRadius: 10, borderWidth: 1.2 }}
                    mode={"dialog"}
                    onValueChange={(itemValue, itemIndex) =>
                      
                        this.updateValue(item.id,itemValue,item.gender)
                       } 
                    
                    style={{width:150}}  >
                    
                    <Picker.Item label="Market" value="market"  />
                    <Picker.Item label="Selection" value="selection" />
                    
                </Picker>
          <Text style={{margin:8}}>
            {item.value}
          </Text>
          <Text style={{margin:5}}>{item.gender}</Text>
         
          
          <TouchableOpacity onPress={()=>Alert.alert(
            'Are you Sure You Want To Delete ?',
             '',
            [ { text: 'Cancel'},
             {text: 'OK', onPress: () => this.delete(item.id,item.box,item.gender)} ]
               )}>
          <Image source={require('./assets/delete.png') }  style={{marginLeft:34}} /> 
          </TouchableOpacity>
          
          </View>
            
        )


         })}
         <Text style={{fontSize:20,color:'#7189FF',marginLeft:100}}>List of Female Species</Text>
         {this.state.array.sort((a,b)=> a.value < b.value).map((item)=>{
        if(item.gender=='female')
        return(
          <View style={{flexDirection:'row', alignItems:'center',borderWidth:0.5,borderRadius:15,margin:10}}>
            <Image source={require('./assets/mice.png')} style={{marginRight:10}} /> 


            <Picker
                    selectedValue={item.box}
                    style={{ height: 50, width: 150, borderRadius: 10, borderWidth: 1.2 }}
                    mode={"dialog"}
                    onValueChange={(itemValue, itemIndex) =>
                      
                        this.updateValue(item.id,itemValue,item.gender)
                       } 
                    
                    style={{width:150}}  >
                    
                    <Picker.Item label="Market" value="market"  />
                    <Picker.Item label="Selection" value="selection" />
                    
                </Picker>
          <Text style={{margin:8}}>
            {item.value}
          </Text>
          <Text style={{margin:5}}>{item.gender}</Text>
         
          
          <TouchableOpacity onPress={()=>Alert.alert(
            'Are you Sure You Want To Delete ?',
             '',
            [ { text: 'Cancel'},
             {text: 'OK', onPress: () => this.delete(item.id,item.box,item.gender)} ]
               )}>
          <Image source={require('./assets/delete.png') }  style={{marginLeft:34}} /> 
          </TouchableOpacity>
          
          </View>
            
        )


         })}
         </ScrollView>

         
          <TouchableOpacity onPress={ ()=>
           
          this.updateContainer()
          }
            
            style={{position:"absolute" ,marginTop:Dimensions.get('window').height-150}}>
            <View style={{ width: Dimensions.get('window').width - 20, height: 50, backgroundColor: '#7189FF', flexDirection: 'row', borderRadius: 10, margin: 10, justifyContent: 'center', alignItems: 'center' ,}}>
              <Text style={{  color: 'white', fontSize: 24 }}>Proceed to Scan container</Text>
            </View>
          </TouchableOpacity>
      <Modal
          animationType="fade"
          visible={this.state.modal}
           presentationStyle={formatSheet}

           onRequestClose={()=>this.setState({
             modal:false,
             
           })}
           >
<View style={{flex:1,backgroundColor:'white'}}>
 <TouchableOpacity onPress={()=>Alert.alert('Are you Sure?','',
   [{text:'Cancel'},
   {text:'OK',onPress: ()=>this.completeWeaning()}])}> 
 <View style={styles.button}>
    <Text style={{fontSize:24,color:'white'}}>Complete Weaning</Text>
  </View>
 </TouchableOpacity>
 
{this.state.mm? (<TouchableOpacity   onPress={()=>this.setState({
  qr:true,
  type:'mmboxId'})}>
  <Card text={this.heading['mmboxId']}  /></TouchableOpacity>):(<Text></Text>)}
    {this.state.mf? (<TouchableOpacity
      onPress={()=>this.setState({
  qr:true,
  type:'mfboxId'})}
    >
    
  <Card text={this.heading['mfboxId']} /></TouchableOpacity>):(<Text></Text>)}
    {this.state.sm? (<TouchableOpacity
      onPress={()=>this.setState({
  qr:true,
  type:'smboxId'})}
    
    
    >
  <Card text={this.heading['smboxId']} /></TouchableOpacity>):(<Text></Text>)}

    {this.state.sf? (<TouchableOpacity
    
      onPress={()=>this.setState({
  qr:true,
  type:'sfboxId'})}
    
    
    >
  <Card text={this.heading['sfboxId']} /></TouchableOpacity>):(<Text></Text>)}

      <TouchableOpacity onPress={ ()=> this.uploadData() }
          style={{position:"absolute" ,marginTop:Dimensions.get('window').height-150}}>
            <View style={styles.button}>
              <Text style={{  color: 'white', fontSize: 24 }}>DONE</Text>
            </View>
         </TouchableOpacity>
<Text style={{color:'grey',marginTop:50}}> NOTE:If You Are Assigning  Qr IDs  for any  container/s for the first time then you can Assign other Non existing ID/s to that  specific Container/s   </Text>
<Text style={{color:'grey',marginTop:20}}> NOTE:Containers with pre-existing QR IDs cannot be modified</Text>
</View>



</Modal>
 <Modal

  animationType="fade"
          
    visible={this.state.qr}
   presentationStyle={formatSheet}
    onRequestClose={() => 
             this.setState({qr:false})
           }

>

<QRCodeScanner 


onRead={this.onSuccess}

topContent={
  <Text style={styles.top}>{this.heading[this.state.type]}</Text>
} reactivate={false} />
</Modal>





        </View>
     
    )
  }
}

export default Addmice

const styles=StyleSheet.create({

  top:{
    fontSize:18,
    color:'black'
  },

  button:{
    width: Dimensions.get('window').width - 20, height: 50, 
    backgroundColor: '#7189FF', 
    flexDirection: 'row', 
    borderRadius: 10, 
    margin: 10, 
    justifyContent: 'center', 
    alignItems: 'center'

  },
  spinnerTextStyle:{
    color:'#FFF'
  }
})