import { StyleSheet, Text, View ,TextInput, Alert} from 'react-native'
import React from 'react'
import { useState } from "react";
import colors from '../Helpers/colors';
import PressableButton from '../Components/PressableButton';

export default function Login({navigation}) {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState("");

    const signupHandler = () => {
        navigation.replace("Signup");
    };

    const loginHandler = () => {
        if (!email || !password) {
            Alert.alert("Fields should not be empty");
            return;
        }
        navigation.navigate("Home");
  
    };


    return (
        <SafeAreaView style={colors.container}>
            <Text style={colors.text}>Email Address</Text>
            <TextInput 
            value={email} 
            style={colors.input} 
            placeholder="Email"
            onChangeText={(text) => {
                setemail(text);
            }} 
            />

            <Text style={colors.text}>Password</Text>
            <TextInput
                style={colors.input}
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={(changedText) => {
                setPassword(changedText);
                }}
            />

            <View style={colors.buttonsContainer}>
                <View style={colors.buttonView}>
                    <PressableButton customStyle={colors.cancle} onPressFunction={loginHandler}>
                        <Text style={colors.buttonText}>Login</Text>
                    </PressableButton>
                </View>
                <View style={colors.buttonView}>
                    <PressableButton customStyle={colors.save} onPressFunction={signupHandler}>
                        <Text style={colors.buttonText}>New User? SignUp</Text>
                    </PressableButton>
                </View>
            </View> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})