import { useRoute } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default class HomScreen extends Component {
    render() {
        const { route } = this.props;
        const { nameUser } = route.params;
        const { navigation } = this.props;
        return (
            <ScrollView>
                <View style={styless.container}>
                    <View style={styless.header}>
                        <Text style={styless.account}> {nameUser}</Text>
                        <View style={styless.logout}
                            onTouchStart={() => { navigation.goBack() }}
                        >
                            <Image style={styless.exitimage} source={require('../Image/log-out.png')} />
                        </View>
                    </View>


                    <Text style={styless.title}>Trang chủ</Text>
                    <TouchableHighlight
                        style={styless.box}
                        onPress={() => { navigation.navigate('listclass') }}
                        underlayColor={'gray'}
                    >
                        <View >
                            <Image style={styless.image} source={require('../Image/classroom.png')} />
                            <Text style={styless.textshow}>Quản lí Lớp học</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styless.box}
                        onPress={() => { navigation.navigate('liststudent') }}
                        underlayColor={'gray'}>
                        <View >
                            <Image style={styless.image} source={require('../Image/graduated.png')} />
                            <Text style={styless.textshow}>Quản lí Sinh viên</Text>
                        </View>
                    </TouchableHighlight>
                    <Text style={styless.version}>Phiên bản: v1.0.1</Text>
                </View>
            </ScrollView>
        );
    }
};

const styless = StyleSheet.create({
    container: {
        marginTop: 45,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fffffff',
        alignSelf: 'stretch'
    },
    logout: {
        marginRight: 15,
    },
    exitimage: {
        width: 40,
        height: 40,
    },
    title: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 30,
        marginVertical: 15,
    },
    box: {
        width: 240,
        height: 240,
        backgroundColor: '#2cb654',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#171717',
        shadowOffset: { width: - 2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 50,
        marginBottom: 45,
    },
    image: {
        width: 190,
        height: 190,
    },
    textshow: {
        textAlign: 'center',
        textShadowColor: '#fbc013',
        color: '#ffffff',
        fontSize: 20,
    },
    version: {
        marginTop: 35
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    account: {
        flex: 1,
        fontSize: 25,
        marginLeft: 15,
    }
});
