import { View, Text, FlatList, StyleSheet, Dimensions, Modal, Button, KeyboardAvoidingView, TextInput } from 'react-native'
import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react'
import Swiper from 'react-native-swiper'
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, updateDoc, where, whereIn } from 'firebase/firestore'
import { getAllDocs, writeToDB } from '../firebase-files/firebaseHelper'
import { auth, database } from '../firebase-files/firebaseSetup';
import { storage } from '../firebase-files/firebaseSetup'
import { getDownloadURL, ref } from "firebase/storage";
import PressableButton from './PressableButton';
import { AntDesign } from '@expo/vector-icons';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function TimeLine( props ) {

  const photos = props.item.downloadUris;
  [elements, setElements] = useState([]);
  const docID = props.item.email;
  const postID = props.item.docId;
  let time = props.item.timestamp.toDate().toString();
  time = time.substring(4, 15);
  const [commentPressed, setCommentPressed] = useState(false);
  [input, changeInput] = useState("");
  const [comments, setComments] = useState([]);
  const [sendPressed, setSendPressed] = useState(false);
  
  useEffect(() => {

    async function getPhoto() {
      
      try {
        let counter = 0;
        let array = [];
        for (let i = 0; i < photos.length; i++) {
          counter = counter + 1;
          const object = 
          {
            id: counter,
            url: photos[i],
          };     
          array.push(object);
        } 
        setElements(array);
      } catch (err) {
        console.log('Error Ocurred in getPhoto()', err);
      }
    }

    getPhoto();
  
  }, []);
  
  function commentHanlder() {
    if (commentPressed === false) {
      setCommentPressed(true);
    } else {
      setCommentPressed(false);
    }
  }

  async function sendComment() {
    const collectionRef = collection(database, 'Users');
    const query_user = query(collectionRef, where('uid', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(query_user);

    const collectionRefComment = collection(database, 'Comments');
    const query_comment = query(collectionRef, where('postID', '==', postID));
    const querySnapshotComment = await getDocs(query_comment);
    
    const commentRef = querySnapshotComment.docs[0].ref;





    const email = querySnapshot.docs[0].data().email;
    const timestamp = serverTimestamp();
    const documentID = querySnapshot.docs[0].id;

    const comment = {content: input, time: timestamp, author: email}
    await updateDoc(commentRef, {content: arrayUnion(comment)});
    setSendPressed(!sendPressed);
    changeInput('');
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
            <KeyboardAvoidingView 
              style={styles.textInputContainer} 
              behavior='padding' 
              enabled={true}
              //keyboardVerticalOffset={700}
            >
              <View style={styles.containerStyle}>
                <Button title={"close comment"} onPress={commentHanlder}/>
                <FlatList
                    style={styles.flatListStyle}
                />
                <View style={styles.userInput}>
                  <TextInput 
                    onChangeText={changeInput} 
                    value={input}
                    style={styles.textInput}
                    placeholder="Add a comment here"
                    placeholderTextColor="#bdbdbf"
                  />
                  {input ? 
                  <PressableButton customStyle={styles.sendButtonStyle} onPressFunction={sendComment}>
                    <AntDesign name="arrowup" size={24} color="white" />
                  </PressableButton> 
                  : 
                  <PressableButton customStyle={styles.sendButtonStyleNegative}>
                    <AntDesign name="arrowup" size={24} color="white"/>
                  </PressableButton>}
                </View>
              </View>
            </KeyboardAvoidingView>
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
    //borderRadius: 10,
    width: 200,
    //maxHeight: 300,
  },
  containerStyle: {
    //backgroundColor: 'rgba(0,0,0,0.2)',
    //position: 'relative',
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: 'white',
    width: width,
    maxHeight: 500,
    //position:'relative',
    borderRadius: 20,

    //maxHeight: 300,
  },
  flatListStyle: {
    marginTop: 30,
    height: height * 0.7,
    width: width,
  },
  textInputContainer: {
    justifyContent: 'flex-end',
    //paddingBottom: 50,
    borderRadius : 20,
    flex: 1,
    //backgroundColor: 'white',
  },
  textInput: {
    alignSelf: 'center',
    height: 40,
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
    width: width* 0.7,
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonStyle: {
    backgroundColor: '#378ef7',
    borderRadius:20,
    width: 80,
    marginLeft: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonStyleNegative: {
    backgroundColor: 'grey',
    borderRadius:20,
    width: 80,
    marginLeft: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInput: {
    flexDirection: 'row',
    marginBottom: 30,
  },


})