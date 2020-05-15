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
  SafeAreaView,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import { Actions, Router, Scene } from "react-native-router-flux";
import firebase from "firebase";

export default class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email   : '',
            password: '',
            childArray:[],
            childKey:[],
            modalVisible: true,
        };
    }
    componentDidMount(){
        this.setState({modalVisible: true});
        firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('Parents').child(firebase.auth().currentUser.uid).child('child').once('value').then(snapshot => {
            this.setState({modalVisible: false});
            //console.log(snapshot.val())
            this.setState({childArray: Object.values(snapshot.val())})
            this.setState({childKey: Object.keys(snapshot.val())})

        })
    }
    onClickChild = (item) => {
        //this.setState({modalVisible: true});
        console.log('ok done child', item)
        Actions.ViewChildProfile({item})

    }
    renderRow = ({item}) => {
        return(
            <View style={styles.childCell}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.onClickChild(item)}>
                    <View>
                        <View>
                            <Text style={{ paddingLeft: 10, fontSize: 16 }}>{item.fullName}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
           
      
        )
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <Modal
                    animationType='fade'
                    transparent={true}
                    
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{flex:1, opacity:0.2, backgroundColor:'black', justifyContent:'center',alignItems:'center'}}>
                        <View style={{ backgroundColor:'white', justifyContent:'center', height:80, width:80, borderRadius:10}}>
                            <ActivityIndicator size="large" color='black' />
                        </View>
                    </View>
                </Modal>
                <View style={styles.container}>
                  
                    <FlatList
                        style={styles.flatView}
                        data={this.state.childArray}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index.toString()}

                    /> 
                </View>
            </SafeAreaView>
     
        );
    }
}
let  width = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    flatView:{
        padding:10,
        flex:1,
        width:'100%',
        marginBottom:5
        
    },
    childCell:{
        width: '100%',
       
        backgroundColor:'#81d4fa',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 0,
            width: 0
        },
        borderRadius:15,
        justifyContent:'center',
        alignItems:'flex-start',
        marginTop:10
        
    },
    buttonStyle:{
        width:'100%',
        height:'60%',
        
        marginTop:5
    }
 
});