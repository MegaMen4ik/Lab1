import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage' ;

const tableName = 'transactions';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'profit.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getTransactions = async (db: SQLiteDatabase): Promise<Transaction[]> => {
  try {
    const transactions: Transaction[] = [];
    const results = await db.executeSql(`SELECT rowid as id,value FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        transactions.push(result.rows.item(index))
      }
    });
    return transactions;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveTransactions = async (db: SQLiteDatabase, transactions: Transaction[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    transactions.map(i => `(${i.id}, '${i.value}')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteTransaction = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};