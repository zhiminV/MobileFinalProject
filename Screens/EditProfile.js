import { StyleSheet, Text, View, TextInput,SafeAreaView,Image,Alert, ScrollView } from 'react-native'
import React from 'react'
import { auth } from '../firebase-files/firebaseSetup'
import { Ionicons } from '@expo/vector-icons';
import PressableButton from '../Components/PressableButton';
import { useEffect,useState } from 'react';
import colors from '../Helpers/colors';
import ImageManerge from '../Components/ImageManerge';
import { fetchInfoById,updateFromDB } from '../firebase-files/firebaseHelper';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { database } from '../firebase-files/firebaseSetup';

export default function EditProfile({navigation}) {

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            // Query the "Users" collection to find the document associated with the current user's UID
            const usersCollectionRef = collection(database, "Users");
            const q = query(usersCollectionRef, where("uid", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
              // If a document is found, obtain its document ID and fetch user data using fetchInfoById
              const docId = querySnapshot.docs[0].id;
              setdocid(docId);
              const userProfile = await fetchInfoById("Users", docId);
              
              if (userProfile) {
                setName(userProfile.userName || "");
                setLocation(userProfile.location || "");
                setPhone(userProfile.phoneNum || "");
                setAvatar(userProfile.userAvatar || "");
              }
            } else {
              console.log("No document found for the current user");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUserData();
      }, [navigation]);

    const [Name, setName] = useState("");
    const [Location, setLocation] = useState("");
    const [Phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    const [docid, setdocid] = useState("");
   
    function handleCancle(){
        navigation.goBack()
    }

    function handleSave(){
        const newProfile = {
            userName:Name,
            location: Location,
            phoneNum: Phone,
            userAvatar: avatar
        };
        Alert.alert('Important', 'Are you sure you want to save these changes?',[
            {
              text: 'No',
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => 
            updateFromDB("Users",docid, newProfile)
              .then(() => {
                navigation.navigate("Profile");
              })
              .catch((error) => console.error("Update failed", error))
            },
        ]);
        
        
    }

    function receiveImageUri(uri){
        setAvatar(uri);
    }

 
  return (
    <ScrollView>
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
    </ScrollView>
  
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
