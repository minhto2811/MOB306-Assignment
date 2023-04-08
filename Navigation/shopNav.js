import HomScreen from "../Screen/Home";
import ListClass from "../Screen/ListClass";
import LoginScreen from "../Screen/Login";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import SignUpScreen from "../Screen/SignUp";
import ListStudent from "../Screen/ListStudent";
import InfoClass from "../Screen/DetailClass";
import { StatusBar } from "react-native";
import DetailStudent from "../Screen/DetailStudent";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="signup" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="home" component={HomScreen} options={{ headerShown: false }} />
            <Stack.Screen name="listclass" component={ListClass} options={{ headerShown: false }} />
            <Stack.Screen name="liststudent" component={ListStudent} options={{ headerShown: false }} />
            <Stack.Screen name="infoc" component={InfoClass} options={{ headerShown: false }} />
            <Stack.Screen name="infos" component={DetailStudent} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}


const MainNavigator = () => {
    return (
        <NavigationContainer>
            <MyStack></MyStack>
        </NavigationContainer>
    )
}

export default MainNavigator;