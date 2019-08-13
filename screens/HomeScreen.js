import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Button } from 'react-native'
import { Database } from '../components/Database';
import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import Sounds from '../components/Sounds';

const sounds = new Sounds();
export default function HomeScreen() {
  createSounds();
  createDB();
  return (
    <View style={styles.container}>
      <View style={styles.skipBackwardButton}>
          <Ionicons name="ios-skip-backward" size={100}/>
      </View>
        <View style={styles.playButton}>
          <Ionicons name="ios-play" size={150} onPress={playSound}/>
      </View>
      <View style={styles.skipButton}>
          <Ionicons name="ios-skip-forward" size={100}/>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function playSound() {
  sounds.sounds.background_music.playAsync();
}

function createSounds() {
  sounds.initSounds();
}

function createDB() {
  const databaseExample = new Database();
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: 500,
    height: 500,
    flexDirection:"row",
    justifyContent: 'space-between',
    alignItems: "center"
  },
  playButton: {
    flex: 1,
    width: 150,
    height: 150,
  },
  skipButton: {
    flex: 1,
    width: 100,
    height: 100,
  },
  skipBackwardButton: {
    flex: 1,
    width: 100,
    height: 100,
    paddingLeft: 10
  }
});
