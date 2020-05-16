//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import * as Font from 'expo-font';
import Axios from 'axios';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
// import {Header} from 'react-navigation'

let userData;

// create a component
class UserHome extends Component {
    constructor(){
        super()
        this.state = {
            subject: '',
            description: '',
            id: '',
            username: '',
            fontloaded: false,
            location: {},
            errorMessage: '',
        }
    }

    // static navigationOptions = {
    //     title: 'Feedback',
    //     // header: (headerProps) => <Header {... headerProps} />,
    // };

    componentDidMount = async () => {
        let user = await AsyncStorage.getItem('user')
        userData = JSON.parse(user)
        await Font.loadAsync({
            'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
        });
        if(userData){
            this.setState({
                fontloaded: true, 
                id: userData._id, 
                username: userData.firstname + ' ' + userData.lastname
            })
            this._getLocation();
            await Location.startLocationUpdatesAsync('firstTask', {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 5,
            });
        }else{
            this.props.navigation.navigate('SignedOut')
        }
    }

    componentWillUnmount = async () =>{
        await Location.stopLocationUpdatesAsync('firstTask')
        .catch(err => {
            return;
        })
    }

    _getLocation = async () =>  {
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
    
        if(status !== 'granted'){
          console.log('permission not granted.');
          this.setState({
            errorMessage: 'Permission not granted'
          })
        }
    
        const location = await Location.getCurrentPositionAsync({});
        this.setState({
          location
        })
      }

    render() {
        if(this.state.fontloaded){
            return (
                <KeyboardAvoidingView style={styles.container}>
                    <View style={styles.firstview}>
                        <Text style={styles.textone}>Your feedback matters the most!</Text>
                    </View>
                    <KeyboardAvoidingView style={styles.viewtwo}>
                        <TextInput 
                        style={styles.textinputone} 
                        placeholder="Subject"  
                        onChangeText={subject => this.setState({subject})}
                        multiline={true}
                        value={this.state.subject}
                        // onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                        />
                        <TextInput 
                        style={styles.textinputtwo} 
                        placeholder="Description" 
                        placeholderTextColor="#C4C4C4"
                        onChangeText={description => this.setState({description})}
                        multiline={true}
                        value={this.state.description}
                        />
                        <TouchableOpacity 
                        style={styles.submit}
                        onPress={this.onSubmit}
                        >
                        <Text style={styles.submitbutton}>Submit</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </KeyboardAvoidingView>
            );
        }
        else{
            return <ActivityIndicator style={styles.container}/>
        }
    }
    onSubmit = () => {
        const url = "http://192.168.2.5:3000/feedback"
        
        let data = {
            subject: this.state.subject,
            description: this.state.description,
            userid: this.state.id,
            username: this.state.username,
        };
        // event.persist();
        Axios.post(url,data)
        .then(res => {
            let obj = res.data
            if(obj.success == true){
              alert("Feedback submitted")
              this.setState({
                subject: '',
                description: ''
            })
            }else{
              alert(res.message)
            }
        })
        .catch(err => console.log(err))
    }
}

// define your styles
const styles = StyleSheet.create({
    container:{
        flex: 1,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#302F31'
    },
    firstview:{
        flex: 1, 
        top: 40,
    },
    textone:{
        fontSize: 30, 
        fontFamily: 'Montserrat-Light',
        color: '#C4C4C4',
        textAlign: 'center',
    },
    
    viewtwo:{
        flex: 2,
        top: 40,
    },
    
    textinputone:{
        width: 279,
        height: 70,
        paddingRight: 20,
        borderWidth: 3,
        borderRadius: 15,
        borderColor: '#fff',
        borderStyle: 'solid',
        fontSize: 25,
        // textAlign: 'center',
        fontFamily: 'Montserrat-Light',
        color: '#C4C4C4',
        padding: 20,
    },
    textinputtwo:{
        paddingLeft:20,
        paddingRight: 20,
        paddingBottom: 90,
        marginTop: 50,
        width: 279,
        height: 150,
        borderWidth: 3,
        borderRadius: 15,
        borderColor: '#fff',
        borderStyle: 'solid',
        fontSize: 25,
        // textAlign: 'center',
        fontFamily: 'Montserrat-Light',
        color: '#C4C4C4',
    },
    submit:{
        width: 200,
        height: 54,
        borderRadius: 15,
        backgroundColor: '#111011',
        marginLeft: 43,
        marginBottom: 32,
        top: 20,
    },
    
    submitbutton:{
        color: '#FF8C04',
        fontSize: 24,
        textAlign:"center",
        marginTop: 4,
        fontFamily: 'Montserrat-Light',
        marginTop: 6,
        paddingTop: 7,
        marginBottom: 10,
    },
});

//make this component available to the app
export default UserHome;

TaskManager.defineTask('firstTask', ({data, error}) => {
    if(error){
      return;
    }
    if(data){
      const {locations} = data;
      const locationObject = {
          latitude: locations[0].coords.latitude,
          longitude: locations[0].coords.longitude,
      }
      if(userData !== null || userData !== undefined){
      let serverData = {
          locationObject,
          id: userData._id,
      }  
      Axios.post('http://192.168.2.5:3000/updatelocation', serverData)
      .then(res => {
          return;
      })
      .catch(err => {
          console.log(err)
      })
    }
    }
});
