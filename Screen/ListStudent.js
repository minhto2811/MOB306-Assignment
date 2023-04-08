import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableHighlight, TextInput, Alert } from 'react-native';
import Dialog from "react-native-dialog";
import SelectDropdown from 'react-native-select-dropdown'



export default function ListStudent() {








    const url_st = "http://192.168.56.1:3000/Students/";
    const url_cl = "http://192.168.56.1:3000/Classes/";
    const navigation = useNavigation();
    const [dataE, setDataE] = useState([]);
    const [reload, setReload] = useState(true);
    const [show, setShow] = useState(false);
    const [visdel, setVisdel] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [idClass, setIDClass] = useState(null);
    const [Allclass, setAllClass] = useState([]);

    const [itemDel, setitemDel] = useState(null);



    const onSelectOption = (id) => {
        setIDClass(id);
    };


    const getData = () => {
        fetch(url_st)
            .then(response => response.json())
            .then(json => setDataE(json))
            .catch(error => console.log(error));
    }

    const getDataAllClass = () => {
        fetch(url_cl)
            .then(response => response.json())
            .then(json => setAllClass(json))
            .catch(error => console.log(error));
    }

    const addData = (dataToAdd) => {
        fetch(url_st, {
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
                console.log(error)
            });
    }

    const delData = () => {
        if(itemDel==null){
            return;
        }
        fetch(url_st + itemDel.id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.status == 200) {
                    setVisdel(false);
                    setReload(!reload);
                    Alert.alert("Thông báo Xóa thành công!");

                }


            })
            .catch(error => {
                console.error('There was a problem deleting the item:', error);
            });;
    }

    useEffect(() => {
        getData();
        getDataAllClass();
    }, [reload]);

    useFocusEffect(
        React.useCallback(getData, [])
    );


    return (
        <View style={styless.conteiner}>
            <View style={styless.headerView}>
                <View style={styless.imageback}
                    onTouchStart={() => { navigation.goBack() }}
                >
                    <Image source={require("../Image/back.png")} style={styless.ImageAdd} />
                </View>
                <Text style={styless.title}>Danh sách Sinh viên</Text>
                <View
                    style={styless.viewAdd}
                    onTouchStart={() => setShow(!show)}>
                    <Image source={require("../Image/add.png")} style={styless.ImageAdd} />
                </View>


                <Dialog.Container visible={show} statusBarTranslucent
                    onBackdropPress={() => setShow(false)}>
                    <Dialog.Title style={styless.titleDialog}>Thêm sinh viên mới</Dialog.Title>
                    <View style={styless.dialogViewtext}>
                        <TextInput style={styless.textInputDialog} placeholder='Nhập tên sinh viên' onChangeText={(name) => {
                            setName(name)
                        }} />
                        <TextInput style={styless.textInputDialog} placeholder='Nhập tên email' onChangeText={(email) => {
                            setEmail(email)
                        }} />
                        <SelectDropdown
                            selectedRowStyle={styless.selectedRowStyle}
                            searchInputTxtStyle={styless.textSearch}
                            dropdownStyle={styless.dropList}
                            buttonStyle={styless.dropdown}
                            searchInputStyle={styless.search}
                            search={true}
                            data={Allclass}
                            onSelect={(item) => onSelectOption(item.id)}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.name
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.name
                            }}
                            defaultButtonText="Chọn mã lớp"
                        />


                    </View>
                    <Dialog.Button label="Cancel" style={styless.DT} onPress={() => { setShow(false) }} />
                    <Dialog.Button label="Add" style={styless.DT} onPress={() => {
                        if (name.length > 0 && email.length > 0 && idClass > 0) {
                            const dataToAdd = {
                                name: name,
                                email: email,
                                idClass: parseInt(idClass),
                            };
                            addData(dataToAdd);



                        } else {
                            Alert.alert("Hãy kiểm tra các trường thông tin");
                        }
                    }} />
                </Dialog.Container>


                <Dialog.Container visible={visdel}>
                    <Dialog.Title>Xóa sinh viên</Dialog.Title>
                    <Dialog.Description>
                        Bạn muốn xóa sinh viên? Bạn không thể hoàn tác lại.
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={() => setVisdel(false)} />
                    <Dialog.Button label="Delete" onPress={() => delData()} />
                </Dialog.Container>
            </View>
            <Text style={styless.quantity}>Số lượng: {dataE.length}</Text>
            <FlatList
                data={dataE}
                renderItem={({ item }) => (
                    <View style={styless.viewItem}>
                        <TouchableHighlight
                            style={{ flex: 1 }}
                            underlayColor='#dee6ec'
                            onPress={() => navigation.navigate('infos', { data: { id: item.id, name: item.name, email: item.email, idClass: item.idClass, url: url_st } })}>
                            <Text style={styless.nameItem}>{item.name}</Text>
                        </TouchableHighlight>
                        <View
                            onTouchStart={() => {
                                setVisdel(true);
                                setitemDel(item)
                            }}>
                            <Image source={require('../Image/bin.png')} style={styless.bin} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styless = StyleSheet.create({
    conteiner: {
        flex: 1,
        marginTop: 45,
        alignSelf: 'stretch'
    },
    headerView: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderBottomWidth: 2,
        borderBottomColor: '#262626',
        justifyContent: 'center'
    },
    imageback: {
        justifyContent: 'center'
    },
    title: {
        flex: 1,
        fontSize: 28,
        padding: 10,
        fontWeight: 'bold',
    },
    ImageAdd: {
        height: 40,
        width: 40,

    },
    viewAdd: {
        alignSelf: 'center',
        marginHorizontal: 5,
    },
    FlatListClass: {
        flex: 1,
        backgroundColor: '#969b9f'
    },
    ItemFlatList: {
        backgroundColor: '#dee6ec',
        marginBottom: 2,
        flexDirection: 'row',
    },
    NameClass: {
        flex: 1,
        fontSize: 28,
        paddingVertical: 10,
        paddingLeft: 15
    },
    inforST: {
        flex: 1,
        flexDirection: 'column'
    },
    quantity: {
        fontSize: 20,
        backgroundColor: '#c1c1c0',
        paddingLeft: 10
    },
    viewItem: {
        backgroundColor: '#dee6ec',
        justifyContent: 'center',
        marginVertical: 2,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    nameItem: {
        fontSize: 28,
    },
    bin: {
        height: 40,
        width: 40,
    },
    titleDialog: {
        textAlign: 'center',
        fontSize: 25,
    },
    dialogViewtext: {

    }
    , textInputDialog: {
        borderWidth: 1,
        backgroundColor: '#ababab',
        borderColor: '#1e1e1e',
        marginBottom: 10,
        paddingLeft: 10,
        fontSize: 20,
        paddingVertical: 5,
        elevation: 100

    },
    DT: {
        fontSize: 20
    },
    dropdown: {
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'black',
        width: 300,
        height: 40,
        backgroundColor: '#aaaaaa'
    },
    search: {
        backgroundColor: 'red',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    dropList: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textSearch: {
        fontSize: 20
    },
    selectedRowStyle: {
        backgroundColor: '#cccccc',
    }
});
