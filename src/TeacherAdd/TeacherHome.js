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
ClassTeacherClick = () => {
  Actions.CSList()
}
onHomeWorkClick = () => {
  Actions.ClassList()
}
  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
       <View style={{flexDirection:'column', flex:0.5, marginLeft:20, marginRight:20, marginTop:15, marginBottom:10, justifyContent:'center', alignItems:'center'}}>
          <Image style={styles.imageIcon} source={require('../ImageIcon/logo.png')}/>

       </View>
      <View style={{flexDirection:'column', flex:1, marginLeft:10, marginBottom:10, marginRight:10}}>
          <View style={{flexDirection:'row', flex:1}}>
            <View style={{flex:1}}>
              <TouchableOpacity style={styles.buttonView} onPress={this.handleChild}>
                <Image style={styles.imageIcon} source={require('../ImageIcon/baby.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.lineView}/>

            <View style={{flex:1}}>
              <TouchableOpacity style={styles.buttonView} onPress={this.onHomeWorkClick}>
                <Image style={styles.imageIcon} source={require('../ImageIcon/homeWork.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.lineView}/>

            <View style={{flex:1}}>
              <TouchableOpacity style={styles.buttonView} onPress={this.ClassTeacherClick}>
                <Image style={styles.imageIcon} source={require('../ImageIcon/attend.png')}/>
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
              <TouchableOpacity style={styles.buttonView} >
                
                <Image style={styles.imageIcon} source={{uri: 'https://cdn3.iconfinder.com/data/icons/ecommerce-26/96/customer_service-512.png'}}/>
              </TouchableOpacity>
            </View>

            <View style={styles.lineView}/>

            <View style={{flex:1}}>
              <TouchableOpacity style={styles.buttonView} >
                <Image style={styles.imageIcon} source={{uri: 'https://image.flaticon.com/icons/png/512/83/83274.png'}}/>
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
              <TouchableOpacity style={styles.buttonView} onPress={this.handleChat}>
                
                <Image style={styles.imageIcon} source={require('../ImageIcon/chat.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.lineView}/>

            <View style={{flex:1}}>
              <TouchableOpacity style={styles.buttonView} onPress={this.handleSetting}>
                
                <Image style={styles.imageIcon} source={require('../ImageIcon/settings.png')}/>
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