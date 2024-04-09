import { StyleSheet, Text, View ,TextInput, Alert,SafeAreaView} from 'react-native'
import React from 'react'
import { useState } from "react";
import colors from '../Helpers/colors';
import PressableButton from '../Components/PressableButton';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-files/firebaseSetup";

export default function Login({navigation}) {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');

    function validateEmail(value){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+$/;
        const isValid = emailRegex.test(value.trim());
        setEmailError(isValid ? " " : 'Please enter a valid email address.');
        return isValid  
    }

    function validatePassword(value) {
        // Regular expression to check if the password meets the criteria
        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        setPasswordError(isValid ? '' : 'Please enter a valid password.');
        return isValid;
    }

    const signupHandler = () => {
        navigation.replace("SignUp");
    };

    const loginHandler = async () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        try {
          if (!email || !password) {
            Alert.alert("Fields should not be empty");
            return;
          }
          //return a promise 
          const userCred = await signInWithEmailAndPassword(auth, email, password);
          
        } catch (err) {
          console.log(err);
        }

        if (isEmailValid && isPasswordValid) {
            navigation.navigate('Home');
        }
    }



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
             {emailError ? <Text style={colors.errorText}>{emailError}</Text> : null}

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