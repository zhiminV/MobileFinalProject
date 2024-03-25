import { Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import colors from '../Helpers/colors';

export default function SignUp() {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    </SafeAreaView>
  )
}

