import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Helper from '../Helper';


export default class PlaylistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { playlists: [] };
  }

  componentDidMount() {
    getPlaylistsForScreen().then((playlists) => {
      this.setState({playlists: playlists.rows._array})
      console.log('state >>>>', this.state)
    });
  }

  render() {
    return (
    <View style={styles.container}>
      <Text>
        Playlist 5hundo
      </Text>
    </View>
    )
  }
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
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
