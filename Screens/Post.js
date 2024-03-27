import { StyleSheet, Text, TextInput, View,Button, ScrollView, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import colors from '../Helpers/colors';
import ImageManerge from '../Components/ImageManerge';
import { writeToDB } from '../firebase-files/firebaseHelper';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../firebase-files/firebaseSetup';


export default function Post({navigation}) {
  const [description, setDescription] = useState("");
  const [imageUris, setImageUris] = useState([]);

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
      const newPost = {
        description: description,
        imageUris: uploadUris, // Array of uploaded image paths
      };
  
      await writeToDB(newPost, "Posts"); 
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

