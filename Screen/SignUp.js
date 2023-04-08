import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";

export default class SignUpScreen extends Component {
  state = {
    username: "",
    password: "",
    nameUser: "",
    isShowEyes: true,
  };

   addData = (dataToAdd) => {
    fetch("http://192.168.56.1:3000/Accounts/", {
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
            Alert.alert("Tạo tài khoản thành công");
        })
        .catch(error => {
            console.log(error)
        });
}



  render() {
    const { navigation } = this.props;

    return (

      <ScrollView
        style={{ flex: 1, backgroundColor: "#e74133", alignSelf: "stretch", marginTop: 45, }}
      >
        <View
          style={{
            flex: 1,
            padding: 20,
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <View onTouchStart={() => {
            navigation.goBack()
          }}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../Image/arrow.png")}
            />
          </View>


          <Text style={{ fontSize: 30, color: "white", fontWeight: "bold", marginTop: 15 }}>
            Đăng kí tài khoản
          </Text>
        </View>
        <View
          style={{
            flex: 3.5,
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            padding: 25,
            paddingTop: 25,
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "#022252" }}>
            Chào mừng thành viên mới
          </Text>
          <Text style={{ fontSize: 18, color: "#cdcdcd", marginTop: 10 }}>
            Nếu chưa có tài khoản đăng kí tại đây
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "#d0d5dc",
              marginTop: 20,
              fontWeight: "bold",
            }}
          >
            Thông tin tài khoản
          </Text>
          <TextInput
            style={{
              marginTop: 15,
              marginBottom: 25,
              borderRadius: 25,
              color: "#243f68",
              fontSize: 18,
              fontWeight: "6000",
              backgroundColor: "#bfc6cf",
              padding: 10,
              paddingLeft: 20,
            }}
            placeholder="Nhập tài khoản"
            onChangeText={(content) => {
              this.setState({ username: content });
            }}
          ></TextInput>
          <Text style={{ fontSize: 18, color: "#d0d5dc", fontWeight: "bold" }}>
            Thông tin bảo mật
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              marginBottom: 25,
              borderRadius: 25,
              color: "#243f68",
              backgroundColor: "#bfc6cf",
              justifyContent: "center",
            }}
          >
            <TextInput
              secureTextEntry={this.state.isShowEyes}
              style={{
                fontSize: 18,
                fontWeight: "6000",
                padding: 10,
                paddingLeft: 20,
                flex: 1,
              }}
              placeholder="Nhập mật khẩu"
              onChangeText={(content) => {
                this.setState({ password: content });
              }}
            ></TextInput>
            <View
              style={{ alignSelf: "center", marginRight: 15 }}
              onTouchStart={() => {
                this.setState({ isShowEyes: !this.state.isShowEyes });
              }}
            >
              {this.state.isShowEyes ? (
                <Image
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  source={require("../Image/hide.png")}
                />
              ) : (
                <Image
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  source={require("../Image/view.png")}
                />
              )}
            </View>
          </View>

          <Text style={{ fontSize: 18, color: "#d0d5dc", fontWeight: "bold" }}>
            Tên người dùng
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              marginBottom: 25,
              borderRadius: 25,
              color: "#243f68",
              backgroundColor: "#bfc6cf",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{
                fontSize: 18,
                fontWeight: "6000",
                padding: 10,
                paddingLeft: 20,
                flex: 1,
              }}
              placeholder="Nhập tên người dùng"
              onChangeText={(content) => {
                this.setState({ nameUser: content });
              }}
            />
          </View>





          <TouchableHighlight

            style={{
              marginTop: 15,
              backgroundColor: '#e74133',
              alignItems: "center",
              padding: 10,
              borderRadius: 25,
            }}
            onPress={() => {
              if (
                this.state.username.length == 0 ||
                this.state.password.length == 0 ||
                this.state.nameUser.length == 0
              ) {
                Alert.alert("Hãy điền đầy đủ thông tin tài khoản")
              } else {
                const data={
                  user: this.state.username,
                  pass: this.state.password,
                  name: this.state.nameUser,
                }
                this.addData(data)
              }
            }}


          >
            <Text
              style={{ color: "#eff3fb", fontWeight: "bold", fontSize: 20 }}
            >
              ĐĂNG KÍ
            </Text>
          </TouchableHighlight>


          <View
            onTouchStart={() => {
              navigation.goBack();
            }}
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "center",
              padding: 10,
            }}

          >
            <Text style={{ color: "#cdcdcd" }}>Đã có tài khoản</Text>
            <Text style={{ color: "#306ad1", fontWeight: "bold" }}>
              {" "}
              Đăng nhập ngay
            </Text>
          </View>


        </View>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({});
