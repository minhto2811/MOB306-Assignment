import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TextInput, Alert } from "react-native";
import Dialog from "react-native-dialog";
import SelectDropdown from 'react-native-select-dropdown'

export default function DetailStudent() {
    const route = useRoute();
    const { data } = route.params;
    const navigation = useNavigation();
    const url = data.url;
    const id = data.id;
    const [name, setName] = useState(data.name);
    const [email, setEmail] = useState(data.email);
    const [idClass, setIDClass] = useState(data.idClass);
    const [name1, setName1] = useState(data.name);
    const [email1, setEmail1] = useState(data.email);
    const [idClass1, setIDClass1] = useState(data.idClass);
    const [show, setShow] = useState(false);
    const url_cl = "http://192.168.56.1:3000/Classes/";
    const [Allclass, setAllClass] = useState([]);
    const [classfind, setclassfind] = useState("")
    // const index = Allclass.indexOf('world');



    const onSelectOption = (id) => {
        setIDClass1(id);
        console.log(id + "id");
    };

    const getDataAllClass = () => {
        fetch(url_cl)
            .then(response => response.json())
            .then(json =>
                setAllClass(json),
            )
            .catch(error => console.log(error));
    }

    const updateData = (namenew, emailnew, idclassnew) => {
        fetch(url + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: namenew,
                email: emailnew,
                idClass: parseInt(idclassnew),
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setName(namenew);
                setEmail(emailnew);
                setIDClass(idclassnew);
                setShow(false);
                setEmail1(emailnew);
                setName1(namenew);
                setIDClass1(idclassnew);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getDataAllClass();
    }, []);

    return (
        <View style={styless.container}>
            <View style={styless.header}>
                <Image source={require('../Image/student.png')} style={styless.avatar} />
                <View style={styless.viewInfo}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styless.idSt}>ID: {id}</Text>
                        <View onTouchStart={() => setShow(!show)}>
                            <Image source={require('../Image/settings.png')} style={{ width: 30, height: 30 }} />
                        </View>
                    </View>

                    <Text style={styless.idSt}>Họ Tên: {name}</Text>
                    <Text style={styless.idSt}>Email: {email}</Text>
                    <Text style={styless.idSt}> Mã Lớp: {idClass}</Text>
                </View>

            </View>

            <Dialog.Container visible={show} statusBarTranslucent
                onBackdropPress={() => setShow(false)}>
                <Dialog.Title style={styless.titleDialog}>Thay đổi thông tin</Dialog.Title>
                <View style={styless.dialogViewtext}>
                    <TextInput style={styless.textInputDialog} placeholder='Nhập tên sinh viên' onChangeText={(name) => {
                        setName1(name)
                        
                    }} 
                        defaultValue={name1}
                    />

                    <TextInput style={styless.textInputDialog} placeholder='Nhập tên email' onChangeText={(email) => {
                        setEmail1(email)
                    }} 
                        defaultValue={email1}
                    />
                    <SelectDropdown
                        defaultValue="Chọn lớp học"
                        defaultValueByIndex={Allclass.findIndex(user => user.id === idClass)}
                        searchInputTxtStyle={styless.textSearch}
                        dropdownStyle={styless.dropList}
                        buttonStyle={styless.dropdown}
                        searchInputStyle={styless.search}
                        search={true}
                        data={Allclass}
                        onSelect={(item) => onSelectOption(item.id)}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            console.log(selectedItem.id);
                            return selectedItem.name
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.name
                        }}
                        defaultButtonText={() => {
                            if (Allclass.some(c => c.id === idClass)) {
                                return "aa"
                            } else {
                                return "Chọn lớp học"
                            }
                        }}


                    />
                </View>
                <Dialog.Button label="Cancel" style={styless.DT} onPress={() => { setShow(false) }} />
                <Dialog.Button label="Add" style={styless.DT} onPress={() => {
                    console.log(name1);
                    console.log(email1);
                    console.log(idClass1);
                    if (name1.length > 0 && email1.length > 0 && idClass1 > 0) {
                        updateData(name1, email1, idClass1);
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
        marginTop: 45
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    avatar: {
        width: 110,
        height: 110,
        marginHorizontal: 10,
    },
    viewInfo: {
        flex: 1,
        marginRight: 10,
        flexDirection: 'column',
        justifyContent: 'space-around'

    },
    idSt: {
        flex: 1,
        fontSize: 18
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
    }
})