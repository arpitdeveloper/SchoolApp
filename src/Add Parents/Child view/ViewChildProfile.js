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
import { Header, Icon, Avatar } from 'react-native-elements';


var today = new Date();
export default class ViewChildProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
        };
    }
    componentDidMount() {
        console.log(this.props.item.fullName)
       
    }
    leftButtonComponent = () => {
        return (
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
    onHomeWorkClick = () => {
        console.log("onhomewrok click.....", this.props.item.studentKey)
        Actions.HomeWorkList({ stdKey: this.props.item.studentKey, cls: this.props.item.class, sec: this.props.item.section})
    }
   
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white',  }}>
                <StatusBar backgroundColor="black" barStyle="light-content" translucent={true} />
                <Header
                    leftComponent={this.leftButtonComponent()}
                    centerComponent={{ text: 'Home Work', style: { color: '#fff', fontSize: 18 } }}
                />
                <View style={{ flexDirection:'row' }}>
                    <View style={{flex:0.5, height:150, justifyContent:'center', alignItems:'center'}}>
                        <Avatar
                            rounded
                            size={100}
                            title="FN"
                            showEditButton
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent:'center'}}>
                        <Text style={{fontSize:23, marginLeft:20}}>{this.props.item.fullName}</Text>
                        <Text style={{ fontSize: 15, marginLeft: 20, color: 'gray' }}>{this.props.item.class}</Text>
                        <Text style={{ fontSize: 15, marginLeft: 20, color: 'gray' }}>{this.props.item.section}</Text>
                    </View>
                </View>
                <View style={{ height: 2, width: '100%',  alignItems:'center', justifyContent:'center' }}>
                    <View style={{ height: 1, width: '90%', backgroundColor: 'gray' }} />
                </View>
                <View style={{flexDirection:'column', flex:1, margin:20, }}>
                    <View style={styles.twoView}>
                        <View style={styles.fourView}>
                            <TouchableOpacity style={styles.buttonView}>
                                <Avatar 
                                overlayContainerStyle={{backgroundColor:'green'}}
                                size={140} 
                                rounded 
                                icon={{ name: 'home' }}
                                containerStyle={{ flex: 1 }} />
                            <Text style={{ fontSize: 17, marginTop: 10 }}>Home Work</Text>
                            </TouchableOpacity>
                            
                        </View>
                        <View style={styles.fourView}>
                            <TouchableOpacity style={styles.buttonView} onPress={() => this.onHomeWorkClick()}>
                            <Avatar
                                overlayContainerStyle={{ backgroundColor: 'yellow' }}
                                size={140}
                                rounded
                                icon={{ name: 'home', color: 'black', }}
                                containerStyle={{ flex: 1 }} />
                                <Text style={{fontSize:17, marginTop:10}}>Home Work</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.twoView}>
                        <View style={styles.fourView}>
                            <TouchableOpacity style={styles.buttonView}>
                            <Avatar
                                overlayContainerStyle={{ backgroundColor: 'black' }}
                                size={140}
                                rounded
                                icon={{ name: 'home' }}
                                containerStyle={{ flex: 1 }} />
                            <Text style={{ fontSize: 17, marginTop: 10 }}>Home Work</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fourView}>
                            <TouchableOpacity style={styles.buttonView}>
                            <Avatar
                                overlayContainerStyle={{ backgroundColor: 'red' }}
                                size={140}
                                rounded
                                icon={{ name: 'home' }}
                                containerStyle={{ flex: 1 }} />
                            <Text style={{ fontSize: 17, marginTop: 10 }}>Home Work</Text>
                            </TouchableOpacity>   
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
let {  width } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        
    },
    twoView:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        flexDirection:'row',
        //backgroundColor: 'yellow'
    },
    fourView:{
        width:'100%',
        
        aspectRatio:1,
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:'red'
    },
    buttonView:{
       
        
        borderRadius:800,
        justifyContent:'center',
        alignItems:'center',
         shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 8,
        shadowOffset: {
            height: 0,
            width: 0
        },
        
    },
   
});