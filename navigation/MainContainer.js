import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

//Screens
import HomeScreen from './screens/HomeScreen';
import InfoScreen from './screens/InfoScreen';

//Screen routes
const homeName = 'Home';
const infoName = 'Info';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused,color,size}) => {
                    let iconName;
                    let rn = route.name;
                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (rn === infoName) {
                        iconName = focused ? 'information-circle' : 'information-circle-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>
                }
            })}
            >
                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={infoName} component={InfoScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
