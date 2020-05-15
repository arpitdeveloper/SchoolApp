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

export default class LoginView extends Component {

    constructor(props) {
        super(props);
        state = {
            email   : '',
            password: '',
            childArray:[]
        };
    }

    onClickListener = (viewId) => {
        this.logout()
    }
  
    async logout() {

        try {

            await firebase.auth().signOut();
            Actions.WelComePage()
            // Navigate to login view

        } catch (error) {
            console.log(error);
        }

    }
    render() {
        return (
        <View style={styles.container}>

            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
            <Text style={styles.loginText}>Log out</Text>
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