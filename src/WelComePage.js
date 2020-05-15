import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { Actions, Router, Scene } from "react-native-router-flux";
import firebase  from "firebase";
//import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
try {
  firebase.initializeApp({
    apiKey: "AIzaSyA_D-SOP8ae168hCT3AxhkXQTac1gI5_7A",
    authDomain: "schoolapp-88d39.firebaseio.com/",
    databaseURL: "https://schoolapp-88d39.firebaseio.com/",
    storageBucket: "schoolapp-88d39.appspot.com",
    projectId:"schoolapp-88d39"
  })
  } catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
  console.error('Firebase initialization error raised', err.stack)
  }}

import Geolocation from '@react-native-community/geolocation';

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      vardL:[],
      region: {
        latitude: 22.22000,
        longitude: 75.202000,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
    };
  }
  watchID = null;
  UNSAFE_componentWillUpdate() {
    // Geolocation.getCurrentPosition(info => {
    //   console.log(info.coords)
    //   let leti = info.coords.latitude
    //   let longi = info.coords.longitude
    //   let ref = "/location";
    //   //let msgId = firebase.database().ref(ref).push().key
    //   firebase.database().ref(ref).set({
    //     latitude: leti,
    //     longitude: longi,

    //   })
    // });
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      { enableHighAccuracy: true },
    );
    this.watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      console.log('-----watch iod-----')
      console.log(lastPosition)
      // let leti = position.coords.latitude
      // let longi = position.coords.longitude
      // let ref = "/location";
      // //let msgId = firebase.database().ref(ref).push().key
      // firebase.database().ref(ref).set({
      //   latitude: leti,
      //   longitude: longi,

      // })
      //this.setState({ lastPosition });

    },
      { enableHighAccuracy: true, distanceFilter:10 },
    
    );
    console.log('whatch id ;;;;;;;;;======', this.watchID)
    // this.watchID = Geolocation.watchPosition(position => {
    //   let dd = new Date(position.timestamp).getTime()
    //   console.log('what--------', dd)
    //   const lastPosition = JSON.stringify(position);
    //   this.setState({ lastPosition });
    // });
    // Geolocation.watchPosition( info => {
    //   console.log('jjjjjjjjj')
    //   let dd = new Date(info.timestamp).getTime()
      
    //   console.log('what--------', dd)
    //   let leti = info.coords.latitude
    //   let longi = info.coords.longitude
    //   let ref = "/location";
    //   //let msgId = firebase.database().ref(ref).push().key
    //   firebase.database().ref(ref).set({
    //     latitude: leti,
    //     longitude: longi,

    //   })
    // })
    
  }
  onClickListener = (viewId) => {
    if (viewId == 'login') {
      
      if((this.state.email == '') || (this.state.password == '')){
        Alert.alert("Alert", "Fill All the field");
      }else{
        this.login(this.state.email, this.state.password)
      }
      

    } else{
      
      Alert.alert("Alert", "Button pressed "+viewId);
    }

  }
  async login(email, pass) {
    
    try {
        
      firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(result => {
          // This is the success path
          firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('users').child(firebase.auth().currentUser.uid).once('value').then(snapshot => {
            var userData = snapshot.val();
            console.log(userData)
            console.log(userData['userType'])
            if (userData['userType'] == 'admin'){
             
              Actions.AdminHome()
            }else if(userData['userType'] == 'parents'){
          
              Actions.ParentsHome()
            }else  if(userData['userType'] == 'Teacher'){
       
              Actions.TeacherHome()
            }
            else{
             
              Alert.alert("Alert", 'User is not Avaliable');
            }
          })

      }).catch(error => {
          
          Alert.alert("Alert", ''+error);
      });

    } catch (error) {
        console.log(error.toString())
    }

}
async logout() {

  try {

      await firebase.auth().signOut();
      console.log("Logged out!");
      // Navigate to login view

  } catch (error) {
      console.log(error);
  }

}
  render() {
    return (
      <View style={styles.container}>
        {/* <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height:100,
          width:'100%'
        }}
          initialRegion={this.state.region}

        /> */}
        <View style={styles.inputContainer}>

          <Image style={styles.inputIcon} source={{uri: 'https://cdn4.iconfinder.com/data/icons/developer-set-3/128/dog-512.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://cdn4.iconfinder.com/data/icons/basic-user-interface-2/512/User_Interface-40-256.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>Login</Text>
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