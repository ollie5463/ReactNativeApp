import React, { Component } from 'react';
import {
  Text,
  FlatList,
  View,
} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import Helper from '../Helper';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    getSongs().then((songs) => {
      const data = songs.rows._array;
      console.log(data);
      this.setState({ data });
      }
    );
  }

  renderHeader = () => {
    return <SearchBar key="Search bar" placeholder="Type here"/>
  }
  render() {
    if (this.state.data.length !== 0) {
      console.log('length is greater than 0');
      return (
        <View>
          <FlatList
            // data={[
            //   { name: 'song 1' },
            //   { name: 'song 2' }]}
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                title={item.Name}/>
            )}
            keyExtractor={item => item.Name}
            ListHeaderComponent={this.renderHeader}
          />
        </View>
      );
    } else {
      return ( <View></View>)
    }
  }
}

SearchScreen.navigationOptions = {
  title: 'Search screen',
};

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
