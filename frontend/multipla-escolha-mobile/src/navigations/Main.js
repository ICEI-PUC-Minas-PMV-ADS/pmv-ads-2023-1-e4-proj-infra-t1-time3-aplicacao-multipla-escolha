import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MinhasTurmasPage from '../pages/MinhasTurmasPage';
import AccountOptionsPage from '../pages/AccountOptionsPage';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="MinhasTurmasPage"
        component={MinhasTurmasPage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AccountOptionsPage"
        component={AccountOptionsPage}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
