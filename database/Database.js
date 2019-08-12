import { SQLite } from 'expo-sqlite';

export class Database {
    constructor() {
        this.DB = SQLite.openDatabase('myDB', 1);
        this.createDB();
    }

    createDB() {
        
        // Drop tables
        this.DB.transaction(tx => {
            tx.executeSql('DROP TABLE Playlist')
        });
        this.DB.transaction(tx => {
            tx.executeSql('DROP TABLE Album')
        });

        // Create tables
        this.DB.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE Album (
                            ID integer,
                            Name varchar(255)
                        );`)
                    });
        this.DB.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE Playlist (
                    ID integer,
                    Name varchar(255)
                );`)
            });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Album (Name) values ('album1');`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Playlist (Name) values ('ollies playlist');`)
        });
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
    }
}

export default Database;