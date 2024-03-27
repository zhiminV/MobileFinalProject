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
      }
  }


  async function  takeImageHandle() {
    try{
      const havePermission = await vertifyPermission()
      console.log(havePermission);
      if(!havePermission){
        Alert("You do not have permission to access camera");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing:true,
      });
      recieveImageUri(result.assets[0].uri);
    }
    catch(err){
      console.log(err);
    }
  }

  async function takeImageHandleFromLibrary() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
   
      recieveImageUri(result.uri);
      
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <View style = {styles.container}>
      <Ionicons name="camera" size={60} color="black"onPress={takeImageHandle} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  image: { width: 100, height: 100 },
});
