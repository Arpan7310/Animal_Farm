import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, ListView, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Card, Chip, Divider, Title } from 'react-native-paper';
import { Button, Icon, Input } from 'react-native-elements';

class AddMiceNew extends Component {
state = {
    inputWeight: 0,
    mice: {
        mf: [],
        mm: [],
        sm: [],
        sf: []
    }
};
gender;
    constructor(props) {
        super(props);
        this.setState({state: this.state});
    }

    CounterSection(prop) {
        const header = prop.header;
        return (
            <Card style={{
                backgroundColor: '#9e9e9e',
                padding: 10
            }}>
                <Text style={styles.headerText}>{header}</Text>
                <Divider style = {styles.m10}/>
                <View style = {styles.hfsb}>
                    <View>
                        <Text style={styles.countVal}>0</Text>
                        <Text style={styles.countText}>Market</Text>
                    </View>
                    <View>
                        <Text style={styles.countVal}>0</Text>
                        <Text style={styles.countText}>Selection</Text>
                    </View>
                </View>
            </Card>
        );
    }

    MyChip = ({title, icon}) => {
        return (
            <Chip
                style = {{
                    backgroundColor: (this.gender === title) ? '#BBDEFB': 'white'
                }}
                mode = 'outlined'
                onPress = {() => {
                    this.gender = title;
                    this.forceUpdate();
                }}
                selected = {this.gender === title}
                icon={icon}>
                {title}
            </Chip>
        );
    }

    AddMiceSection() {
        const addMice = () => {
            console.log(this.state);
            if (!this.state || !this.state.inputWeight) {
                Alert.alert('Missing', 'Enter a weight to add data');
                return;
            }
            if (!this.gender) {
                Alert.alert('Missing', 'Specify the gender to add data');
                return;
            }
    
            // Alert.alert(('m' + this.gender[0]).toLowerCase() + this.state.inputWeight);
            const type = ('m' + this.gender[0]).toLowerCase();
            this.setState({[type]: [this.state.inputWeight]});
            console.log(this.state);
        }
        return (
            <View>
                <Divider style = {styles.m10}></Divider>
                <Title>Add new mice data</Title>
                <View style = {styles.newData}>
                    <this.MyChip icon='gender-male' title='Male'></this.MyChip>
                    <this.MyChip icon='gender-female' title='Female'></this.MyChip>
                    <TextInput
                        style = {styles.weightInput}
                        keyboardType = 'numeric'
                        placeholder='weight'
                        onChangeText = {text => {this.setState({inputWeight: text}); console.log(this.state)}}
                        />
                </View>
                <Button
                    buttonStyle = {{marginTop: 20}}
                    onPress = {() => addMice()}
                    title = 'Add Mice'
                    icon = {
                        <Icon
                            name='add'
                            color='#fff'/>
                    }>
                </Button>
            </View>
            
        );
    }

    DisplayList({type}) {
        console.log(type);
        console.log(this.state[type]);
        if (!this.state || !this.state[type]) {
            return <View>
                <Text>Yo, nothing in here</Text>
            </View>
        }
        console.log('ere');
        return(
            <FlatList
                keyExtractor = {item => item}
                data = {this.state[type]}
                renderItem = {
                    ({item}) => {
                        <Text>{item}</Text>
                    }
                }>
            </FlatList>
        );
    }
    render() {
        return (
            <SafeAreaView style={styles.page}>
                <Card style={styles.card}>
                    <View style = {styles.hfsb}>
                        <this.CounterSection header = 'male'></this.CounterSection>
                        <this.CounterSection header = 'female'></this.CounterSection>
                    </View>
                    {this.AddMiceSection()}
                </Card>
                {this.DisplayList({type: 'mm'})}
                {this.DisplayList({type: 'mf'})}
                {this.DisplayList({type: 'sm'})}
                {this.DisplayList({type: 'sf'})}
                {/* <this.DisplayList type = 'mm'></this.DisplayList>
                <this.DisplayList type = 'mf'></this.DisplayList>
                <this.DisplayList type = 'sm'></this.DisplayList>
                <this.DisplayList type = 'sf'></this.DisplayList> */}
            </SafeAreaView>
        );
    }
}

export default AddMiceNew
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ECEFF1',
        height: '100%'
    },
    card: {
        margin: 10,
        padding:10
    },
    newData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    m10: {
        margin: 10
    },
    hfse: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    hfsb: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18
    },
    countVal: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white'
    },
    countText: {
        textAlign: 'center',
        margin: 10,
        fontSize: 12,
        color: 'white'
    },
    weightInput: {
        width: 80,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 10,
    }
});