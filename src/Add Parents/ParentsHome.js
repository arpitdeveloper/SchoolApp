import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView
} from 'react-native';
import { Actions, Router, Scene } from "react-native-router-flux";
//import {firebase} from 'firebase';
import firebase from "firebase";


export default class LoginView extends Component {

  constructor(props) {
    super(props);
    state = {
      email: '',
      password: '',
      vardL:[]
    };
  }
componentDidMount(){
 
}
handleChat = () => {
  Actions.ChatList();
}
handleChild = () => {
  Actions.ChildPage()
 
}
handleSetting = () => {
  Actions.PSettingPage()
}
  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
       <View style={{flexDirection:'column', flex:0.5, marginLeft:20, marginRight:20, marginTop:15, marginBottom:10, justifyContent:'center', alignItems:'center'}}>
       <Image style={styles.imageIcon} source={{uri: 'https://png2.cleanpng.com/sh/6ca984521d1bff4fea59c37861bbeb62/L0KzQYm3U8EzN5hmj5H0aYP2gLBuTfVlfZRmjNt4bj3vf7j2TfdzaaFtgdU2ZHX2ebj1TgNkcJD0hJ9BZXP3f8O0iPF1NZN0h918LUXkcYi6VMMxP5VpSdY5Lkm6QoS9U8U3OWY3SKs5N0O0Qoa4VcQveJ9s/kisspng-education-logo-graphic-design-school-vector-hat-books-5aa734307dd1d0.9723635615209073125154.png'}}/>

       </View>
      <View style={{flexDirection:'column', flex:1, marginLeft:10, marginBottom:10, marginRight:10}}>
          <View style={{flexDirection:'row', flex:1}}>
            <View style={{flex:1}}>
              <TouchableOpacity style={styles.buttonView} onPress={this.handleChild}>
                <Image style={styles.imageIcon} source={{uri: 'http://pluspng.com/img-png/user-png-icon-multy-user-icons-512.png'}}/>
              </TouchableOpacity>
            </View>

            <View style={styles.lineView}/>

            <View style={{flex:1}}>
              <TouchableOpacity style={styles.buttonView}>
            <Image style={styles.imageIcon} source={{uri: 'https://cdn2.iconfinder.com/data/icons/credocon/512/calendar-512.png'}}/>
              </TouchableOpacity>
            </View>

            <View style={styles.lineView}/>

            <View style={{flex:1}}>
              <TouchableOpacity style={styles.buttonView}>
                <Image style={styles.imageIcon} source={{uri: 'https://cdn3.iconfinder.com/data/icons/ecommerce-26/96/payment-512.png'}}/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.lineView2}/>

          <View style={{flexDirection:'row', flex:1}}>

            <View style={{flex:1}}>
              <TouchableOpacity style={styles.buttonView}>
                
                <Image style={styles.imageIcon} source={{uri: 'https://cdn3.iconfinder.com/data/icons/ecommerce-26/96/account-512.png'}}/>
              </TouchableOpacity>
            </View>

            <View style={styles.lineView}/>

            <View style={{flex:1}}>
              <TouchableOpacity style={styles.buttonView} onPress={this.handleChat}>
                
                <Image style={styles.imageIcon} source={{uri: 'https://cdn3.iconfinder.com/data/icons/ecommerce-26/96/customer_service-512.png'}}/>
              </TouchableOpacity>
            </View>

            <View style={styles.lineView}/>

            <View style={{flex:1}}>
              <TouchableOpacity style={styles.buttonView}>
                <Image style={styles.imageIcon} source={{uri: 'https://cdn0.iconfinder.com/data/icons/stationery-48/128/notebook-planner-diary-scrapbook-education-512.png'}}/>
              </TouchableOpacity>
            </View>

          </View>
          <View style={styles.lineView2}/>
          <View style={{flexDirection:'row', flex:1}}>

            <View style={{flex:1}}>
              <TouchableOpacity style={styles.buttonView}>
                
                <Image style={styles.imageIcon} source={{uri: 'https://cdn0.iconfinder.com/data/icons/stationery-48/128/notebook-planner-diary-scrapbook-education-512.png'}}/>
              </TouchableOpacity>
            </View>

            <View style={styles.lineView}/>

            <View style={{flex:1}}>
              <TouchableOpacity style={styles.buttonView}>
                
                <Image style={styles.imageIcon} source={{uri: 'https://cdn0.iconfinder.com/data/icons/stationery-48/128/notebook-planner-diary-scrapbook-education-512.png'}}/>
              </TouchableOpacity>
            </View>

            <View style={styles.lineView}/>

            <View style={{flex:1}}>
              <TouchableOpacity style={styles.buttonView} onPress={this.handleSetting}>
                
                <Image style={styles.imageIcon} source={{uri: 'https://png2.cleanpng.com/sh/a8a95caf6650d034c87b16feaf6c8266/L0KzQYm3VsI6N6l1R91yc4Pzfri0gB9ueKZ5feQ2aXPyfsS0gBxqeF5miuY2c3X3hLr1hCMuPZM4TqhqM3a7cYO3U8gvO2E1SKk7MUm0RYS3UskzP2oATagAOD7zfri=/kisspng-computer-icons-clip-art-settings-5b366a3f8a2038.3000721915302927995658.png'}}/>
              </TouchableOpacity>
            </View>
          </View>
      </View>
        
      </SafeAreaView>
      
    );
  }
}

const styles = StyleSheet.create({
  safeContainer:{
    flex:1
  },
  imageIcon:{
    height:'70%',
    width:'70%',
    resizeMode:'contain'
  },
  buttonView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    //backgroundColor:'yellow',
    borderRadius:10,
    margin:3
  },
  lineView:{backgroundColor:'gray', height:'100%', width:1},
  lineView2:{backgroundColor:'gray', height:1, width:'100%'},
  container: {
    flex: 1,
    width:'100%',
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