import { SQLite } from 'expo-sqlite';

export class Database {
    constructor() {
        this.DB = SQLite.openDatabase('myDB', 1);
        this.resetTables();
        this.createDBTables();
        this.createDBEntries();
        // this.printTables();
    }

    executeSql(sqlStatement) {
        this.DB.transaction(tx => {
            tx.executeSql(sqlStatement)
        });
    }

    createDBEntries() {
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Album (Name) values ('album1');`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Playlist (Name) values ('ollies playlist');`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Song (Name) values ('song1');`)
        });
    }

    resetTables() {// Drop tables
        this.DB.transaction(tx => {
            tx.executeSql('DROP TABLE Playlist')
        });
        this.DB.transaction(tx => {
            tx.executeSql('DROP TABLE Album')
        });
        this.DB.transaction(tx => {
            tx.executeSql('DROP TABLE Song')
        });
    }

    createDBTables() {    
        this.DB.transaction(tx => { // Album
            tx.executeSql(
                `CREATE TABLE Album (
                    ID INTEGER PRIMARY KEY,
                    Name varchar(255) 
                    );`)
                });
        this.DB.transaction(tx => { // Playlist
            tx.executeSql(
                `CREATE TABLE Playlist (
                    ID INTEGER PRIMARY KEY,
                    Name varchar(255)
                );`)
        });
        this.DB.transaction(tx => { // Song
            tx.executeSql(
                `CREATE TABLE Song (
                    ID INTEGER,
                    Name varchar(255),
                    Album_ID INTEGER,
                    Playlist_ID INTEGER,
                    FOREIGN KEY(Album_ID) REFERENCES Album(ID),
                    FOREIGN KEY(Playlist_ID) REFERENCES Playlist(ID)
                );`)
        });
    }

    printTables() {
        this.DB.transaction(tx => {
            tx.executeSql(`SELECT * FROM Album`, [], (tx, result) => {
                console.log('Albumsss >>>>>', result)
            })
        });
        this.DB.transaction(tx => {
            tx.executeSql(`SELECT * FROM Playlist`, [], (tx, result) => {
                console.log('Playlistt >>>>>', result)
            })
        });
        this.DB.transaction(tx => {
            tx.executeSql(`SELECT * FROM Song`, [], (tx, result) => {
                console.log('Songss >>>>>', result)
            })
        });
    }
}

export default Database;