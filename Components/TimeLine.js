import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Swiper from 'react-native-swiper'
import { collection, getDocs, query, where, whereIn } from 'firebase/firestore'
import { getAllDocs } from '../firebase-files/firebaseHelper'
import { auth, database } from '../firebase-files/firebaseSetup';
import { storage } from '../firebase-files/firebaseSetup'
import { getDownloadURL, ref } from "firebase/storage";


export default function TimeLine( props, {navigation}) {

  const post = props.item;
  const photosData = post.imageUris;
  [photos, usePhotos] = useState([]);
  //console.log(photosData);
  const [itemID, setItemID] = useState(0);

  useEffect(() => {

    async function getPhoto() {
      try {
        for (i = 0; i < photosData.length; i++) {
          console.log(photosData[i])
        const reference = ref(storage, photosData[i]);
        const uri = await getDownloadURL(reference);
        //console.log(uri);
        const counter = itemID + 1;
        const object = 
        {
          id: counter,
          url: uri,
        }
        usePhotos([object]);
        setItemID(counter);
        
      } 
      } catch (err) {
        console.log('Error Ocurred in getPhoto()' ,err);
      }
    }
    getPhoto();
  }, []);

  return (
    
      <View style={styles.flatListStyle}>
        <Text>{post.userID}</Text>
        <Swiper
          horizontal={true}
        >
          {
            photos.map((photo) => (
                <Image
                  style={styles.view}
                  key={photo.id}
                  source={{
                    uri: photo.url
                  }}
                />
            ))
          }
        </Swiper>
      </View>
  )
}


const styles = StyleSheet.create({
  searchView: {
    flex: 1,
  },
  
  flatListStyle: {
    marginTop: 30,
    height:600,
    width: 300,
  },

  view: {
    flex: 1,
    width: 200,
    height: 200,
  }

})