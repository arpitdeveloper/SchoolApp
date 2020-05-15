import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage
 
} from 'react-native';

import { Actions, Router, Scene } from "react-native-router-flux";

export default class WelcomePage extends Component {

    handleLogin = () => {

        console.log(this.props.item.uid);
        Actions.SubjectPage({uid: this.props.item.uid})
    
    }

    render(){
        return (
   
            <TouchableOpacity style={styles.buttonTouch0} onPress={this.handleLogin}>
                
                <View style={styles.textView}>
                    <Text style={{color:'white', fontSize:20, fontStyle:'oblique',textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 5}}>{this.props.item.name}</Text>
                    <Text style={{color:'white', fontSize:18,textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 5}}>{this.props.item.category}</Text>
                </View>
            
            </TouchableOpacity>

        );
    }
  
}

const styles = StyleSheet.create({
    textView:{
        marginLeft:15,
        height:'95%',
        justifyContent:'flex-end',
        marginBottom:10
    },
    allView:{
        width:'100%'
    },
    buttonTouch0:{
        marginTop:10,
        marginBottom:10,
        width: '90%',
        height: 250,
        marginLeft:'5%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#000',
        shadowOpacity: 1,
        elevation: 10,
        backgroundColor : "yellow",
        borderRadius: 10,
    },
    
});
