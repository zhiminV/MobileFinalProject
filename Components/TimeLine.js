import { View, Text, FlatList, StyleSheet, Dimensions, Modal, Button } from 'react-native'
import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react'
import Swiper from 'react-native-swiper'
import { collection, getDocs, query, where, whereIn } from 'firebase/firestore'
import { getAllDocs } from '../firebase-files/firebaseHelper'
import { auth, database } from '../firebase-files/firebaseSetup';
import { storage } from '../firebase-files/firebaseSetup'
import { getDownloadURL, ref } from "firebase/storage";
import PressableButton from './PressableButton';



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function TimeLine( props) {

  const photos = props.item.downloadUris;
  //[photos, usePhotos] = useState(props.item.imageUris);
  console.log(photos);
  [elements, setElements] = useState([]);
  const docID = props.item.email;
  let time = props.item.timestamp.toDate().toString();
  time = time.substring(4, 15);
  //const [avatarURL, setAvatarURL] = useState('');
  //[initialize, initializer] = useState(false);
  const [commentPressed, setCommentPressed] = useState(false);


  
  useEffect(() => {

    async function getPhoto() {
      
      try {
        //console.log(time);
        console.log(photos);

        let counter = 0;
        let array = [];
        for (let i = 0; i < photos.length; i++) {
          //const reference = ref(storage, photos[i]);
          //const uri = await getDownloadURL(reference);
         //console.log(uri);
          counter = counter + 1;
          
          const object = 
          {
            id: counter,
            url: photos[i],
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
  }, []);
  
  function commentHanlder() {
    if (commentPressed === false) {
      setCommentPressed(true);
    } else {
      setCommentPressed(false);
    }
  }

  return (
    
      <View style={styles.flatListStyle}>
       
          <Text style={styles.userNameFont}> {docID}</Text>
          <Swiper
            key={photos.length}
            //style={styles.viewSwiper}
          >
            {
              photos.map((photo) => (
                  <Image
                    style={styles.viewPhoto}
                    source={photo}
                    key={photo}
                    //resizeMode={'stretch'}
                  />
              ))
            }
          </Swiper>
          <View style={styles.userView}>
            <Text style={styles.userNameFont}> {time.toString()} </Text>
          </View>
          <PressableButton customStyle={{width: 200}} onPressFunction={commentHanlder}>
            <Text>View All Comments</Text>
          </PressableButton>
          <Modal title='All Comments' animationType='slide' visible={commentPressed} presentationStyle="overFullScreen" transparent={true}>
            <View style={styles.containerStyle}>
              <View style={{
                //marginTop: 300,
                width: width,
                height: height * 0.6,
                backgroundColor: 'white',
                borderRadius : 20}}>
                  <Button title={"close comment"} onPress={commentHanlder}/>
              </View>
            </View>
         </Modal>
      </View>
  )

}


const styles = StyleSheet.create({
  searchView: {
    flex: 1,
  },
  userView: {
    flexDirection: 'row',
  },
  avatar: {
    width: 30,
    height: 30,
  },
  
  userNameFont: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  flatListStyle: {
    //marginTop: 30,
    width: width,
    height: 600,
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
  },
  modalView: {

    borderRadius: 10,
    width: 200,
    maxHeight: 300,
  },
  containerStyle: {
    //backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'relative',
    justifyContent: 'flex-end',
    flex: 1,
  },

})