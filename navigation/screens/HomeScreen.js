import React, {useEffect, useState} from "react";
import {View, Text, Button, TextInput, FlatList} from "react-native";
import {openDatabase} from "react-native-sqlite-storage";

const db = openDatabase({
    name: "profit"
});

export default function HomeScreen({navigation}) {
    const [title,setTitle] = useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [profit,setProfit] = useState("");

    const [transactions, setTransactions] = useState([]);
    const createTables = () => {
        db.transaction(txn => {
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(20), price REAL DEFAULT 0, quantity INTEGER DEFAULT 0, profit_per_month REAL DEFAULT 0)`,
                [],
                (sqlTxn, res) => {
                    console.log("table created successfully")
                },
                error => {
                    console.log("error on creating table " + error.message)
                }
            )
        })
    }

    const addTransaction = () => {
        if (!title) {
            alert('Enter title');
            return false;
        }
        if (!price) {
            alert('Enter price');
            return false;
        }
        if (!quantity) {
            alert('Enter quantity');
            return false;
        }
        if (!profit) {
            alert('Enter profit');
            return false;
        }
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO transactions (title, price, quantity, profit_per_month) VALUES (?, ?, ?, ?)`,
                [title, price, quantity, profit],
                (sqlTxn) => {
                    console.log("Transaction added successfully")
                    getTransactions();
                },
                error => {
                    console.log("error on adding transaction " + error.message)
                }
            )
        })
    }

    const getTransactions = () => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * from transactions ORDER BY id ASC`,
                [],
                (sqlTxn, res) => {
                    console.log('successfully got')
                    let len = res.rows.length
                    if(len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i)
                            results.push({
                                id: item.id,
                                title: item.title,
                                price: item.price,
                                quantity: item.quantity,
                                profit: item.profit_per_month,
                                payable: item.quantity*item.profit_per_month,
                                payback: item.price/item.profit_per_month
                            })
                        }
                        setTransactions(results)
                    }
                },
                error => {
                    console.log(error.message)
                }
            )
        })
    }

    const renderTransaction = ({item, index}) => {
        return (
            (index%2 === 0) ?
                <View style={{display: "flex", flexDirection: "row", backgroundColor: "lightgray"}}>
                    <Text style={{flex: 2}}>
                        {item.title}
                    </Text>
                    <Text style={{flex: 1}}>
                        {item.price}
                    </Text>
                    <Text style={{flex: 1}}>
                        {item.quantity}
                    </Text>
                    <Text style={{flex: 2}}>
                        {item.payable}
                    </Text>
                    <Text style={{flex: 2}}>
                        {item.profit}
                    </Text>
                    <Text style={{flex: 2}}>
                        {item.payback}

                    </Text>
                </View>
                :             <View style={{display: "flex", flexDirection: "row"}}>
                    <Text style={{flex: 2}}>
                        {item.title}
                    </Text>
                    <Text style={{flex: 1}}>
                        {item.price}
                    </Text>
                    <Text style={{flex: 1}}>
                        {item.quantity}
                    </Text>
                    <Text style={{flex: 2}}>
                        {item.payable}
                    </Text>
                    <Text style={{flex: 2}}>
                        {item.profit}
                    </Text>
                    <Text style={{flex: 2}}>
                        {item.payback}
                    </Text>
                </View>

        )
    }

    useEffect(async () => {
        createTables();
        getTransactions();
    }, []);

    return (
        <View>
            <Text>
                App
            </Text>
            <TextInput
                placeholder="Enter name"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                placeholder="Enter price"
                value={price}
                onChangeText={setPrice}
            />
            <TextInput
                placeholder="Enter quantity"
                value={quantity}
                onChangeText={setQuantity}
            />
            <TextInput
                placeholder="Enter profit per month"
                value={profit}
                onChangeText={setProfit}
            />
            <Button title="submit" onPress={addTransaction}/>

            <View style={{padding: 10}}>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <Text style={{flex: 2}}>
                        Name
                    </Text>
                    <Text style={{flex: 1}}>
                        Price
                    </Text>
                    <Text style={{flex: 1}}>
                        Count
                    </Text>
                    <Text style={{flex: 2}}>
                        Total profit
                    </Text>
                    <Text style={{flex: 2}}>
                        Profit/month
                    </Text>
                    <Text style={{flex: 2}}>
                        Payback period
                    </Text>
                </View>
                <FlatList data={transactions} renderItem={renderTransaction} />
            </View>
            <View style={{marginTop: 10, padding: 10}}>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <Text style={{flex: 1}}>Total Price</Text>
                    <Text style={{flex: 1}}>Total Profit</Text>
                    <Text style={{flex: 1}}>Profit Per One</Text>
                    <Text style={{flex: 1}}>Total Payback</Text>
                </View>
                <View style={{display: "flex", flexDirection: "row", backgroundColor: "lightgray"}}>
                    <Text style={{flex: 1}}>
                        {transactions.reduce((a,v) => a=a+v.price, 0)}
                    </Text>
                    <Text style={{flex: 1}}>
                        {transactions.reduce((a,v) => a=a+v.payable, 0)}
                    </Text>
                    <Text style={{flex: 1}}>
                        {transactions.reduce((a,v) => a=a+v.profit, 0)}
                    </Text>
                    <Text style={{flex: 1}}>
                        {transactions.reduce((a,v) => a=a+v.payback, 0)}
                    </Text>
                </View>
            </View>
        </View>
    );
}
