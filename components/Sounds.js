import { Audio } from 'expo-av';
import React, { Component } from 'react';

export class Sounds extends Component{

    static async initSounds() {
        this.sounds = {};
        this.sounds.background_music = new Audio.Sound();
        this.sounds.classical_music_1 = new Audio.Sound();
        this.sounds.classical_music_2 = new Audio.Sound();
        try {
            await this.sounds.background_music.loadAsync(require('../assets/sounds/background_music.mp3'),{ shouldPlay: false },true);
            await this.sounds.classical_music_1.loadAsync(require('../assets/sounds/classical_music_1.mp3'), { shouldPlay: false },true);
            await this.sounds.classical_music_2.loadAsync(require('../assets/sounds/classical_music_2.mp3'),{ shouldPlay: false },true);
        } catch (error) {
            console.log(error);
        }
    }
}

export default Sounds;