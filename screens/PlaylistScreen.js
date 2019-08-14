import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Helper from '../Helper';

export default class PlaylistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { playlists: [] };
  }

  componentDidMount() {
    getPlaylistsForScreen().then((playlists) => {
      let textElements = this.state.playlists;
      playlists.rows._array.forEach((playlist, index) => {
        textElements.push(<Button key={index} title={playlist.Name}
          onPress={buttonPressed}></Button>);
      });
      this.setState({ playlists: textElements });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {{flex: 2}}></View>
        <View style={styles.playlists}>
        {this.state.playlists.map((value) => {
          return value;
        }) }
          <Button title="Create new playlist" onPress={createNewPlaylist}></Button>
              <TextInput
            style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>
        <View style={styles.playlists}>
        </View>
    </View>
    )
  }
}

function createNewPlaylist(props) {
  debugger;
  console.log(props);
}

function buttonPressed(props) {
  console.log(props);
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
    width: 150,
    height: 400,
  }
});
