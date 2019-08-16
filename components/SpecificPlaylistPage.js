import React, { Component } from 'react';
import { View, FlatList, TextInput, Button } from 'react-native';
import { ListItem, Header } from 'react-native-elements'
import { Helper } from '../Helper';
import { Sounds } from './Sounds';
import { Ionicons } from '@expo/vector-icons';

export class SpecificPlaylistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfSongs: [],
            playListName: null,
            currentSong: null
        };
    }

    componentDidMount() {
        getPlaylistUsingID(this.props.playListName).then((result) => {
            const playListID = result.rows._array[0].ID;
            getSongsForPlaylist(playListID).then((listOfSongs) => {
                this.setState({ listOfSongs: listOfSongs.rows._array })
            })
        })
        this.setState({ playListName: this.props.playListName });
    }

    stopCurrentSong = song => {
        if (song) {
        Sounds.sounds[song].stopAsync();
        }
    }

    playSong = song => {
        this.stopCurrentSong(this.state.currentSong);
        this.setState({ currentSong: song });
        Sounds.sounds[song].playAsync();
    }
    shuffleSong = () => {
        this.stopCurrentSong(this.state.currentSong);
        const randomSongIndex = Math.floor(Math.random() * this.state.listOfSongs.length);
        const randomSong = this.state.listOfSongs[randomSongIndex].Name;
        this.setState({ currentSong: randomSong })
        Sounds.sounds[randomSong].playAsync();
  }

    render() {
        return (
            <View style={{justifyContent: 'center'}}>
                <Header
                    backgroundColor="#ffffff"
                    centerComponent={{
                        backgroundColor: '#ffffff',
                        text: this.state.playListName,
                        style: { color: '#000000', fontSize: 30, paddingBottom: 100 }
                    }}
                />
                <FlatList
                    data={this.state.listOfSongs}
                    renderItem={({ item }) => (
                        <ListItem
                        leftIcon={<Ionicons size={20} name="ios-play"/>}
                        onPress={() => { this.playSong(item.Name) }}
                        title={item.Name}/>
                    )}
                    keyExtractor={item => item.Name}
                />
                <Ionicons name="ios-shuffle" style={{ paddingLeft: 150 }} size={100} onPress={this.shuffleSong}/>
            </View>
        )
    }
}


function getPlaylistUsingID(name) {
    return new Promise((resolve) => {
        const dataBase = Helper.database;
        dataBase.DB.transaction(tx => {
        tx.executeSql(`SELECT ID FROM Playlist WHERE Name='${name}';`, [], (tx, result) => {
            resolve(result);
        })
        });
    });
}   

function getSongsForPlaylist(id) {
    return new Promise((resolve) => {
    const dataBase = Helper.database;
    dataBase.DB.transaction(tx => {
      tx.executeSql(`SELECT * FROM Song WHERE Playlist_ID=${id}`, [], (tx, result) => {
          resolve(result);
        })
    });
  });
}

export default SpecificPlaylistPage;
