import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/navigations/Main';
import UserProvider from './src/context/UserContext';
import { colors } from './src/utils/colors';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#9391f8',
    accent: 'gray',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <UserProvider>
        <View style={styles.container}>
          <NavigationContainer styles={styles.container}>
            <Main />
          </NavigationContainer>
        </View>
      </UserProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.defaultBackgroundColor,
  },
});
