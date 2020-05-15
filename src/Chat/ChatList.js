import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList
} from 'react-native';
import { Actions, Router, Scene } from "react-native-router-flux";
import firebase from "firebase";

export default class AddChild extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName:'',
      textMessage:'dfs',
      messageList:[],
      keyList:[],
      userDict:[],
   
    };
    this.changeData = this.changeData.bind(this);
   
  }
  componentDidMount(){
    firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('users').once('value').then(snapshot => {
       
       this.changeData(snapshot.val())
         
    })
  }
  handleChnageText = key => val => {
    this.setState({[key]: val})
  }
  changeData(data){
    //console.log(data)
    this.setState({userDict: data})
    this.setState({keyList: Object.keys(data)})
    console.log(this.state.keyList)
  }
  renderRow = ({item}) => {
    return(
      <View>
        <Text>{item}</Text>
      </View>
    )
  }
  handleClick = () => {
    console.log('button click ho rha h')
    Actions.PChat({user:this.state.keyList[0]})
  }
  handleClick0 = () => {
    console.log('button click ho rha h0')
    Actions.PChat({user:this.state.keyList[1]})
  }
  handleClick10 = () => {
    console.log('button click ho rha h10')
    Actions.PChat({user:this.state.keyList[2]})
  }
   render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <TouchableOpacity onPress={this.handleClick}>
          <Text>{this.state.keyList[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleClick0}>
          <Text>{this.state.keyList[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleClick10}>
          <Text>{this.state.keyList[2]}</Text>
        </TouchableOpacity>
         {/* <FlatList
          style={styles.flatView}
          data={this.state.keyList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
        />  */}
        {/* <View style={styles.container}>
          <TextInput style={styles.textstyle}
            placeholder='message'
            onChangeText={this.handleChnageText('textMessage')}
          />
          <TouchableOpacity style={styles.buttonContainer} >
            <Text style={{fontWeight:'800', fontSize:18, color:'green'}}>Send</Text>
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.15,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  textstyle:{
    borderWidth:1,
    height:50,
    width:'70%',
    borderColor:'red',
    padding:10,
    borderRadius:25

  },
  buttonContainer:{
    height:50,
   // backgroundColor:'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:10,
    marginLeft:10
  },
  flatView:{

  },
  
});