import { StyleSheet, Text, TextInput, View,Button, ScrollView, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState,useEffect } from 'react'
import colors from '../Helpers/colors';
import ImageManerge from '../Components/ImageManerge';
import { writeToDB,updateFromDB,fetchInfoById} from '../firebase-files/firebaseHelper';
import { ref, uploadBytes } from "firebase/storage";
import { storage, auth, database, firestore  } from '../firebase-files/firebaseSetup';
import { serverTimestamp } from 'firebase/firestore';
import { collection,query, where, getDocs } from 'firebase/firestore'


export default function Post({navigation}) {

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
          // console.log(docId);
          setdocID(docId);
          const userProfile = await fetchInfoById("Users", docId);
          // console.log(userProfile)
          setPostArr(userProfile.post);
        
        } else {
          console.log("No document found for the current user");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


  const [description, setDescription] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [docID, setdocID] = useState("");
  const [postArr, setPostArr] = useState([]);
  // console.log(postArr);

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

  const handleImageUri = (uri) => {
    if (imageUris.length < 9) {
      setImageUris([...imageUris, uri]);
    } else {
      alert('You can only add up to 9 images.');
    }
  };

  function handleReset(){
    setDescription('');
    setImageUris([]);
  }

  const handlePost = async () => {
    try {
      const uploadUris = await Promise.all(imageUris.map(uri => getImageData(uri)));
      const timestamp = serverTimestamp();
      const newPost = {
        description: description,
        imageUris: uploadUris,
        timestamp: timestamp, 
        userID: auth.currentUser.uid,
      };

      console.log(newPost);

      const docRef =  await writeToDB(newPost, "Posts")
      const postId = docRef.id;

      // Update the user document with the updated postArr
      updateFromDB("Users", docID, { post: [...postArr, postId] });

      // Reset state
      setDescription('');
      setImageUris([]);
      navigation.navigate("Home");
      
    } catch (error) {
      console.error("Failed to post:", error);
      alert('Failed to add post. Please try again.');
    }
  };

  function handleLocation(){
    console.log("should locate user current location");
  }

  function handleWeather(){
    console.log("should use external API in iteration 2")
  }

  
 
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={colors.text}>Description</Text>
          <TextInput
            value={description}
            style={[colors.input, { height: 100, width: 300, marginLeft: 20 }]}
            onChangeText={setDescription}
            multiline
          />

          <View style={styles.imageGrid}>
            {imageUris.map((uri, index) => (
              <View style={styles.imageContainer} key={index}>
                <Image source={{ uri }} style={styles.image} />
              </View>
            ))}
          </View>

          <ImageManerge recieveImageUri={handleImageUri} />
          <Button title="Post" onPress={handlePost} />
          <Button title="Reset" onPress={handleReset} />
          <Button title="Location" onPress={handleLocation} />
          <Button title="Weather" onPress={handleWeather} />
        </View>
      </TouchableWithoutFeedback>
  </ScrollView>
);
}

const styles = StyleSheet.create({
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
  },
  imageContainer: {
    width: '30%', // Approximately three images per row
    aspectRatio: 1, // Keep the aspect ratio of images to 1:1
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

