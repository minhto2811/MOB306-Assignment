import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";
import { AsyncStorage } from "react-native";

export default class LoginScreen extends Component {
  state = {
    username: "",
    password: "",
    isShowEyes: true,
  };


  checkAccount = (user, pass, navigation) => {
    fetch("http://192.168.56.1:3000/accounts?user=" + user + "&pass=" + pass)
      .then(response => response.json())
      .then((json) => {
        if (json.length == 1) {
          navigation.navigate('home',{nameUser:json[0].name})
        } else {
          Alert.alert("Tài khoản hoặc mật khẩu không chính xác")
        }
      })
      .catch(error => console.log(error));
  }



  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{ flex: 1, backgroundColor: "#0048c8", alignSelf: "stretch", marginTop: 45, }}
      >
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: 'flex-end'
          }}
        >

          <Text style={{ fontSize: 30, color: "white", fontWeight: "bold", marginBottom: 15 }}>
            Đăng nhập
          </Text>
        </View>
        <View
          style={{
            flex: 3.5,
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            padding: 25,
            paddingTop: 35,
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "#022252" }}>
            Chào mừng quay trở lại
          </Text>
          <Text style={{ fontSize: 18, color: "#cdcdcd", marginTop: 10 }}>
            Bạn có thể đăng nhập tại đây
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "#d0d5dc",
              marginTop: 27,
              fontWeight: "bold",
            }}
          >
            Tài khoản hoặc email
          </Text>
          <TextInput
            style={{
              marginTop: 20,
              marginBottom: 30,
              borderRadius: 25,
              color: "#243f68",
              fontSize: 18,
              fontWeight: "6000",
              backgroundColor: "#bfc6cf",
              padding: 10,
              paddingLeft: 20,
            }}
            placeholder="Nhập tài khoản hoặc email "
            onChangeText={(content) => {
              this.setState({ username: content });
            }}
          ></TextInput>
          <Text style={{ fontSize: 18, color: "#d0d5dc", fontWeight: "bold" }}>
            Mật khẩu
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              marginBottom: 30,
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
          <Text
            style={{ fontSize: 18, color: "#2461cf", marginBottom: 30 }}>
            Quên mật khẩu?
          </Text>

          <TouchableHighlight

            style={{
              backgroundColor: '#007acc',
              alignItems: "center",
              padding: 10,
              borderRadius: 25,
            }}
            onPress={() => {
              if (this.state.username.length > 0 && this.state.password.length > 0) {
                this.checkAccount(this.state.username, this.state.password, navigation)
              } else {
                Alert.alert("Kiểm tra thông tin");
              }
            }}


          >
            <Text
              style={{ color: "#eff3fb", fontWeight: "bold", fontSize: 20 }}
            >
              ĐĂNG NHẬP
            </Text>
          </TouchableHighlight>


          <View
            onTouchStart={() => {
              navigation.navigate('signup')
            }}
            style={{
              marginTop: 45,
              flexDirection: "row",
              justifyContent: "center",
              padding: 10,
            }}

          >
            <Text style={{ color: "#cdcdcd" }}>Chưa có tài khoản?</Text>
            <Text style={{ color: "#306ad1", fontWeight: "bold" }}>
              {" "}
              Đăng kí ngay
            </Text>
          </View>


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
