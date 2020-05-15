import React, { Component } from 'react';
import {
  StyleSheet,

  View,
  FlatList,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Actions, Router, Scene } from "react-native-router-flux";
import firebase from "firebase";
import TeacherCell from './TeacherCell';

export default class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email   : '',
            password: '',
            childArray:[]
        };
    }
    componentDidMount(){
        firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('Teacher').once('value').then(snapshot => {
        
            console.log(snapshot.val())
        
            this.setState({childArray: Object.values(snapshot.val())})

        })
    }
    handleClick = (item) => {
        console.log('click done', item)
    }
    
    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                  
                    <FlatList
                        style={styles.flatView}
                        data={this.state.childArray}
                        renderItem={({item}) => <TeacherCell item={item}/>}
                        keyExtractor={(item, index) => index.toString()}

                    /> 
                    
                </View>
            </SafeAreaView>
     
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
    childCell:{
        width: '100%',
        height:100,
        backgroundColor:'red',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
        },
        borderRadius:15,
        justifyContent:'center',
        alignItems:'flex-start',
        marginTop:10,
      
        
    },
    buttonStyle:{
        width:'100%',
        height:'100%',
        borderRadius:15,
        backgroundColor:'white',
        
    }
 
});