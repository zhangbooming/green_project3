import React from 'react';
import { FlatList, StyleSheet,Text, View, Image, Button, TouchableOpacity, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import CodeInput from 'react-native-confirmation-code-input';
import TimerCountdown from 'react-native-timer-countdown';
import firebase from '../../config/config.js';
import UserAuth from '../components/auth.js'

class Home extends React.Component{

    constructor(props){
      super(props);

      this.state={
        loggedin: true,
        phoneNumberCheck: true,
        emailCheck: true,
        linkedinCheck: true,
        facebookCheck: true,
        startGroup:false,
        joinGroup:false,
        userid:'testuser1',
        groupcode:'testcode',
        groupusers:[],
        db:null
      }
    }

    componentDidMount = () =>{
      var that = this;
      firebase.auth().onAuthStateChanged(function(user){
        if(user){
          that.setState({
            loggedin:true,
            userId:user.uid
          });
        }else{
          that.setState({
            loggedin:false
          })
        }
      })
    }

    createGroup(userid){
      var that = this;
      firebase.database().ref('Groups').once('value')
      .then((snapshot) => {
        const exists = (snapshot.val() != null);
        if (exists)  {
          codeDict = snapshot.val()
          // console.warn(codeDict)
          for(var key in codeDict){
            if (codeDict[key] == ''){
              this.setState({groupcode:key});
            }
          }
          console.warn(this.state.groupcode)
        }
      })
      setTimeout(function(){that.navtoGroup()}, 500);
    }

    navtoGroup(){
      this.props.navigation.navigate('Group',{groupcode:this.state.groupcode})
    }

    joinGroup(groupcode){
      // this should query the db's groups table to find the matching dictionary object
      // it will return the list of user id's associated with the specific code
      // var userids = []
      // for code in groupcodes:
      //   if code == groupcode:
      //     userids += dict[code] (this is the list of userids)
      // return userids;

      var userids = ['testuser1','testuser2','testuser3','testuser4']
      this.setState({
        joinGroup:true,
        groupcode:groupcode,
        groupusers:userids
      })
    }

    getUser(userid){
      //this should query the users table of the db to return the stored information
      // given a certain userid
      // var userobj={
      //       id:{userid},
      //       name:'',
      //       email:'',
      //       phone:'',
      //       address:'',
      //       facebooklink:'',
      //       linkedinlink:''
      //      }
      // for user in users:
      //    if user.id == userid:
      //      userobj = user
      var userobj = {
            id:userid,
            name:'Test User',
            email:'test@user.com',
            phone:'555-555-1234',
            address:'123 Test Ave, Evanston IL 60201',
            facebooklink:'https://www.facebook.com/ryanmchenry2',
            linkedinlink:'https://www.linkedin.com/in/ryanmchenry2'
      }
      return userobj
    }



    render() {
      return (
        <View style = {styles.container}>
        { this.state.loggedin == true? (
          <View>
            <Text>userId:::   { this.state.userId }</Text>
         <CheckBox style = {styles.checkbox}
            title='Phone Number'
            checked={this.state.phoneNumberCheck}
            onPress={() => this.setState({phoneNumberCheck: !this.state.phoneNumberCheck})}
          />

          <CheckBox style = {styles.checkbox}
            title='Email'
            checked={this.state.emailCheck}
            onPress={() => this.setState({emailCheck: !this.state.emailCheck})}
          />

          <CheckBox style = {styles.checkbox}
            title='LinkedIn'
            checked={this.state.linkedinCheck}
            onPress={() => this.setState({linkedinCheck: !this.state.linkedinCheck})}
          />

          <CheckBox style = {styles.checkbox}
            title='Facebook'
            checked={this.state.facebookCheck}
            onPress={() => this.setState({facebookCheck: !this.state.facebookCheck})}
          />

          <TouchableOpacity style = {styles.customButton}
            title="Start Group"
            loading
            loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "#000000",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
            containerStyle={{ marginTop: 20 }}
            onPress={() => this.createGroup(this.state.userid)}
          >
            <Text style={styles.customButtonText}>START GROUP</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style= {styles.customButton}
            loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 1)",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
            containerStyle={{ marginTop: 20 }}
            onPress={() => this.setState({joinGroup: !this.state.joinGroup})}>
            <Text style={styles.customButtonText}> JOIN GROUP </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
          <UserAuth message="please login to use NameTag"></UserAuth>
          </View>
        )}

        </View>

      );
    }


}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
     paddingTop: 23,
     width: '80%',
     marginLeft: '10%'
  },
  checkbox: {
    margin: 100,
    height: 100,
    borderColor: '#7a42f4',
    borderWidth: 1,
    paddingTop: 100,
    backgroundColor: '#000',
    padding: 200,
  },
   customButton: {
     marginLeft: 'auto',
     marginRight: 'auto',
     marginTop: 30,
     paddingHorizontal: 50,
     paddingVertical:15,
     backgroundColor: 'purple',
     borderRadius: 100,
     shadowOpacity: 0.15,
      shadowRadius: 24,
      shadowColor: 'black',
      shadowOffset: { height: 0, width: 0 },
   },
   customButtonText: {
     color: 'white',
     fontWeight:'700',
     letterSpacing: 1,
   }
})

export default Home;
