import { StyleSheet, Text, View, TextInput,SafeAreaView,Image } from 'react-native'
import React from 'react'
import { auth } from '../firebase-files/firebaseSetup'
import { Ionicons } from '@expo/vector-icons';
import PressableButton from '../Components/PressableButton';
import { useEffect,useState } from 'react';
import colors from '../Helpers/colors';
import ImageManerge from '../Components/ImageManerge';

export default function Profile({navigation}) {
    const [Name, setName] = useState("");
    const [Location, setLocation] = useState("");
    const [Phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(()=> {
        //fetch user postsCount,followersCount,followingCount
        
    },[])

   
    function handleCancle(){
        navigation.goBack()
    }
    function handleSave(){
        console.log("updata change in dattbase");
        
    }

    function receiveImageUri(uri){
        setAvatar(uri);
    }

 
  return (
    <SafeAreaView style={colors.container}>
    
      <View style={styles.avatarContainer}>
            {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
                <Ionicons name="person-circle-outline" size={120} color="gray" />
            )}
            <ImageManerge recieveImageUri={receiveImageUri} />
        </View>

        <View >
            <Text style={colors.text}>Name:</Text>
            <TextInput
            style={[colors.input, { height: 55, width: 330,marginLeft:20}]}
            value={Name}
            onChangeText={(text) => setName(text)}
            />

            <Text style={colors.text}>Phone:</Text>
            <TextInput
            style={[colors.input, { height: 55, width: 330,marginLeft:20}]}
            value={Phone}
            onChangeText={(text) => setPhone(text)}
            />

            <Text style={colors.text}>Location:</Text>
            <TextInput
            style={[colors.input, { height: 55, width: 330,marginLeft:20}]}
            value={Location}
            onChangeText={(text) => setLocation(text)}
            />
           
            <Text style={colors.text}>Email:</Text>
            <Text style={[colors.input, { height: 55, width: 330,marginLeft:20}]}> {auth.currentUser.email}</Text>
            <Text style={colors.text}>UID:</Text>
            <Text style={[colors.input, { height: 55, width: 330,marginLeft:20}]}> {auth.currentUser.uid}</Text>
            
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

const styles = StyleSheet.create({
  
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
})
