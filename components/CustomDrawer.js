import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Alert, AsyncStorage, StatusBar, Platform, Image } from "react-native";
import {  DrawerItems } from "react-navigation";

export const CustomDrawer = (props) => (
    <View 
        style={{
            flex:1, 
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 5
            }}>

            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <View 
              style={{alignItems: 'center', justifyContent:'center'}}
              >
                <Image 
                style={{
                  width:100,
                  height:100,
                  alignItems: 'center',
                }}
                source={require('../assets/user.png')}/>

                <Text style={{fontWeight: 'bold'}}>{props.navigation.state.params.name}</Text>

              </View>

              <DrawerItems {...props} />
              <TouchableOpacity onPress={()=>
                Alert.alert(
                  'Log out',
                  'Do you want to logout?',
                  [
                    {text: 'Cancel', onPress: () => {return null}},
                    {text: 'Confirm', onPress: () => {
                      AsyncStorage.clear();
                      props.navigation.navigate('SignedOut')
                    }},
                  ],
                  { cancelable: false }
                )  
              }>
                <Text style={{margin: 16,fontWeight: 'bold'}}>Logout</Text>
              </TouchableOpacity>
            </SafeAreaView>
        </View>
)