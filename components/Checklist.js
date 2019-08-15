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
            <View style={{flex: 1, justifyContent: 'center' }} >
                <TextInput
                    style={{ fontSize: 20, height: 40, width: 250, borderColor: "#D3D3D3", borderWidth: 1}}
                    onChangeText={(playlistName) => this.setState({ playlistName })}
                    placeholder="Enter new playlist name"    
                    value={this.state.playlistName}
                />
                <View>
            </View>
                <FlatList
                    style={{ flex: 2, backgroundColor:"#D3D3D3" }}
                    data={this.props.listOfSongs}
                    renderItem={({ item }) => (
                        <ListItem
                            onPress={(() => { this.itemChosen(item); })}
                            title={item.Name}
                            containerStyle={{ borderWidth: 1, borderColor: "#D3D3D3" }}
                        />
                        
                        )}
                    keyExtractor={item => item.Name}
                />
                <Button style={{ flex: 1 }} title="Create new playlist" onPress={(() => {
                    this.createNewPlaylistHandler()
                })}/>
            </View>
        )
    }
}

export default CheckList;
