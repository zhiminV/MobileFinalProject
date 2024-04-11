import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Swiper from 'react-native-swiper'
import { collection, getDocs, query, where, whereIn } from 'firebase/firestore'
import { getAllDocs } from '../firebase-files/firebaseHelper'
import { auth, database } from '../firebase-files/firebaseSetup';
import { storage } from '../firebase-files/firebaseSetup'
import { getDownloadURL, ref } from "firebase/storage";



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function TimeLine( props, {navigation}) {

  [photos, usePhotos] = useState(props.item.imageUris);
  [elements, setElements] = useState([]);
  //console.log(photosData);
  const [itemID, setItemID] = useState(0);
  
  useEffect(() => {

    async function getPhoto() {
      
      try {
        let counter = 0;
        let array = [];
        for (i = 0; i < photos.length; i++) {
          const reference = ref(storage, photos[i]);
          const uri = await getDownloadURL(reference);
          counter = counter + 1;
          const object = 
          {
            id: counter,
            url: uri,
          }
          array.push(object);
        } 
        setElements(array);
        console.log(elements);
      } catch (err) {
        console.log('Error Ocurred in getPhoto()', err);
      }
    }
    getPhoto();
    //usePhotos([]);
  }, []);


  return (
    
      <View style={styles.flatListStyle}>
        <Text>{props.item.userID}</Text>
        <Swiper
          key={elements.length}
          //style={styles.viewSwiper}
        >

          {
            elements.map((element) => (
                <Image
                  style={styles.viewPhoto}
                  key={element.id}
                  source={{
                    uri: element.url
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
    width: width,
    height: 1000,
  },

  viewSwiper: {
    flex: 1,
    width: width,
    height: 300,
  },

  viewPhoto: {
    flex: 1,
    width: width,
    height: height * 0.3,
  }

})