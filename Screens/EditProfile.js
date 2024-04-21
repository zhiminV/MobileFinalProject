import { StyleSheet, Text, View, TextInput,SafeAreaView,Image,Alert, ScrollView } from 'react-native'
import React from 'react'
import { storage,auth } from '../firebase-files/firebaseSetup'
import { Ionicons } from '@expo/vector-icons';
import PressableButton from '../Components/PressableButton';
import { useEffect,useState } from 'react';
import colors from '../Helpers/colors';
import ImageManerge from '../Components/ImageManerge';
import { fetchInfoById,updateFromDB } from '../firebase-files/firebaseHelper';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { database } from '../firebase-files/firebaseSetup';
import { ref, uploadBytes } from "firebase/storage";

export default function EditProfile({navigation}) {
  const [Name, setName] = useState("");
  const [Location, setLocation] = useState("");
  const [Phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [docid, setdocid] = useState("");
  const [localUri,setLocationUri] = useState("");

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
   
  function handleCancle(){
      navigation.goBack()
  }

  async function getImageData(uri) {
    try {
      const response = await fetch(uri);
      const imageBlob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytes(imageRef, imageBlob);
      return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSave() {
    try {
      let newAvatar = avatar;

      // If a new avatar image is selected
      if (avatar.startsWith('data:image')) {
        newAvatar = await getImageData(avatar);
      }
      console.log(newAvatar)

      const newProfile = {
        userName: Name,
        location: Location,
        phoneNum: Phone,
        userAvatar: newAvatar // Use the new avatar URL
      };

      Alert.alert('Important', 'Are you sure you want to save these changes?', [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes', onPress: () =>
            updateFromDB("Users", docid, newProfile)
              .then(() => {
                navigation.goBack()
              })
              .catch((error) => console.error("Update failed", error))
        },
      ]);
    } catch (error) {
      console.error("Error saving changes:", error);
      alert('Failed to save changes. Please try again.');
    }
  }

  function receiveImageUri(uri) {
    setLocationUri(uri)
    console.log(localUri)
    getImageData(uri).then((imagePath) => {
      setAvatar(imagePath);
    });
   
  }

 
  return (
    <ScrollView>
      <SafeAreaView style={colors.container}>
      
        <View style={styles.avatarContainer}>
              {localUri ? (
                  <Image source={{ uri: localUri }} style={styles.avatarImage} />
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
              
              <View style={styles.buttonsContainer}>
                  <View style={styles.buttonView}>
                      <PressableButton customStyle={colors.cancle} onPressFunction={handleCancle}>
                          <Text style={colors.buttonText}>Cancle</Text>
                      </PressableButton>
                  </View>
                  <View style={styles.buttonView}>
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
    buttonView: {
      width: "30%",
      margin: 20,
     
  },
  buttonsContainer: {
       flexDirection: "row",
       marginTop: 20,
       justifyContent: "center",
       alignItems: "center",
      
  },
  buttonText:{
      color: 'black',
      fontSize: 15,
      alignSelf:"center",
  },
  

})
