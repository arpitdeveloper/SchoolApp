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
  FlatList,
  Dimensions
} from 'react-native';
import { Actions, Router, Scene } from "react-native-router-flux";
import firebase from "firebase";


export default class AddChild extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName:'',
      textMessage:'',
      messageList:[]
   
    };
    this.changeData = this.changeData.bind(this);
  }
  componentWillMount(){
    console.log(this.props.users)
    
    this.showChat()
  }
  showChat(){
    let ref = "/Message/" + firebase.auth().currentUser.uid + '/'+this.props.user;
    firebase.database().ref(ref).once('value').then(snapshot => {
       
      this.changeData(snapshot.val())
      
    })
  }
  handleChnageText = key => val => {
    this.setState({[key]: val})
  }
  changeData(data){
    //console.log(data)
    //this.setState({userDict: data})
    this.setState({messageList: Object.values(data)})
    console.log(this.state.messageList)
  }
  renderRow = ({item}) => {
    return(
      <View
        style={{
          flexDirection:'column',
          //width:'60%',
          maxWidth: '70%',
          alignSelf: item.from===firebase.auth().currentUser.uid ? 'flex-end' : 'flex-start',
          backgroundColor: item.from===firebase.auth().currentUser.uid ? '#00897b' : '#7cb342',
          borderRadius:5,
          marginBottom:10

        }}
      >
        <Text style={{color:'#fff', padding:7, fontSize:16}}>{item.msg}</Text>
        <View style={{ alignItems:'flex-end', justifyContent:'flex-end'}}>
        <Text style={{color:'#eee', padding:3, fontSize:12}}>{this.convertTime(item.time)}</Text>
        </View>
        
      </View>
    )
  }
  convertTime = (time) => {
    let d = new Date(time);
    let c = new Date();
    

    var options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    var timeString = d.toLocaleString('en-US', options);
    
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':'
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
    if (c.getDay() !== d.getDay() ){
      result =  d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }
    return result;

  }
  
  SendMessage = () => {
    if (this.state.textMessage != '')
    {
      console.log('if not')
      
      let ref = "/Message/" + firebase.auth().currentUser.uid + '/'+this.props.user;
      let msgId = firebase.database().ref(ref).push().key
      firebase.database().ref(ref).child(msgId).set({
        msg:this.state.textMessage,
        from:firebase.auth().currentUser.uid,
        time: firebase.database.ServerValue.TIMESTAMP,
      })

      let ref2 = "/Message/" + this.props.user + '/'+firebase.auth().currentUser.uid;
      //let msgId = firebase.database().ref(ref).push().key
      firebase.database().ref(ref2).child(msgId).set({
        msg:this.state.textMessage,
        from:firebase.auth().currentUser.uid,
        time: firebase.database.ServerValue.TIMESTAMP,
      })
      this.showChat()
      this.setState({textMessage:''})
    }else{

    }
  }
  
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
         <FlatList
          style={styles.flatView}
          //ref={elm => this.flatList = elm}
          ref = "flatList"
          
          onContentSizeChange={()=> this.refs.flatList.scrollToEnd()}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          //extraData={this.state.messageList}
          
        /> 
        <View style={styles.container}>
          <TextInput style={styles.textstyle}
            placeholder='message'
            onChangeText={this.handleChnageText('textMessage')}
            value={this.state.textMessage}
            autoCapitalize='none'
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={this.SendMessage}>
            <Text style={{fontWeight:'800', fontSize:18, color:'green'}}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      
    );
  }
}
let {height, width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding:15,
    paddingTop:10,

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
    padding:10,
    height: height * 0.7
  },
  
});