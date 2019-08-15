import React, { Component } from 'react';
import { View, FlatList, Button, TextInput, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements'

export class CheckList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenItems: [],
            playlistName: null
        };
    }
    createNewPlaylistHandler() {
        this.props.createPlaylist(this.state.chosenItems, this.state.playlistName);
    }
    
    itemChosen(item) {
        if (this.state.chosenItems.indexOf(item.Name) === -1) {
            this.state.chosenItems.push(item.Name)
        } else {
            // remove element from the array
        }
    }

    render() {
        return (
            <View style={{flex: 1, height: 800 }} >
                <View>
                <TextInput
                    style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(playlistName) => this.setState({playlistName})}
                    value={this.state.playlistName}
                />
            </View>
                <FlatList
                    data={this.props.listOfSongs}
                    renderItem={({ item }) => (
                        <ListItem
                            onPress={(() => { this.itemChosen(item); })}
                            title={item.Name}/>
                        )}
                    keyExtractor={item => item.Name}
                />
                <Button title="Create new playlist" onPress={(() => {
                    this.createNewPlaylistHandler()
                })}/>
            </View>
        )
    }
}

export default CheckList;
