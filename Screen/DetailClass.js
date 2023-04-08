import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import react, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TextInput, Button, Alert, FlatList, TouchableHighlight } from "react-native";
import Dialog from "react-native-dialog";

export default function InfoClass() {

    const navigation = useNavigation();
    const route = useRoute();
    const { data } = route.params;
    const url = data.url;
    const [show, setShow] = useState(false);
    const [name, setName] = useState(data.name);
    const [nameNew, setNameNew] = useState(data.name);
    const [dataT, setDataT] = useState([]);
    const url_st = "http://192.168.56.1:3000/Students?idClass=" + data.id;
    const url_st_del = "http://192.168.56.1:3000/Students/";
    const [first, setfirst] = useState(false);


    const getData = () => {
        fetch(url_st)
            .then(response => response.json())
            .then(json => setDataT(json))
            .catch(error => console.log(error));
    }

    const updateData = (newName) => {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setNameNew(name)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const delDataST = (item) => {
        fetch(url_st_del + item.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: item.name,
                email: item.email,
                idClass: null,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setfirst(!first);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(getData, [first]);

    useFocusEffect(
        React.useCallback(getData, [])
    );


    return (
        <View style={styless.container}>
            <View style={styless.header}>
                <Image source={require('../Image/meeting.png')} style={styless.avatar} />
                <View style={styless.titleView}>
                    <View style={styless.viewSetting}>
                        <Text style={styless.titleID}>Mã lớp: {data.id}</Text>
                        <View onTouchStart={() => { setShow(!show) }}>
                            <Image source={require('../Image/settings.png')} style={styless.setting} />
                        </View>
                    </View>

                    <Text style={styless.titleName}>Tên Lớp: {nameNew}</Text>
                </View>
            </View>
            <Text style={styless.quantity}>Số lượng:  {dataT.length}</Text>
            <FlatList
                data={dataT}
                renderItem={({ item }) => (
                    <View style={styless.itemFL}>
                        <View style={styless.viewName}>
                            <TouchableHighlight
                                underlayColor={'#dee6ec'}
                                onPress={() => {
                                    navigation.navigate('infos', { data: { id: item.id, name: item.name, email: item.email, idClass: item.idClass, url: url_st_del } })
                                }
                                }>
                                <Text style={styless.nameSt}>{item.name}</Text>
                            </TouchableHighlight>
                        </View>
                        <View onTouchStart={() => {
                            delDataST(item);
                            setfirst(!first);
                        }}>
                            <Image source={require('../Image/bin.png')} style={styless.imgDel} />
                        </View>

                    </View>
                )}
            />


            {/* Dialog */}

            <Dialog.Container visible={show} statusBarTranslucent
                onBackdropPress={() => setShow(false)}>
                <Dialog.Title style={styless.titleCN}>Sửa thông tin lớp học</Dialog.Title>
                <TextInput style={styless.textin} placeholder='Nhập tên lớp học' onChangeText={(name) => {
                    setName(name)
                }}
                value={name} />
                <Dialog.Button label="Cancel" style={styless.DT} onPress={() => { setShow(false) }} />
                <Dialog.Button label="Update" style={styless.DT} onPress={() => {
                    if (name.length > 0) {
                        updateData(name);
                        setShow(false)
                    } else {
                        Alert.alert("Hãy kiểm tra các trường thông tin");
                    }
                }} />
            </Dialog.Container>
        </View>
    );
}

const styless = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 45,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    avatar: {
        width: 130,
        height: 130,
        marginHorizontal: 10
    },
    titleView: {

        flex: 1,
        justifyContent: 'space-evenly'
    },
    titleID: {
        fontSize: 22,
        color: 'blue',
        flex: 1
    },
    titleName: {
        fontSize: 25,
        color: 'red',
        fontWeight: 'bold'
    },
    quantity: {
        fontSize: 18,
        marginLeft: 20,
    },
    setting: {
        width: 35,
        height: 35,
        marginHorizontal: 10
    },
    viewSetting: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleCN: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
        textAlign: 'center'
    },
    textin: {
        fontSize: 22,
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 10,
        marginTop: 15,
        paddingVertical: 5
    },
    itemFL: {
        backgroundColor: '#dee6ec',
        marginTop: 2,
        flexDirection: 'row',
        paddingVertical: 3
    },
    imgDel: {
        height: 40,
        width: 40,
        marginRight: 10
    },
    nameSt: {
        fontSize: 20,
        marginLeft: 10,
    },
    viewName: {
        flex: 1,
        justifyContent: 'center'
    }


})