import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import History from './components/History'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Constants from 'expo-constants'
import EntryDetail from './components/EntryDetail'
import { createStackNavigator } from '@react-navigation/stack'
import Live from './components/Live'

const Tabs = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator()

const TabsConfigs = {
  History: {
    component: History,
    name: 'History',
    options: {
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  }, 
  AddEntry: {
    component: AddEntry,
    name: 'Add Entry',
    options: {
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  },
  Live: {
    component: Live,
    name: 'Live',
    options: {
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
    }
  }
}

const TabNavigatorConfigs = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const TabNav = () => (
  <Tabs.Navigator {...TabNavigatorConfigs} >
    <Tabs.Screen {...TabsConfigs['History']} />
    <Tabs.Screen {...TabsConfigs['AddEntry']} />
    <Tabs.Screen {...TabsConfigs['Live']} />
  </Tabs.Navigator>
)

function UdaciStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Stack = createStackNavigator()

const MainNav = () => (
  <Stack.Navigator headerMode='screen'>
    <Stack.Screen 
      name='Home' 
      component={TabNav} 
      options={{headerShown: false}} 
    />
    <Stack.Screen 
      name='EntryDetail' 
      component={EntryDetail} 
      options={{
        headerTintColor: white,
        headerStyle: {backgroundColor: purple}
      }}
    />
  </Stack.Navigator>
)
 
export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
        <MainNav />
      </NavigationContainer>
    </Provider>
  )
}