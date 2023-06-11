import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MinhasTurmasPage from '../pages/MinhasTurmasPage';
import AccountOptionsPage from '../pages/AccountOptionsPage';
import CriarTurmaPage from '../pages/CriarTurmaPage';
import EditarTurmaPage from '../pages/EditarTurmaPage';
import BuscarTurmasPage from '../pages/BuscarTurmasPage';
import VisualizarTurmaPage from '../pages/VisualizarTurmaPage';
import VisualizarAtividadePage from '../pages/VisualizarAtividadePage';
import CriarAtividadePage from '../pages/CriarAtividadePage';
import EditarAtividadePage from '../pages/EditarAtividadePage';

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
      <Stack.Screen
        name="CriarTurmaPage"
        component={CriarTurmaPage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="EditarTurmaPage"
        component={EditarTurmaPage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="BuscarTurmasPage"
        component={BuscarTurmasPage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="VisualizarTurmaPage"
        component={VisualizarTurmaPage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="VisualizarAtividadePage"
        component={VisualizarAtividadePage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="CriarAtividadePage"
        component={CriarAtividadePage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="EditarAtividadePage"
        component={EditarAtividadePage}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
