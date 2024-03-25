import { StyleSheet, Text, View ,TextInput} from 'react-native'
import React from 'react'
import { useState } from "react";
import colors from '../Helpers/colors';

export default function Login() {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState("");

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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})