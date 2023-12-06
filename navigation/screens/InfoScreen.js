import * as React from 'react';
import {View, Text, Image} from 'react-native';

export default function InfoScreen({navigation}) {
    return (
        <View>
            <Image source={require('../../assets/photo.png')} style={{width:undefined, height:400}} resizeMode="contain"/>
            <Text style={{color: "black", fontSize: 18}}>Лабораторну роботу розробив студент групи ТТП-42 Посмітний Микита. Дякую за увагу!</Text>
        </View>
    )
}
