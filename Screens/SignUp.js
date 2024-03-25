import { Text, View, SafeAreaView,Alert} from 'react-native'
import React from 'react'
import colors from '../Helpers/colors';

export default function SignUp({navigation}) {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');


    function handleLogin(){
        navigation.navigate("Login");
    }

    function handleSignup(){
        const isEmailValid = validateEmail(email);
        const isNumberValid = validatePassword(password);

        if(!email || !password || !confirmPassword){
            Alert.alert("Files should not empty.");
          }
        if (password !== confirmPassword) {
        Alert.alert("passwords don't match");
        return;
        }
        if (isEmailValid && isNumberValid) {
            navigation.navigate('Home');
        }

    }

    
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

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={(changedText) => {
                setPassword(changedText);
                }}
            />

            {PasswordError ? <Text style={colors.errorText}>{PasswordError}</Text> : null}

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(changedText) => {
                setConfirmPassword(changedText);
                }}
            />
            <View style={colors.buttonsContainer}>
                <View style={colors.buttonView}>
                    <PressableButton customStyle={colors.cancle} onPressFunction={handleSignup}>
                        <Text style={colors.buttonText}>SignUp</Text>
                    </PressableButton>
                </View>
                <View style={colors.buttonView}>
                    <PressableButton customStyle={colors.save} onPressFunction={handleLogin} disabled={isStartButtonDisabled}>
                        <Text style={colors.buttonText}>Already SignUp? Login</Text>
                    </PressableButton>
                </View>
            </View> 


        </SafeAreaView>
    )
}

