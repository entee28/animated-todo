import AppContainer from './src/components/app-container';
import React from 'react';
import MainScreen from './src/screens/main-screen';
import Navigator from './src';

import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/register-screen';
import { StatusBar } from 'native-base';
import AvatarScreen from './src/screens/avatar-screen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppContainer>
      <StatusBar />
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="MainScreen"
          component={Navigator}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Avatar"
          component={AvatarScreen}
        />
      </Stack.Navigator>
    </AppContainer>
  );
}
