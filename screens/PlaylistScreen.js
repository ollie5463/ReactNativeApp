import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Helper from '../Helper';
// import { CheckBox } from 'react-native-elements'
import { CheckList } from '../components/Checklist';

export default class PlaylistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      listOfSongs: [],
      checkList: null
    };
  }

  createPlaylist(playlist, name) {
    console.log('chosen playlist: ', playlist);
    console.log('name: ', name);
  }

  componentDidMount() {
    getSongsForPlaylistCreation().then((songs) => {
      this.setState({ listOfSongs: songs.rows._array });
      let checkList = <CheckList createPlaylist={this.createPlaylist.bind(this)} listOfSongs={songs.rows._array}></CheckList>
      this.setState({ checkList });
    });
    getPlaylistsForScreen().then((playlists) => {
      let buttonElements = this.state.playlists;
      playlists.rows._array.forEach((playlist, index) => {
        buttonElements.push(<Button key={index} title={playlist.Name}
          onPress={buttonPressed}></Button>);
      });
      this.setState({ playlists: buttonElements });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
        </View>
        <View style={styles.playlists}>
          { this.state.checkList }
        </View>
        <View style={styles.playlists}>
        </View>
    </View>
    )
  }
}

function createNewPlaylist(state) {
  console.log('state>>> ', state.songCheckBoxes[0]);
}

function buttonPressed(props) {
  console.log(props);
}

function getSongsForPlaylistCreation() {
  return new Promise((resolve) => {
    const dataBase = Helper.database;
    dataBase.DB.transaction(tx => {
      tx.executeSql(`SELECT * FROM Song WHERE Playlist_ID IS NULL`, [], (tx, result) => {
          resolve(result);
        })
    });
  });
}

function getPlaylistsForScreen() {
  return new Promise((resolve) => {
    const dataBase = Helper.database;
    dataBase.DB.transaction(tx => {
        tx.executeSql(`SELECT * FROM Playlist`, [], (tx, result) => {
          resolve(result);
        })
    });
  })
}

PlaylistScreen.navigationOptions = {
  title: 'Playlists',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 500,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlists: {
    flex: 2,
    width: 400,
    height: 400,
  }
});
