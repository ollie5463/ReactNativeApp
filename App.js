import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Sounds from './components/Sounds';
import Helper from './Helper';

import AppNavigator from './navigation/AppNavigator';

export default function App() {
  init();
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }

init = () => {
  Helper.init();
  Sounds.initSounds();
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
