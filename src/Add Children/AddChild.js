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
      section: '',
      class0: '',
      year:'',
      parentsData:[]
    };
    this.onClickListener = this.onClickListener.bind(this);
  }

  componentDidMount(){
 
  }
  onClickListener = (viewId) => {

      console.log('if not')
      
      let ref = "/Parents/" + this.props.uid+ '/child';
      let msgId = firebase.database().ref(ref).push().key
      firebase.database().ref(ref).child(msgId).set({
        fullName:this.state.fullName,
        class:this.state.class0,
        section:this.state.section,
        parentsID:this.props.uid,
        educationalYear:this.state.year,
        timeAdded: firebase.database.ServerValue.TIMESTAMP,
        studentKey:msgId,
      })

      let ref2 = "/Students/"+this.state.year+ "/Class "+this.state.class0+"/Section "+this.state.section;
      //let msgId = firebase.database().ref(ref).push().key
      firebase.database().ref(ref2).child(msgId).set({
        fullName:this.state.fullName,
        class:this.state.class0,
        section:this.state.section,
        parentsID:this.props.uid,
        educationalYear:this.state.year,
        timeAdded: firebase.database.ServerValue.TIMESTAMP,
        studentKey:msgId,
        homeWork:"ok"
      })
      Actions.AdminPage()
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
              onChangeText={(fullName) => this.setState({fullName})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Educational Year"
              secureTextEntry={false}
              underlineColorAndroid='transparent'
              onChangeText={(year) => this.setState({year})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Class"
              secureTextEntry={false}
              underlineColorAndroid='transparent'
              onChangeText={(class0) => this.setState({class0})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Section"
              secureTextEntry={false}
              underlineColorAndroid='transparent'
              onChangeText={(section) => this.setState({section})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Ok"
              secureTextEntry={false}
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