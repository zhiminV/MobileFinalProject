import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';


export default function ImageManerge({recieveImageUri}) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");

  async function vertifyPermission(){
      if(status.granted ){
        return true;
      } 
      try{
        const permissionReasponse = await requestPermission();
        return permissionReasponse.granted;
      }
      catch(err){
        console.log(err);
        return false;
      }
  }


  async function takeImageHandle() {
    try {
      const havePermission = await vertifyPermission()
      console.log(havePermission);
      if (!havePermission) {
        Alert.alert("You do not have permission to access the camera");
        return;
      }
      Alert.alert(
        "Select Image Source",
        "Choose the source of the image",
        [
          {
            text: "Camera",
            onPress: () => {
              takeImageHandleFromCamera();
              return false; 
            },
          },
          {
            text: "Photo Library",
            onPress: () => {
              takeImageHandleFromLibrary();
              return false;
            },
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      console.log(err);
    }
  }
  

  async function takeImageHandleFromCamera() {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
    
      recieveImageUri(result.assets[0].uri);
      
    } catch (err) {
      console.log(err);
    }
  }

  async function takeImageHandleFromLibrary() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
      recieveImageUri(result.assets[0].uri);
      
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <View style = {styles.container}>
      <Ionicons name="camera" size={30} color="black"onPress={takeImageHandle}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  image: { width: 100, height: 100 },
});
