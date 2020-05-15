import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { Actions, Router, Scene } from "react-native-router-flux";
import firebase from "firebase";
export default class AddChild extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName:'',
      phoneNumber:'',
      ok:'',
      email   : '',
      password: '',
      keyList:[],
      userDict:[]
    };
    this.onClickListener = this.onClickListener.bind(this);
  }

  componentDidMount(){
    
  
  }
  onClickListener = (viewId) => {
   
    firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('users').once('value').then(snapshot => {
       
        this.changeData(snapshot.val())
          
     })
  }
  changeData(data){
   
    this.setState({userDict: data})
    this.setState({keyList: Object.keys(data)})
    for (index in data){
        
        if (this.state.userDict[index]['email'] === this.state.fullName){
            console.log(this.state.userDict[index]['email'])
            Actions.AddChild({uid:index})
        }else{
            console.log('not find user')
        }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Enter Parents Email ID"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(fullName) => this.setState({fullName})}/>
        </View>
        
        
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>Search</Text>
        </TouchableHighlight>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});