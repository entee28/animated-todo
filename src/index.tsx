import { createDrawerNavigator } from '@react-navigation/drawer'
import MainScreen from './screens/main-screen';
import React from 'react';
import AboutScreen from './screens/about-screen';
import Sidebar from './components/Sidebar';
import LoginScreen from './screens/login-screen';
import RegisterScreen from './screens/register-screen';

const Drawer = createDrawerNavigator();

const Navigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName='Main'
            drawerContent={props => <Sidebar {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'back',
                overlayColor: '#00000000'
            }}
        >
            <Drawer.Screen name='Main' component={MainScreen} />
            <Drawer.Screen name='About' component={AboutScreen} />
            <Drawer.Screen name='Login' component={LoginScreen} />
        </Drawer.Navigator>
    )
}

export default Navigator