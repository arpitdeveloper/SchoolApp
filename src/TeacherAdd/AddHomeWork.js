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
export default class AddHomeWork extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email   : '',
            password: '',
            childArray:[]
        };
    }
    componentDidMount(){
        firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('Students').child('2019-20').once('value').then(snapshot => {
        
            console.log(snapshot.val())
            this.setState({childArray: Object.keys(snapshot.val())})

        })
    }
    classClick = ({item}) => {
        console.log('click ok', item)
        Actions.SectionList({classId: item})
    }
    renderRow = ({item}) => {
        return(
        
            <TouchableOpacity style={styles.buttonStyle} onPress={() => this.classClick({item})}>
                <View>
                    <View>
                        <Text style={{ padding:10, fontSize:16}}>{item}</Text>
                    </View>
                </View>
                
            </TouchableOpacity>
      
        )
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
    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor="blue" barStyle="light-content" translucent={true} />
                 <Header
                    
                    leftComponent={this.leftButtonComponent()}
                    centerComponent={{ text: 'Section', style: { color: '#fff', fontSize:18 } }}

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
  
 
});