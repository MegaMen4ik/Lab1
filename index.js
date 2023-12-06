/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

/*
const initTransactions = [
                  {
                      'id': 0,
                      'value': 'hello'
                  },
                  {
                      'id': 1,
                      'value': 'test'
                  },

              ];
const db = getDBConnection();
createTable(db);
const storedTransactions = getTransactions(db);
saveTransactions(db, initTransactions);

alert(JSON.stringify(getTransactions()),1);

let test = new Transaction('hello', 100, 1);*/

//db.getTransactions();
AppRegistry.registerComponent(appName, () => App);
