import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, Alert, TouchableHighlight } from 'react-native';
import Dialog from "react-native-dialog";
import { TextInput } from 'react-native-gesture-handler';


const url = "http://192.168.56.1:3000/Classes/";

export default function ListClass() {




    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [dataE, setDataE] = useState([]);
    const [reload, setReload] = useState(true);
    const navigation = useNavigation();




    const getData = () => {
        fetch(url)
            .then(response => response.json())
            .then(json => setDataE(json))
            .catch(error => console.log(error));
    }




    const addData = (dataToAdd) => {
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToAdd),
        })
            .then(response => {
                response.json();

            }

            )
            .then(json => {
                console.log(json);
                Alert.alert("Thêm thành công");
                setReload(!reload);
                setShow(false);
            })
            .catch(error => {
                console.log(error),
                    Alert.alert("Mã lớp đã tồn tại!");
            });
    }

    const delData = (key) => {
        fetch(url + key, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.status == 200) {
                    Alert.alert("Thông báo", "Xóa lớp thành công!");
                    setReload(!reload);
                }


            });
    }





    useEffect(getData, [reload]);

    useFocusEffect(
        React.useCallback(
        getData, [])
      );

    return (
        <View style={styless.conteiner}>
            <View style={styless.headerView}>
                <View style={styless.imageback}
                    onTouchStart={() => { navigation.goBack() }}
                >
                    <Image source={require("../Image/back.png")} style={styless.ImageAdd} />
                </View>
                <Text style={styless.title}>Danh sách lớp học</Text>
                <View style={styless.imageback}
                    onTouchStart={() => {
                        setShow(true)
                    }}>
                    <Image source={require("../Image/add.png")} style={styless.ImageAdd} />
                </View>

                {/* thêm lớp học */}
                <Dialog.Container visible={show} statusBarTranslucent
                    onBackdropPress={() => setShow(false)}>
                    <Dialog.Title style={styless.titleDialog}>Thêm lớp học mới</Dialog.Title>
                    <View style={styless.dialogViewtext}>              
                        <TextInput style={styless.textInputDialog} placeholder='Nhập tên lớp học' onChangeText={(name) => {
                            setName(name)
                        }} />
                    </View>
                    <Dialog.Button label="Cancel" style={styless.DT} onPress={() => { setShow(false) }} />
                    <Dialog.Button label="Add" style={styless.DT} onPress={() => {
                        if (name.length > 0) {
                            const dataToAdd = {
                                name: name,
                            };
                            addData(dataToAdd);
                          


                        } else {
                            Alert.alert("Hãy kiểm tra các trường thông tin");
                        }
                    }} />
                </Dialog.Container>
            </View>
            <View>
                <Text style={styless.quantity}>Số lượng: {dataE.length}</Text>
            </View>

            <FlatList
                style={styless.FlatListClass}
                data={dataE}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styless.ItemFlatList}>
                        <View
                            style={styless.viewOnclick}>
                            <TouchableHighlight 
                            underlayColor={'#dee6ec'}
                            onPress={() => { navigation.navigate('infoc', { data: { id: item.id, name: item.name, url: url + item.id } }) }}>
                                <Text style={styless.NameClass}>{item.name}</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styless.viewBin} onTouchStart={
                            () => {
                                delData(item.id);
                               
                            }
                        }>
                            <Image source={require('../Image/bin.png')} style={styless.ImageAdd} />
                        </View>
                    </View>
                )
                }
            />
        </View >
    );
};


const styless = StyleSheet.create({
    conteiner: {
        flex: 1,
        marginTop: 45,
        alignSelf: 'stretch',
        flexDirection: 'column'
    },
    headerView: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderBottomWidth: 2,
        borderBottomColor: '#262626',
        justifyContent: 'center',
        paddingVertical: 5
    },
    imageback: {
        justifyContent: 'center',
    },
    title: {
        flex: 1,
        fontSize: 28,
        fontWeight: 'bold',
    },
    viewBin: {
        alignSelf: 'center',
        marginHorizontal: 10,
    },
    ImageAdd: {
        height: 40,
        width: 40,
        marginRight: 10
    },
    ItemFlatList: {
        backgroundColor: '#dee6ec',
        marginTop: 2,
        flexDirection: 'row',
    },
    NameClass: {
        fontSize: 28,
        paddingVertical: 10,
        paddingLeft: 15,
    },

    viewOnclick: {
        flex: 1
    },
    textInputDialog: {
        borderWidth: 1,
        backgroundColor: '#ababab',
        borderColor: '#1e1e1e',
        marginBottom: 10,
        paddingLeft: 10,
        fontSize: 20,
        paddingVertical: 5,
        elevation: 100

    },
    titleDialog: {
        textAlign: 'center',
        fontSize: 25,
    },
    DT: {
        fontSize: 20
    },
    quantity: {
        fontSize: 20,
        backgroundColor: '#c1c1c0',
        paddingLeft: 10
    }
});
