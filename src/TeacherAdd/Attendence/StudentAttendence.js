import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  Dimensions
} from 'react-native';
import { Actions, Router, Scene } from "react-native-router-flux";
import firebase from "firebase";
import { CheckBox, Header, Icon } from 'react-native-elements';

var today = new Date();
export default class StudentAttendence extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email   : '',
            password: '',
            childArray:[],
            checked:false,
            allData:[]
        };
    }
    
    componentDidMount(){

        console.log(today.toDateString())

        firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('Students').child('2019-20').child(this.props.cls).child(this.props.sec).once('value').then(snapshot => {

            var valueDict = Object.values(snapshot.val())
            valueDict.isChecked = true
            this.setState({childArray: valueDict})

            var allDict = snapshot.val()
       
            for (index in allDict) {
                
                allDict[index].isPresent = false
                allDict[index].teacherId = firebase.auth().currentUser.uid
                delete allDict[index].section
                delete allDict[index].class
                delete allDict[index].educationalYear
                delete allDict[index].timeAdded
                 
            }

              this.setState({allData : allDict})
              //console.log(this.state.allData)

        }).catch((error)=>{
            Alert.alert("Alert", ''+error);
            //console.log('error ' , error)
        })
    }
    classClick = (item) => {
        
       // Actions.SectionList({classId: item})
       var itemChecked =  !item.isPresent;
       item.isPresent = itemChecked
      
   
        console.log("outside");
        var SectionId = 0;
        var RowId = 0;

        for (index in this.state.allData) {
            if (this.state.allData[index].parentsID == item.parentsID){
                this.state.allData[index].isPresent = itemChecked
            }
            
        }
        this.setState({allData: this.state.allData})
        this.setState({items: this.state.childArray });
        console.log( this.state.allData)
    }
    
   
    rightButtonComponent = () => {
        return (
            <TouchableOpacity onPress={() => this.onSubmitPress()}>
                <Text style={{color:'white'}}>Submit</Text>
            </TouchableOpacity>
            
        );
    }
    //md-arrow-back
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
    onSubmitPress = () => {
        console.log('submitpress')
        firebase.database().ref('Attendence/').child(this.props.cls).child(this.props.sec).child(today.toDateString()).update(
            this.state.allData
          ).then((data)=>{
  

            console.log('ok', data)
  
  
          }).catch((error)=>{
              Alert.alert("Alert", ''+error);
              //console.log('error ' , error)
          })

    }
    renderRow = ({item}) => {
        return(
           
            <View style={{flexDirection:'row', alignItems:'center', }}>
                <View style={{flex:1}}>
                    <Text style={{ padding:10, fontSize:16}}>{item.fullName}</Text>
                </View>

                <View style={{flex:1, alignItems:'flex-end', marginRight:20}}>
                    <CheckBox
                        center
                        onPress={() => this.classClick(item)}
                        checked={item.isPresent}
                        />
                </View>
            </View>
        )
    }
    render() {
        return (
            //<SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <StatusBar backgroundColor="blue" barStyle="light-content" />
                 <Header
                    leftComponent={this.leftButtonComponent()}
                    centerComponent={{ text: 'Student List', style: { color: '#fff', fontSize:18 } }}
                    rightComponent={this.rightButtonComponent()}
                    
                    />
                <View style={styles.container}>
                  
                    <FlatList
                        style={styles.flatView}
                        data={this.state.childArray}
                        renderItem={this.renderRow}
                        bounces={false}
                        keyExtractor={(item, index) => index.toString()}

                    /> 
                    
                </View>
                </View>
            //</SafeAreaView>
     
        );
    }
}
let  width = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    flatView:{
        padding:10,
        height: '100%',
        width:'100%'
    },
    
    buttonStyle:{
        width:30,
        height:20,
        backgroundColor:'green',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:2,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 0,
            width: 0
        },
       
    }
 
});