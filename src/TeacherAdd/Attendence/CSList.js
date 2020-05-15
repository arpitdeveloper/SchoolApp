import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,

  ScrollView,
  TouchableOpacity,

  StatusBar,
  Dimensions
} from 'react-native';
import { Actions } from "react-native-router-flux";
import { Dropdown } from 'react-native-material-dropdown';
import { Header, Icon } from 'react-native-elements';

var today = new Date();
export default class CSList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classlabel   : '',
      sectionlabel : '',
      subjectlabel : '',
      note:'',
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
       
        {value: 'Section A'},
        {value: 'Section B'},
        {value: 'Section C'},
        {value: 'Section D'},
      ],
     
    };
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
  submitclick = () => {
    console.log('ok done')
    Actions.StudentAttendence({cls: this.state.classlabel, sec:this.state.sectionlabel})
  }
  
  render() {
    return (
      <View style={{flex:1, backgroundColor:'white'}}>
        <StatusBar backgroundColor="black" barStyle="light-content" translucent={true} />
          <Header 
            leftComponent={this.leftButtonComponent()}
            centerComponent={{ text: 'Attendence', style: { color: '#fff', fontSize:18 } }}
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
                onChangeText={(classlabel)=> {this.setState({classlabel});}}
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
            
            
          </View>
        </ScrollView>
        <View style={styles.bottomView}>
              <TouchableOpacity style={{backgroundColor:'green', height:50, width:200, alignItems:'center', justifyContent:'center', borderRadius:10}} onPress={this.submitclick}>
                <Text style={{fontSize:20, color:'white'}}>Continue</Text>
              </TouchableOpacity>
            </View>
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
   
    bottomView:{
        width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20,
    },
 
});