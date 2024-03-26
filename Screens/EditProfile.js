import { StyleSheet, Text, View, TextInput,SafeAreaView } from 'react-native'
import React from 'react'
import { auth } from '../firebase-files/firebaseSetup'
import { Ionicons } from '@expo/vector-icons';
import PressableButton from '../Components/PressableButton';
import { useEffect,useState } from 'react';
import colors from '../Helpers/colors';

export default function Profile() {
    const [userData, setUserData] = useState({
        Name: "",
        Location:"",
        Phone:"",
    });

    useEffect(()=> {
        //fetch user postsCount,followersCount,followingCount
        
    },[])

    function addImageHandle(){
        // let user add photo 
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
            value={userData.Name}
            onChangeText={(text) => setUserData({ ...userData, Name: text })}
            />

            <Text style={colors.text}>Phone:</Text>
            <TextInput
            style={colors.input}
            value={userData.Phone}
            onChangeText={(text) => setUserData({ ...userData, Phone: text })}
            />

            <Text style={colors.text}>Location:</Text>
            <TextInput
            style={colors.input}
            value={userData.Location}
            onChangeText={(text) => setUserData({ ...userData, Location: text })}
            />
            <View >
                <Text>Email: {auth.currentUser.email}</Text>
                <Text>UID: {auth.currentUser.uid}</Text>
            </View>

        </View>
    </SafeAreaView>
  
  )
}

