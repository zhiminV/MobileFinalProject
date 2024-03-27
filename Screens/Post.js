import { StyleSheet, Text, TextInput, View,Button, ScrollView,Image} from 'react-native'
import React, { useState } from 'react'
import colors from '../Helpers/colors';
import ImageManerge from '../Components/ImageManerge';
import { writeToDB } from '../firebase-files/firebaseHelper';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../firebase-files/firebaseSetup';


export default function Post({navigation}) {
  const [description, setDescription] = useState("");
  const [imageUris, setImageUris] = useState([]);

  const handleImageUri = (uri) => {
    if (imageUris.length < 9) {
      setImageUris([...imageUris, uri]);
    } else {
      alert('You can only add up to 9 images.');
    }
  };

 
  return (
    <View>
      <Text style={colors.text}>Description</Text>
      <TextInput
      value={description}
      style = {[colors.input, { height: 100, width: 300,marginLeft:20}]}
      onChange={(text)=>setDescription(text)}
      multiline
      />
  


      <ImageManerge recieveImageUri = {handleImageUri}/>
    

    </View>
  )
}

