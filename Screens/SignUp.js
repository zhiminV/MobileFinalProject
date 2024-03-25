import { Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import colors from '../Helpers/colors';

export default function SignUp() {
    const [email, setemail] = useState('');

  return (
    <SafeAreaView style={colors.container}>
        <Text style={colors.text}>Email Address</Text>
            <TextInput 
            value={email} 
            style={colors.input} 
            onChangeText={(text) => {
                setemail(text);
                setStartButtonDisabled(false)

            }} 
            />
    </SafeAreaView>
  )
}

