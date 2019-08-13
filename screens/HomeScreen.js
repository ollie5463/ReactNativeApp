import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
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
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    createSounds();
    this.state = {
      showPlayButton: true,
      currentSong: null,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.skipBackwardButton}>
            <Ionicons name="ios-skip-backward" size={100}/>
        </View>
          <View style={styles.playButton}>
          <Ionicons name={this.state.showPlayButton ? "ios-play" : "ios-pause"} size={150} onPress={() => {
            if (this.state.showPlayButton) {
              getCurrentSong().then((song) => {
                this.setState({ currentSong: song });
                playSound(this.state.currentSong);
              });
            } else {
              pauseSound(this.state.currentSong);
            }
            this.setState({ 
              showPlayButton: !this.state.showPlayButton
            })
            }
          } />
        </View>
        <View style={styles.skipButton}>
            <Ionicons name="ios-skip-forward" size={100}/>
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function pauseSound(songName) {
  sounds.sounds[songName].pauseAsync();
}

function getCurrentSong() {
  return new Promise((resolve) => {
    getSound().then((result) => {
      resolve(result.rows._array[0].Name);
    })
  })
}

function playSound(songName) {
  sounds.sounds[songName].playAsync();
}

function getSound() {
  return new Promise((resolve) => {
    const dataBase = new Database();
    dataBase.DB.transaction(tx => {
        tx.executeSql(`SELECT Name FROM Song WHERE ID=1`, [], (tx, result) => {
          resolve(result);
        })
    });
  })
}

function createSounds() {
  sounds.initSounds();
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
