import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    StatusBar,
    Dimensions
} from 'react-native';
import { Actions, Router, Scene } from "react-native-router-flux";
import firebase from "firebase";
import { Header, Icon, Avatar } from 'react-native-elements';
import { object } from 'prop-types';


var today = new Date();
export default class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            dataArray: [],
          
            modalVisible: true,
        };
    }
    componentDidMount() {
        // console.log(this.props.cls)
        // console.log(this.props.sec)
        this.setState({ modalVisible: true });
        firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('HomeWork').child('2019-20').child(this.props.cls).child(this.props.sec).once('value').then(snapshot => {
            this.setState({ modalVisible: false });
            // console.log(snapshot.val())
            var dictData = snapshot.val()

            var data = Object.keys(snapshot.val())
            data.sort((d1, d2) => new Date(d2).getTime() - new Date(d1).getTime());

            

            for (index in data) {

                var tempDictData = {}
                tempDictData[data[index]] = dictData[data[index]]
                this.state.dataArray.push(tempDictData)

            }
            this.setState({ dataArray: this.state.dataArray})
            //console.log(this.state.dataArray)

        })
    }
    onClickChild = (item) => {
        var newItem = Object.values(item)
        console.log('ok done child', newItem[0])
        var newD = newItem[0]
        Actions.ViewHomeWork( {newD} )
    }
    renderRow = ({ item }) => {
       
        var dateString = Object.keys(item)
        var newDate = ''

        var d = new Date();

        console.log('Today is: ' + d.toLocaleString());

        d.setDate(d.getDate() - 1);

        console.log('5 days ago was: ' + d.toDateString());
        if (dateString == today.toDateString()) {
            newDate = 'Today'
            console.log('todjay date is running')
        }
        else if (dateString == d.toDateString()){
       
            newDate = 'Yesterday'
        }else {
            newDate = dateString
        }
        return (
            <View style={styles.childCell}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.onClickChild(item)}>
                    <View>
                        <View>
                            <Text style={{ paddingLeft: 10, fontSize: 16 }}>{newDate}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    leftButtonComponent = () => {
        return (
            <TouchableOpacity onPress={() => this.onBackPress()}>
                <Icon
                    name='chevron-left'
                    type='evilicon'
                    size={50}
                    color='white'
                />
            </TouchableOpacity>
        )
    }
    onBackPress = () => {
        Actions.pop()
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <StatusBar backgroundColor="black" barStyle="light-content" translucent={true} />
                <Header
                    leftComponent={this.leftButtonComponent()}
                    centerComponent={{ text: 'Home Work List', style: { color: '#fff', fontSize: 18 } }}
                />
                <Modal
                    animationType='fade'
                    transparent={true}

                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ flex: 1, opacity: 0.2, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', justifyContent: 'center', height: 80, width: 80, borderRadius: 10 }}>
                            <ActivityIndicator size="large" color='black' />
                        </View>
                    </View>
                </Modal>
                 <View style={styles.container}>

                    <FlatList
                        style={styles.flatView}
                        data={this.state.dataArray}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index.toString()}

                    />
                </View> 
            </View>

        );
    }
}
let width = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    flatView: {
        padding: 10,
        flex: 1,
        width: '100%',
        marginBottom: 5

    },
    childCell: {
        width: '100%',
        
        backgroundColor: '#6ec6ff',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 0,
            width: 0
        },
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10

    },
    buttonStyle: {
        width: '100%',
        height: '60%',
        marginTop: 5
    }
});