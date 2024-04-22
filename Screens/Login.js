import { StyleSheet, Text, View ,TextInput, Alert,SafeAreaView, ImageBackground} from 'react-native'
import React from 'react'
import { useState } from "react";
import colors from '../Helpers/colors';
import PressableButton from '../Components/PressableButton';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-files/firebaseSetup";
import { Image } from 'expo-image';

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
            navigation.navigate('HomeScreen');
        }
    }



    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
              source={require('../assets/loginBackground.jpg')}
              style={styles.imageContainer}
            >
                <Image
                    source={require('../assets/WESHARE.png')}
                    style={colors.logo}
                />
            {/*<Text style={colors.text}>Email Address</Text>*/}
            <TextInput 
            value={email} 
            style={colors.input} 
            placeholder="Email"
            onChangeText={(text) => {
                setemail(text);
            }} 
            />
             {emailError ? <Text style={colors.errorText}>{emailError}</Text> : null}

            {/*{<Text style={colors.text}>Password</Text>}*/}
            <TextInput
                style={colors.input}
                color='white'
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={(changedText) => {
                setPassword(changedText);
                }}
            />

           
                <View style={colors.buttonView}>
                    <PressableButton customStyle={colors.login} onPressFunction={loginHandler}>
                        <Text style={colors.buttonText}>Log in</Text>
                    </PressableButton>
                </View>
                <View style={colors.buttonView}>
                    <PressableButton customStyle={colors.signup} onPressFunction={signupHandler}>
                        <Text style={colors.buttonText}>New User? Sign Up</Text>
                    </PressableButton>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        //backgroundColor: 'white',
        //alignItems: 'center',
        //justifyContent: 'center',
    },

    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 900,
        resizeMode: 'cover',
        backgroundImage: require('../assets/loginBackground.jpg'),
    },
    input: {
        color: "darkmagenta",
        fontSize: 20,
        borderColor: "darkmagenta",
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        width: "85%",   
    },
})