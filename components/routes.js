import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { View, SafeAreaView, TouchableOpacity, Text, Alert, AsyncStorage, StatusBar, Platform, Image } from "react-native";
import LoginScreen from './LoginScreen';
import CreateAccount from './CreateAccount';
import UserHome from './user/UserHome';
import FeedList from './admin/FeedList';
import SingleFeed from './admin/SingleFeed';
import UserLocationList from "./admin/UserLocationList";
import UserMapView from "./admin/UserMapView";
import RecruitList from './admin/RecruitList';
import RecruitDetails from './admin/RecruitDetails';
import ReferPage from './user/ReferPage';
import { CustomDrawer } from './customDrawer';



const FeedBackView = createStackNavigator({
  FeedView: {
    screen: UserHome,
    navigationOptions: ({navigation}) => ({
      title: 'Feedback',
      headerTitleStyle: {
        marginLeft: -5,
      },
      headerLeft: () => {
        return <TouchableOpacity onPress={navigation.openDrawer}>
          <Image style={{width: 30, height: 30, marginLeft: 10}} source={require('../assets/bars.png')}/>
        </TouchableOpacity>
      }
    })
  }
}, {
  initialRouteName: 'FeedView'
})

const ReferralView = createStackNavigator({
  Referral: {
    screen: ReferPage,
    navigationOptions: ({navigation}) => ({
      title: 'Referral',
      headerTitleStyle: {
        marginLeft: -5,
      },
      headerLeft: () => {
        return <TouchableOpacity onPress={navigation.openDrawer}>
          <Image style={{width: 30, height: 30, marginLeft: 10}} source={require('../assets/bars.png')}/>
        </TouchableOpacity>
      }
    })
  }
}, {
  initialRouteName: 'Referral'
})

const FeedListView = createStackNavigator({
  FeedListView: {
      screen: FeedList,
      navigationOptions: ({navigation}) => ({
        title: 'Feedbacks',
        headerTitleStyle: {
          marginLeft: -5,
        },
        headerLeft: () => {
          return <TouchableOpacity onPress={navigation.openDrawer}>
            <Image style={{width: 30, height: 30, marginLeft: 10}} source={require('../assets/bars.png')}/>
          </TouchableOpacity>
        }
      })
  },
  SingleFeedView: {
      screen: SingleFeed,
      navigationOptions: {
        title: 'Details',
      }
  }
}, {
  initialRouteName: 'FeedListView',
})

const MapListView = createStackNavigator({
  UserLocationList: {
    screen: UserLocationList,
    navigationOptions: ({navigation}) => ({
      title: 'Tracker',
      headerTitleStyle: {
        marginLeft: -5,
      },
      headerLeft: () => {
        return <TouchableOpacity onPress={navigation.openDrawer}>
          <Image style={{width: 30, height: 30, marginLeft: 10}} source={require('../assets/bars.png')}/>
        </TouchableOpacity>
      }
    })
  },
  UserMapView: {
    screen: UserMapView,
    navigationOptions: {
      title: 'Map',
    }
  }
},{
  initialRouteName: 'UserLocationList'
})

const recruitView = createStackNavigator({
  RecruitList: {
      screen: RecruitList,
      navigationOptions: ({navigation}) => ({
        title: 'Submissions',
        headerTitleStyle: {
          marginLeft: -5,
        },
        headerLeft: () => {
          return <TouchableOpacity onPress={navigation.openDrawer}>
            <Image style={{width: 30, height: 30, marginLeft: 10}} source={require('../assets/bars.png')}/>
          </TouchableOpacity>
        }
      })
  },
  RecruitDetails: {
      screen: RecruitDetails,
      navigationOptions: {
        title: 'Entries',
      }
  }
}, {
  initialRouteName: 'RecruitList'
})

const SignedOut = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        }
    },
    Register: {
        screen: CreateAccount,
        navigationOptions: {
            header:null,
        }
    },
  }, {
    initialRouteName: 'Login',
  }
)

const UserViewDrawer = createDrawerNavigator({
    Feedback: {
        screen: FeedBackView,
    },
    Referral: {
      screen: ReferralView,
    }
}, {
    contentComponent:(props) => (
        <View 
        style={{
          flex:1,
          paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 10,
          }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <View 
              style={{alignItems: 'center', justifyContent:'center', marginBottom: 10}}
              >
                <Image 
                style={{
                  width:100,
                  height:100,
                  marginBottom: 10,
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
      ),
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle'
})

const AdminViewDrawer = createDrawerNavigator({
    FeedView: {
      screen: FeedListView,
    },
    Tracker: {
        screen: MapListView,
    },
    Recruit: {
      screen: recruitView,
    }
}, {
    contentComponent:(props) => (
        // <CustomDrawer {...props} />
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
      ),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
})

// const UserView = createStackNavigator({
//     defaulthome: UserViewDrawer
// })

// const AdminView = createStackNavigator({
//     defaulthome: AdminViewDrawer
// })

const AppContainer = createAppContainer(SignedOut);

const MainContainer = createAppContainer(createSwitchNavigator({
    SignedOut,
    AdminViewDrawer,
    UserViewDrawer
},{
    initialRouteName: 'SignedOut',
}))

export {
    SignedOut,
    AppContainer,
    MainContainer
}