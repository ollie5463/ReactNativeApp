import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ListItem, SearchBar, ButtonGroup, Button } from 'react-native-elements';
import {
  Text,
  FlatList,
  View,
} from 'react-native';
import _ from 'lodash';
import Helper from '../Helper';
import Sounds from '../components/Sounds';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fullData: [],
      search: '',
      selectedIndex: 1
    };
    this.updateIndex = this.updateIndex.bind(this)
  }

  componentDidMount() {
    getSongs().then((songs) => {
      const data = songs.rows._array;
      this.setState({ data });
      this.setState({ fullData: data });
      }
    );
  }

  updateIndex(selectedIndex) {
    if (selectedIndex === 1) {
        getSongs().then((songs) => {
          const data = songs.rows._array;
          this.setState({ data });
          this.setState({ fullData: data });
          }
        );
    } else {
      getAlbums().then((albums) => {
      const data = albums.rows._array;
        this.setState({ data });
        this.setState({ fullData: data });
        }
      );
    }
    this.setState({selectedIndex})
  }

  shuffleSong = () => {
    const randomSongIndex = Math.round(Math.random() * this.state.fullData.length);
    const randomSong = this.state.fullData[randomSongIndex].Name;
    Sounds.sounds[randomSong].playAsync();
  }

  handleSearch = search => {
    const formattedQuery = search.toLowerCase();
    const data = _.filter(this.state.fullData, user => {
      return contains(user, formattedQuery);
    });
    this.setState({ search, data });
  }


  render() {
      return (
        <View>
          <SearchBar placeholder="Type here..."
              lightTheme round
              onChangeText={this.handleSearch}
              value={this.state.search}
            />
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                title={item.Name}/>
            )}
            keyExtractor={item => item.Name}
          />
          <View>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={this.state.selectedIndex}
              buttons={['By Albums', 'By Songs']}
            />
          </View>
            <View style={{ paddingLeft: 150, alignContent: "center"}}>
            <Ionicons name="ios-shuffle" size={100} onPress={this.shuffleSong}/>
            </View>
        </View>
      );
  }
}

SearchScreen.navigationOptions = {
  title: 'Search screen',
};

function contains({ Name }, query) {
  if (Name.includes(query)) {
    return true;
  }
  return false;
}

function getAlbums() {
  return new Promise((resolve) => {
    const dataBase = Helper.database;
    dataBase.DB.transaction(tx => {
        tx.executeSql(`SELECT * FROM Album`, [], (tx, result) => {
          resolve(result);
        })
    });
  })
}

function getSongs() {
  return new Promise((resolve) => {
    const dataBase = Helper.database;
    dataBase.DB.transaction(tx => {
        tx.executeSql(`SELECT * FROM Song`, [], (tx, result) => {
          resolve(result);
        })
    });
  })
}
