import { StyleSheet, Text, View, TextInput,SafeAreaView } from 'react-native'
import React from 'react'
import { auth } from '../firebase-files/firebaseSetup'
import { Ionicons } from '@expo/vector-icons';
import PressableButton from '../Components/PressableButton';
import { useEffect,useState } from 'react';
import colors from '../Helpers/colors';

export default function Profile({navigation}) {
    const [Name, setName] = useState("");
    const [Location, setLocation] = useState("");
    const [Phone, setPhone] = useState("");

    useEffect(()=> {
        //fetch user postsCount,followersCount,followingCount
        
    },[])

    function addImageHandle(){
        // let user add photo 
    }
    function handleCancle(){
        navigation.goBack()
    }
    function handleSave(){
        console.log("updata change in dattbase");
        
    }

 
  return (
    <SafeAreaView style={colors.container}>
      <PressableButton onPressFunction={addImageHandle} >
        <Ionicons name="person-add-outline" size={40} color="black" /> 
      </PressableButton>

        <View >
            <Text style={colors.text}>Name:</Text>
            <TextInput
            style={colors.input}
            value={Name}
            onChangeText={() => setName({ value })}
            />

            <Text style={colors.text}>Phone:</Text>
            <TextInput
            style={colors.input}
            value={Phone}
            onChangeText={() => setPhone({value})}
            />

            <Text style={colors.text}>Location:</Text>
            <TextInput
            style={colors.input}
            value={Location}
            onChangeText={() => setLocation({value})}
            />
            <View >
                <Text>Email: {auth.currentUser.email}</Text>
                <Text>UID: {auth.currentUser.uid}</Text>
            </View>
            <View style={colors.buttonsContainer}>
                <View style={colors.buttonView}>
                    <PressableButton customStyle={colors.cancle} onPressFunction={handleCancle}>
                        <Text style={colors.buttonText}>Cancle</Text>
                    </PressableButton>
                </View>
                <View style={colors.buttonView}>
                    <PressableButton customStyle={colors.save} onPressFunction={handleSave}>
                        <Text style={colors.buttonText}>Save</Text>
                    </PressableButton>
                </View>
            </View> 

        </View>
    </SafeAreaView>
  
  )
}

