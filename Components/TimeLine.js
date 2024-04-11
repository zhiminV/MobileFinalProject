import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import { Image } from 'expo-image';
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

  
  //[photos, usePhotos] = useState(props.item.imageUris);
  photos = props.item.imageUris;
  //console.log(photos);
  [elements, setElements] = useState([]);
  const [itemID, setItemID] = useState(0);
  const docID = props.item.docId;
  
  useEffect(() => {

    async function getPhoto() {
      
      try {
        //console.log(photos);
        let counter = 0;
        let array = [];
        for (let i = 0; i < photos.length; i++) {
          const reference = ref(storage, photos[i]);
          const uri = await getDownloadURL(reference);
         //console.log(uri);
          counter = counter + 1;
          
          const object = 
          {
            id: counter,
            url: uri,
          };
          //console.log(object);

          array.push(object);
          //console.log(array);
        } 

        setElements(array);
        //console.log(elements);
        //setElements([]);
      } catch (err) {
        console.log('Error Ocurred in getPhoto()', err);
      }
    }

    getPhoto();
  
    //usePhotos([]);
  }, [photos]);


  return (
    
      <View style={styles.flatListStyle}>
        <Text> The Post ID: {docID}</Text>
        <Swiper
          key={elements.length}
          //style={styles.viewSwiper}
        >
          {
            elements.map((element) => (
                <Image
                  style={styles.viewPhoto}
                  key={element.id}
                  source={
                    element.url
                  }
                  //resizeMode={'stretch'}
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
    marginTop: 100,
    width: width,
    height: 600,
    borderColor: 'red',
    borderWidth: 1,
  },

  viewSwiper: {
    flex: 1,
    width: width,
    height: 300,
  },

  viewPhoto: {
    flex: 1,
    width: width,
    height: 200,
  }

})