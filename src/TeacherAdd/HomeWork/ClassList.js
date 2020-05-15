import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  Dimensions
} from 'react-native';
import { Actions, Router, Scene } from "react-native-router-flux";
import firebase from "firebase";
import { Dropdown } from 'react-native-material-dropdown';
import { Header, Icon } from 'react-native-elements';


var today = new Date();
export default class ClassList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classlabel   : '',
      sectionlabel : '',
      subjectlabel : '',
      note:'',
      classData: [],
      sectionData: [],
      subjectData: [
        {value: 'Hindi'},
        {value: 'English'},
        {value: 'General Knowledge'},
        {value: 'Social Science'},
        {value: 'Science'},
        {value: 'Mathematics'},
        {value: 'Sanskrit'},
        
      ],
      allDict:[],
    };
  }
  componentDidMount(){
    firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('Students').child('2019-20').once('value').then(snapshot => {

      
      var vale = Object.keys(snapshot.val())
      for (index in vale) {
        var newData = {value:vale[index]}
        this.state.classData.push(newData)
      }
      this.setState({ classData: this.state.classData })

      console.log(vale) 

    }).catch((error) => {
      Alert.alert("Alert", '' + error);
      //console.log('error ' , error)
    })
  }
  leftButtonComponent = () => {
    return(
      <TouchableOpacity onPress={() => this.onBackPress()}>
        <Icon
            name='chevron-left'
            type='evilicon'
            size={50}
            color='white'
            />
      </TouchableOpacity>
    )
  }
  onBackPress = () => {
    Actions.pop()
  }
  handleEmail = (text) => {
    this.setState({ note: text })
    console.log(text)
  }
  submitclick = () => {
   
    if ((this.state.classlabel == '') || (this.state.sectionlabel == '') || (this.state.subjectlabel == '') || (this.state.note == '') || (this.state.classlabel == undefined) || (this.state.sectionlabel == undefined) || (this.state.subjectlabel == undefined)){
      Alert.alert("Alert", 'Please Fill All section');
      //undefined
    }
    else {
      var homeworkData = {}
      homeworkData[this.state.subjectlabel] = this.state.note
      firebase.database().ref('HomeWork/').child('2019-20').child(this.state.classlabel).child(this.state.sectionlabel).child(today.toDateString()).update(
        homeworkData
      ).then((data) => {
        Actions.TeacherHome()
        console.log('ok', data)
      }).catch((error) => {
        Alert.alert("Alert", '' + error);
      })
    }
  }
  onClassValueChange = (txt) => {
    
    this.setState({classlabel: txt})
    console.log(this.state.classlabel)
    firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('Students').child('2019-20').child(this.state.classlabel).once('value').then(snapshot => {


      var vale = Object.keys(snapshot.val())
      for (index in vale) {
        var newData = { value: vale[index] }
        this.state.sectionData.push(newData)
      }
      this.setState({ sectionData: this.state.sectionData })
      //var jjj = JSON.parse(Object.keys(snapshot.val()))

      console.log(vale)

    }).catch((error) => {
      Alert.alert("Alert", '' + error);
      //console.log('error ' , error)
    })

  }
  render() {
    return (
      <View style={{flex:1, backgroundColor:'white'}}>
        <StatusBar backgroundColor="black" barStyle="light-content" translucent={true} />
          <Header 
            leftComponent={this.leftButtonComponent()}
            centerComponent={{ text: 'Home Work', style: { color: '#fff', fontSize:18 } }}
          />
        <ScrollView style={styles.scrollV}>
          <View style={{alignItems:'center', marginTop:15}}>
            <Text style={{fontSize:20}}>{today.toDateString()}</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.dropView}>
              <Dropdown
                value={this.state.classlabel}
                data={this.state.classData}
                pickerStyle={{borderBottomColor:'transparent',borderWidth: 0,marginLeft:150, width:160, marginTop:50}}
              
                containerStyle = {styles.dropdown}
                label='Select Class'
                onChangeText={(classlabel)=> {this.onClassValueChange(classlabel);}}
              />
            </View>
            <View style={styles.dropView}>
              <Dropdown
                value={this.state.sectionlabel}
                data={this.state.sectionData}
                pickerStyle={{borderBottomColor:'transparent',borderWidth: 0,marginLeft:150, width:160, marginTop:50}}
              
                containerStyle = {styles.dropdown}
                label='Select Section'
                onChangeText={(sectionlabel)=> {this.setState({sectionlabel});}}
              />
            </View>
            <View style={styles.dropView}>
              <Dropdown
                value={this.state.subjectlabel}
                data={this.state.subjectData}
                pickerStyle={{borderBottomColor:'transparent',borderWidth: 0,marginLeft:150, width:160, marginTop:50}}
              
                containerStyle = {styles.dropdown}
                label='Select Subject'
                onChangeText={(subjectlabel)=> {this.setState({subjectlabel});}}
              />
            </View>
            <View style={styles.textView}>
              <TextInput style = {styles.input}
                underlineColorAndroid = "blue"
                placeholder = "HomeWork"
                autoCapitalize = "none"
                multiline
                style={{fontSize:17, paddingLeft:10, paddingRight:10}}
                onChangeText = {this.handleEmail}/>
            </View>
            <View style={styles.dropView}>
              <TouchableOpacity style={{backgroundColor:'green', height:50, width:200, alignItems:'center', justifyContent:'center', borderRadius:10}} onPress={this.submitclick}>
                <Text style={{fontSize:20, color:'white'}}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
let  width = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      height:'100%'
    },
    flatView:{
      padding:10,
      height: '100%',
      width:'100%'
    },
    dropView:{
      width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:10
    },
    buttonStyle:{
      width:'100%',
      height:'90%',
      backgroundColor:'green',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 5,
      shadowOffset: {
          height: 0,
          width: 0
      },
    },
    dropdown: {
      width: '80%',
    },
    textView:{
      width:'80%',
      marginTop:20
    },
   
 
 
});