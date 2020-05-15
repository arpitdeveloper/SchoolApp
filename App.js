import React, {Component} from 'react';
import { AsyncStorage, PermissionsAndroid} from 'react-native';
import WelComePage from './src/WelComePage';
import AdminPage from './src/AdminPage';


import AddChild from './src/Add Children/AddChild';
import SearchParents from './src/Add Children/SearchParents';

//Teachers------
import AddNewTeacher from './src/TeacherAdd/AddNewTeacher';
import TeacherHome from './src/TeacherAdd/TeacherHome';
import AddHomeWork from './src/TeacherAdd/AddHomeWork';
import ClassList from './src/TeacherAdd/HomeWork/ClassList';
import CSList from './src/TeacherAdd/Attendence/CSList';
import StudentAttendence from './src/TeacherAdd/Attendence/StudentAttendence';

//Parents--------
import AddParents from './src/Add Parents/AddParents';
import ParentsHome from './src/Add Parents/ParentsHome';
import ChildPage from './src/Add Parents/ChildPage';
import PSettingPage from './src/Add Parents/PSettingPage';
import ViewChildProfile from './src/Add Parents/Child view/ViewChildProfile';
import HomeWorkList from './src/Add Parents/HomeWork/HomeWorkList';
import ViewHomeWork from './src/Add Parents/HomeWork/ViewHomeWork';

//chat========
import PChat from './src/Chat/PChat';
import ChatList from './src/Chat/ChatList';

//Admin============
import AdminHome from './src/Admin/AdminHome';
import TeacherList from './src/Admin/TeacherList';
import SubjectPage from './src/Admin/SubjectPage';
import firebase from "firebase";
import { Actions, Router, Scene } from "react-native-router-flux";
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps'; 

export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      teacherLogin: false,
      adminLogin: false,
      parentsLogin: false,
      isWelcom: true,
      location: null,
      initialPosition:''
    };
  }
  watchID = null;
  UNSAFE_componentWillMount() {
    console.log('------------------------------1-----------------------')
    const granted =  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    if (granted) {
      console.log("You can use the ACCESS_FINE_LOCATION")
    }
    else {
      console.log("ACCESS_FINE_LOCATION permission denied")
    }
    // Geolocation.getCurrentPosition(info => {
    //   //console.log(info.coords)
    //   let leti = info.coords.latitude
    //   let longi = info.coords.longitude
    //   let ref = "/location";
    //   let msgId = firebase.database().ref(ref).push().key
    //   firebase.database().ref(ref).set({
    //     latitude: leti,
    //     longitude: longi,
     
    //   })
    // });

    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      { enableHighAccuracy: true },
    );
    this.watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      console.log('-----watch iod-----')
      console.log(lastPosition)
      // let leti = position.coords.latitude
      // let longi = position.coords.longitude
      // let ref = "/location";
      // //let msgId = firebase.database().ref(ref).push().key
      // firebase.database().ref(ref).set({
      //   latitude: leti,
      //   longitude: longi,

      // })
      //this.setState({ lastPosition });

    },
      { enableHighAccuracy: true, distanceFilter: 1 },

    );
 }
  
  render(){
    return (

      <Router>
          <Scene key="app" hideNavBar>
            <Scene key="WelComePage" component={WelComePage} initial={this.state.isWelcom}/>

          <Scene key="AdminHome" component={AdminHome} initial={this.state.adminLogin}/>
            <Scene key="AdminPage" component={AdminPage} hideNavBar={false}/>
            <Scene key="AddNewTeacher" component={AddNewTeacher} hideNavBar={false} title="Add Teacher"/>
            <Scene key="TeacherList" component={TeacherList} hideNavBar={false} title="Teacher List"/>
            <Scene key="SubjectPage" component={SubjectPage} hideNavBar={false} title="Add Teacher Subject"/>

            <Scene key="AddChild" component={AddChild} hideNavBar={false} title="Add Child"/>
            <Scene key="SearchParents" component={SearchParents} hideNavBar={false} title="Search Parents"/>

            <Scene key="AddParents" component={AddParents} hideNavBar={false} title="Add Parents"/>
            <Scene key="ParentsHome" component={ParentsHome} initial={this.state.parentsLogin}/>
            <Scene key="ChildPage" component={ChildPage} hideNavBar={false} title="Child" />
            <Scene key="PSettingPage" component={PSettingPage} hideNavBar={false} title="Child" />
            <Scene key="ViewChildProfile" component={ViewChildProfile} hideNavBar={true} />
            <Scene key="HomeWorkList" component={HomeWorkList} hideNavBar={true} />
            <Scene key="ViewHomeWork" component={ViewHomeWork} hideNavBar={true} />

            <Scene key="TeacherHome" component={TeacherHome} initial={this.state.teacherLogin}/> 
            <Scene key="AddHomeWork" component={AddHomeWork}/>
            <Scene key="ClassList" component={ClassList}/>
            <Scene key="CSList" component={CSList}/>
            <Scene key="StudentAttendence" component={StudentAttendence}/>

            <Scene key="ChatList" component={ChatList} hideNavBar={false} title="Users"/>
            <Scene key="PChat" component={PChat} hideNavBar={false} title="Chat"/>
            
          </Scene>
        </Router>
    );
  }
  
}
