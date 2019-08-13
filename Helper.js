import Database from './components/Database';

let database;
export class Helper {
    static init() {
        database = new Database();
    }

    static get database() {
        return database;
    }
}

export default Helper;
