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

            modalVisible: false,
        };
    }
    componentDidMount() {
        
       
        var dictData = this.props.newD

        var data = Object.keys(dictData)

        for (index in data) {

            var tempDictData = {}
            tempDictData[data[index]] = dictData[data[index]]
            this.state.dataArray.push(tempDictData)

        }
        this.setState({ dataArray: this.state.dataArray })
    }
    onClickChild = (item) => {

        Actions.ViewChildProfile({ item })
    }
    renderRow = ({ item }) => {

       
        return (

            <View style={styles.AllView}>
                <View style={{alignContent:'stretch'}}>
                    <Text style={{ paddingLeft: 5, fontSize: 18, fontWeight:'bold', textAlign:'justify', alignSelf:'stretch' }}>{Object.keys(item)}</Text>
                </View>
                <View>
                    <Text style={{ padding: 10, fontSize: 16 }}>{Object.values(item)}</Text>
                </View>
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
                        indicatorStyle='white'

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
    AllView: {
        width: '100%',
        padding:10,
        backgroundColor: '#e3f2fd',
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
    
});