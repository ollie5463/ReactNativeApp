import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Helper from '../Helper';
import { CheckBox } from 'react-native-elements'

export default class PlaylistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      playlistName: null,
      checkBoxes: [],
      isCheckedList: []
    };
  }

  componentDidMount() {
    getSongsForPlaylistCreation().then((songs) => {
      let checkBoxes = this.state.checkBoxes;
      let isCheckedList = [];
      for (let i = 0; i < songs.length; i++) {
        isCheckedList[i] = false;
      }
      this.setState({ isCheckedList })

      songs.rows._array.forEach((song, index) => {
        this.setState(
          { checkBox: false }
        )
        checkBoxes.push(
          <CheckBox key={index} title={song.Name} value={false}
            // onPress={(() => {
            //   const currentState = this.state.isCheckedList;
            //   console.log(currentState[index]);
            //   currentState[index] = !currentState[index];
            //   this.setState({ isCheckedList: currentState })
            // })}
          ></CheckBox>
        );
      });
      this.setState({ checkBoxes });
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
        <View style = {{flex: 2}}></View>
        <View style={styles.playlists}>
        {this.state.playlists.map((value) => {return value;}) }
          <Button title="Create new playlist" onPress={(() => {
            createNewPlaylist(this.state)
          })}></Button>
              <TextInput
            style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(playlistName) => this.setState({playlistName})}
            value={this.state.playlistName}
          />
        </View>
        <View style={styles.playlists}>
          {/* <CheckBox value={false} width={100} height={100}></CheckBox> */}
          {this.state.checkBoxes.map((value) => { return value; })}
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
