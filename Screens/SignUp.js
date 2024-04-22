import { Text, View, SafeAreaView,Alert,TextInput, StyleSheet, ImageBackground} from 'react-native'
import React from 'react'
import colors from '../Helpers/colors';
import { useState } from 'react';
import PressableButton from '../Components/PressableButton';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth, database } from "../firebase-files/firebaseSetup";
import { writeToDB } from '../firebase-files/firebaseHelper';
import { Image } from 'expo-image';

export default function SignUp({navigation}) {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [Name, setName] = useState("");
    const [Location, setLocation] = useState("");
    const [Phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");


    function handleLogin(){
        navigation.navigate("Login");
    }

    const handleSignup = async () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if(!email || !password || !confirmPassword){
            Alert.alert("Files should not empty.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("passwords don't match");
            return;
        }
        if(!isPasswordValid){
            return
        }

        try {
            const userCred = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            if (isEmailValid && isPasswordValid) {
                //const refID = await writeToDB(email, 'Users');
                //console.log(auth.currentUser.uid);
                data = {
                    uid: auth.currentUser.uid,
                    email: email,
                    userName: Name,
                    phoneNum:Phone,
                    location:Location,
                    userAvatar: avatar, 
                    post:[],
                    followers:[],
                    following:[],
                }

                writeToDB(data, "Users");
                navigation.navigate('HomeScreen');

            }
            //console.log(userCred);
        } catch (err) {
            console.log("Error at Signup: ", err.code);
        }

    };

    
    function validateEmail(value){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+$/;
        const isValid = emailRegex.test(value.trim());
        setEmailError(isValid ? " " : 'Please enter a valid email address.');
        return isValid  
    }

    function validatePassword(value) {
        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        if (!isValid) {
            // Show an alert if the password is invalid
            Alert.alert(
                "Password Requirements",
                "-At least 8 characters\n-At least one number\n-At least one uppercase letter\n-At least one lowercase letter\n-At least one special character",
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        }
        setPasswordError(isValid ? '' : 'Your password does not meet the requirements.');
        return isValid;
    }

    return (
        <SafeAreaView style={colors.container}>
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

                {/*<Text style={colors.text}>Password</Text>*/}
                <TextInput
                    style={colors.input}
                    secureTextEntry={true}
                    placeholder="Password"
                    value={password}
                    onChangeText={(changedText) => {
                    setPassword(changedText);
                    }}
                />

                {/* {PasswordError ? <Text style={colors.errorText}>{PasswordError}</Text> : null} */}

                {/*<Text style={colors.text}>Confirm Password</Text>*/}
                <TextInput
                    style={colors.input}
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={(changedText) => {
                    setConfirmPassword(changedText);
                    }}
                />
                
                <View style={colors.buttonView}>
                    <PressableButton customStyle={colors.login} onPressFunction={handleSignup}>
                        <Text style={colors.buttonText}>Sign Up</Text>
                    </PressableButton>
                </View>
                <View style={colors.buttonView}>
                    <PressableButton customStyle={colors.signup} onPressFunction={handleLogin}>
                        <Text style={colors.buttonText}>Have an Account? Log in</Text>
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