import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Helper from '../Helper';
import { ListItem } from 'react-native-elements'
import { CheckList } from '../components/Checklist';

export default class PlaylistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      listOfSongs: []
    };
  }

  updateScreen = () => {
    getSongsForPlaylistCreation().then((songs) => {
        this.setState({ listOfSongs: songs.rows._array });
      });
      getPlaylistsForScreen().then((playlists) => {
      this.setState({ playlists: playlists.rows._array})
    });
  }

  createPlaylist = (playlist, name) => {
    createPlaylistOnDB(playlist, name).then(() => {
      this.updateScreen();
      }
    );
  }
  updateListOfSongs = song => {
    const listOfSongs = this.state.listOfSongs;
    const index = listOfSongs.indexOf(song);
    if (index !== -1) {
      listOfSongs.splice(index, 1);
        this.setState({ listOfSongs  });
    }
  }

  componentDidMount() {
    this.updateScreen();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 3, alignItems: "stretch", width: 300, height: 300, paddingBottom: 50 }}>
          <Text style={{ flex: 1, fontSize: 25, textAlign: 'center', paddingTop: 10 }} >This is a list of all current playlists</Text>
          <FlatList
              style={styles.flatList}
              data={this.state.playlists}
              renderItem={({ item }) => (
                  <ListItem
                      title={item.Name}
                      containerStyle={styles.listItem}/>
                  )}
              keyExtractor={item => item.Name}
          />
        </View>
        <View style={styles.playlists}>
          <CheckList
            style={styles.checkList}
            createPlaylist={this.createPlaylist}
            updateListOfSongs={this.updateListOfSongs}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlists: {
    flex: 3,
    width: 300
  },
  checkList: {
    flex: 3
  },
  listItem: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#D3D3D3"
  },
  flatList: {
    borderRadius: 5,
    paddingBottom: 50,
    height: 300,
    flex: 2,
    backgroundColor: "#D3D3D3"
  }
});
