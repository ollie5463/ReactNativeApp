import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Helper from '../Helper';
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
    createPlaylistOnDB(playlist, name).then(() => {
      getSongsForPlaylistCreation().then((songs) => {
        this.setState({ listOfSongs: songs.rows._array });
        })
      }
    );
  }

  componentDidMount() {
    getSongsForPlaylistCreation().then((songs) => {
      this.setState({ listOfSongs: songs.rows._array });
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
          <CheckList
            style={styles.checkList}
            createPlaylist={this.createPlaylist.bind(this)}
            listOfSongs={this.state.listOfSongs}></CheckList>
        </View>
    </View>
    )
  }
}

function createPlaylistOnDB(songs, name) {
  return new Promise((resolve) => {
    insertNewPlaylistInDB(name).then(() => {
      getIDFromPlaylist(name).then((result) => {
        addPlaylistToSongs(songs, result.rows._array[0].ID).then(() => {
          resolve();
        })
      });
    });
  })
}

function addPlaylistToSongs(songs, id) {
  return new Promise((resolve) => {
    let promiseArray = [];
    const dataBase = Helper.database;
    songs.forEach((songName) => {
      promiseArray.push(
        dataBase.DB.transaction(tx => {
          tx.executeSql(`UPDATE Song SET Playlist_ID=${id} WHERE Name='${songName}'`, [], (tx, result) => {
          })
        })
      )
    });
    Promise.all(promiseArray).then(resolve());
  });
}

function getIDFromPlaylist(name) {
    return new Promise((resolve) => {
    const dataBase = Helper.database;
    dataBase.DB.transaction(tx => {
      tx.executeSql(`SELECT ID FROM Playlist WHERE Name='${name}';`, [], (tx, result) => {
        resolve(result);
      })
    });
  });
}

function insertNewPlaylistInDB(name) {
  return new Promise((resolve) => {
    const dataBase = Helper.database;
    dataBase.DB.transaction(tx => {
      tx.executeSql(`INSERT INTO Playlist (Name) values ('${name}');`, [], (tx, result) => {
        resolve();
      })
    });
  });
}

function buttonPressed(props) {
  console.log(props);
}

function getSongsForPlaylistCreation() {
  return new Promise((resolve) => {
    const dataBase = Helper.database;
    dataBase.DB.transaction(tx => {
      tx.executeSql(`SELECT * FROM Song WHERE Playlist_ID IS NULL`, [], (tx, result) => {
        console.log('CALLED IS NULL ');
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
    // width: 500,
    // height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlists: {
    flex: 2,
  },
  checkList: {
    flex:2
  }
});
