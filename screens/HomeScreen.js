import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View
} from 'react-native';
import { Header } from 'react-native-elements';

import Helper from '../Helper';
import Sounds from '../components/Sounds';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlayButton: true,
      currentSong: null,
      header: null
    }
  }

  componentDidMount = () => {
    this.createHeader();
  }

  playButton = () => {
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
    }, () => { setTimeout(() => {
          this.createHeader();
        }, 5);
    });
  }

  createHeader = () => {
    const textForHeader = this.state.currentSong === null ? 'Click to play a song' : `Listening to: ${this.state.currentSong}`;
    this.setState({
      header: <Header
        centerComponent={{ text: textForHeader, style: { color: '#fff' }  }}
      />
    });
    this.forceUpdate();
  }

  render() {
    return (
      <View style={{ flex: 6 }}>
        <View style={{ flex: 2 }}>
          {this.state.header}
        </View>
          <View style={{ flex: 2, flexDirection:"row", justifyContent: 'space-between'}}>
            <Ionicons style={{ paddingLeft: 20, paddingTop: 25  }} name="ios-skip-backward" size={100}/>
          <Ionicons
              name={this.state.showPlayButton ? "ios-play" : "ios-pause"}
              size={150}
              onPress={this.playButton} />
            <Ionicons style={{ paddingRight: 20, paddingTop: 25 }} name="ios-skip-forward" size={100}/>
            </View>
          <View style={{ flex:2 }}></View>
        </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function pauseSound(songName) {
  Sounds.sounds[songName].pauseAsync();
}

function getCurrentSong() {
  return new Promise((resolve) => {
    getSound().then((result) => {
      resolve(result.rows._array[0].Name);
    })
  })
}

function playSound(songName) {
  Sounds.sounds[songName].playAsync();
}

function getSound() {
  return new Promise((resolve) => {
    const dataBase = Helper.database;
    dataBase.DB.transaction(tx => {
        tx.executeSql(`SELECT Name FROM Song WHERE ID=1`, [], (tx, result) => {
          resolve(result);
        })
    });
  })
}
