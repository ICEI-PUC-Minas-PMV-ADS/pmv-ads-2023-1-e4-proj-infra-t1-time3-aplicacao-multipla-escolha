import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { colors } from '../utils/colors';

export default function LoadingComponent() {
  const baseLoadingMessage = 'Carregando';

  const [loadingMessage, setLoadingMessage] = useState(baseLoadingMessage);

  useEffect(() => {
    setTimeout(() => updateLoadingMessage(), 200);
    function updateLoadingMessage() {
      if (loadingMessage.length < 13) {
        setLoadingMessage(loadingMessage + '.');
      } else {
        setLoadingMessage(baseLoadingMessage);
      }
    }
  }, [loadingMessage]);

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>{loadingMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.defaultBackgroundColor,
    textAlign: 'left',
  },
  loadingText: {
    fontSize: 21,
    fontWeight: 'bold',
    width: 140,
  },
});
