import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Text
} from 'react-native';
import { Actions, Router, Scene, Modal } from "react-native-router-flux";
import firebase, { auth } from "firebase";
import { Dropdown } from 'react-native-material-dropdown';



export default class AddChild extends Component {

  constructor(props){
    super(props);
    this.state={
    classData: [
      {value: 'Class 1st'},
      {value: 'Class 2nd'},
      {value: 'Class 3rd'},
      {value: 'Class 4th'},
      {value: 'Class 5th'},
      {value: 'Class 6th'},
      {value: 'Class 7th'},
      {value: 'Class 8th'},
      {value: 'Class 9th'},
      {value: 'Class 10th'},
      {value: 'Class 11th'},
      {value: 'Class 12th'},
    ],
    sectionData: [
      {value: 'All'},
      {value: 'Section A'},
      {value: 'Section B'},
      {value: 'Section C'},
      {value: 'Section D'},
    ],
    subjectData: [
      {value: 'All'},
      {value: 'Hindi'},
      {value: 'English'},
      {value: 'General Knowledge'},
      {value: 'Social Science'},
      {value: 'Science'},
      {value: 'Mathematics'},
      {value: 'Sanskrit'},
      
    ],
    otherData: [
      {value: 'All'},
      {value: 'Drawing'},
      {value: 'Music'},
      {value: 'Sports'},
      {value: 'None'},
      
    ],
    
    classValue: '',
    sectionValue:'',
    otherValue:'',
    subjectValue:''
    }
    var width = Dimensions.get('window');
  }

  componentDidMount() {
   
    }
    onClickHandle = () => {
      console.log(this.state.classValue)
      console.log(this.state.sectionValue)
      console.log(this.state.otherValue)
      console.log(this.state.subjectValue)
      var sub = this.state.subjectValue
      var subjectDict = {}
      subjectDict[sub] = this.props.uid
      
      
        firebase.database().ref('Subject/').child(this.state.classValue).child(this.state.sectionValue).update(
          subjectDict
        ).then((data)=>{

          var teacherSubject = {}
          teacherSubject['section'] = this.state.sectionValue
          teacherSubject['subjectName'] = this.state.subjectValue
          teacherSubject['time'] = '11:00 to 12:00 PM'  
          firebase.database().ref('Teacher/').child(this.props.uid).child('subject').child(this.state.classValue).update(
            teacherSubject
          ).then((data)=>{

            console.log('data ' , data)
            
          }).catch((error)=>{
          
              Alert.alert("Alert", ''+error);
              //console.log('error ' , error)
          })


        }).catch((error)=>{
            Alert.alert("Alert", ''+error);
            //console.log('error ' , error)
        })
    

    }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dropView}>
          <Dropdown
            value={this.state.label}
            data={this.state.classData}
            pickerStyle={{borderBottomColor:'transparent',borderWidth: 0, marginLeft:150, width:160, marginTop:50}}
            //dropdownOffset={{ 'top': 0 }}
            containerStyle = {styles.dropdown}
            label='Select Class'
            onChangeText={(classValue)=> {this.setState({classValue});}}
          />
        </View>
       
        <View style={styles.dropView}>
          <Dropdown
            value={this.state.label}
            data={this.state.sectionData}
            pickerStyle={{borderBottomColor:'transparent',borderWidth: 0,marginLeft:150, width:160, marginTop:50}}
           
            containerStyle = {styles.dropdown}
            label='Select Section'
            onChangeText={(sectionValue)=> {this.setState({sectionValue});}}
          />
        </View>
        <View style={styles.dropView}>
          <Dropdown
            value={this.state.label}
            data={this.state.subjectData}
            pickerStyle={{borderBottomColor:'transparent',borderWidth: 0, marginLeft:150, width:160, marginTop:50}}
           
            containerStyle = {styles.dropdown}
            label='Select Subject'
            onChangeText={(subjectValue)=> {this.setState({subjectValue});}}
          />
        </View>
        <View style={styles.dropView}>
          <Dropdown
            value={this.state.label}
            data={this.state.otherData}
            pickerStyle={{borderBottomColor:'transparent',borderWidth: 0, marginLeft:150, width:160}}
           
            containerStyle = {styles.dropdown}
            label='Other Activity'
            onChangeText={(otherValue)=> {this.setState({otherValue});}}
          />
        </View>
        <View style={styles.dropView}>
          <TouchableOpacity style={styles.buttonStyle} onPress={this.onClickHandle}>
            <Text style={{color:'white', fontSize:20}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: 'white',
  },
  dropdown: {
   
    width: '80%',
  },
  dropView:{
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
  buttonStyle:{
    backgroundColor:'green',
    width:'50%',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25
  },
});