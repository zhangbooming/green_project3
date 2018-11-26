import React from 'react';
import { FlatList, StyleSheet,Text, View, Image, Card, Button, Icon, TextInput } from 'react-native';
import { CardViewWithIcon } from "react-native-simple-card-view";

class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state={
            text: ''
        }
    }

    render()
    {
        return(
            <View style={{flex:1}}>
                <View style={{height:70,paddingTop:30, backgroundColor:'white', borderColor:'lightgrey',borderBottomWidth:0.5,justifyContent:'center',alignItems:'center'}}>
                 <Text>Profile</Text>
                 <TextInput
                    style={{height: 40, marginTop: 200, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                  />
                </View>
            </View>
        )
    }

}

export default Profile;