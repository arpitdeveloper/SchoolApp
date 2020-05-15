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
    state = {
      fullName:'',
      phoneNumber:'',
      ok:'',
      email   : '',
      password: '',
      category:'',
      userName:'',
    };
  }

  onClickListener = (viewId) => {
    this.signup(this.state.email, this.state.password)
  
  }
  async signup(email, pass) {

    try {
      firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(result => {
          // This is the success path
          console.log('result data:-----', firebase.auth().currentUser.uid)
          if (firebase.auth().currentUser.uid) {
            let ref = "/users/" + firebase.auth().currentUser.uid;
            firebase.database().ref(ref).set({
              userType:'parents',
              name:this.state.fullName,
              email:this.state.email,
              uid:firebase.auth().currentUser.uid
            })
            let ref2 = "/Parents/" + firebase.auth().currentUser.uid;
            firebase.database().ref(ref2).set({
              name:this.state.fullName,
              email:this.state.email,
              mobileNumber:this.state.phoneNumber,
              uid:firebase.auth().currentUser.uid

            })
          }else {
            console.log('not find datasa')
          }
      
      }).catch(error => {
          // This is the error path
         // console.log('error data:-----', error)
          Alert.alert("Alert", ''+error);
      });
      

    } catch (error) {
      console.log('eoroorooorooor: = ====',error.toString())
    }

}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Full Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(fullName) => this.setState({fullName})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://image.flaticon.com/icons/svg/126/126486.svg'}}/>
          <TextInput style={styles.inputs}
              placeholder="User Name"
              keyboardType="email-address"
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              onChangeText={(userName) => this.setState({userName})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email id"
              secureTextEntry={false}
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Phone Number"
              secureTextEntry={false}
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              onChangeText={(phoneNumber) => this.setState({phoneNumber})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Note"
              secureTextEntry={false}
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Catagory"
              secureTextEntry={false}
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              onChangeText={(category) => this.setState({category})}/>
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>Add</Text>
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
    width:20,
    height:20,
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