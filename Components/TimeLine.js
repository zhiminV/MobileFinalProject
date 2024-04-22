import { View, Text, FlatList, StyleSheet, Dimensions, Modal, Button, KeyboardAvoidingView, TextInput } from 'react-native'
import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react'
import Swiper from 'react-native-swiper'
import { arrayUnion, collection, doc, Firestore, getDocs, query, serverTimestamp, updateDoc, where, whereIn, Timestamp } from 'firebase/firestore'
import { getAllDocs, writeToDB } from '../firebase-files/firebaseHelper'
import { auth, database } from '../firebase-files/firebaseSetup';
import { storage } from '../firebase-files/firebaseSetup'
import { getDownloadURL, ref } from "firebase/storage";
import PressableButton from './PressableButton';
import { AntDesign } from '@expo/vector-icons';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function TimeLine( props ) {


  //console.log(props.item);
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
  const avatarurl = props.item.avatar;


  
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
        
        //console.log(avatarDownloadURL)
      } catch (err) {
        console.log('Error Ocurred in getPhoto()', err);
      }
    }

    getPhoto();
  
  }, []);
  
  useEffect(() => {

    async function getComments() {

      try {
      const collectionRefComment = collection(database, 'Comments');
      const query_comment = query(collectionRefComment, where('postID', '==', postID));
      const querySnapshotComment = await getDocs(query_comment);
      const tempArray = querySnapshotComment.docs[0].data().content;
      //console.log(querySnapshotComment.docs[0].data().content);
      //setComments(querySnapshotComment.docs[0].data().content);

      if (tempArray) {
        for (let i = 0; i < tempArray.length; i++) {
          const collectionRefUser = collection(database, 'Users');
          const query_pic = query(collectionRefUser, where('email', '==', tempArray[i].author));
          const querySnapshotProfilepic = await getDocs(query_pic);
          
          const result = querySnapshotProfilepic.docs[0].data().userAvatar;
          //console.log(result);
          //console.log(result);
          let url;
          if (result) {
            const imageRef = ref(storage, result);
            url = await getDownloadURL(imageRef);
          }
          tempArray[i]['avatarURL'] = url;
          //console.log(tempArray[i]);
        }
        
        
        
      }
      setComments(tempArray);
      //console.log(tempArray);
      
    } catch (err) {
      console.log(err);
    }
    } 
    getComments();

  }, [sendPressed, commentPressed])


  function commentHanlder() {
    if (commentPressed === false) {
      setCommentPressed(true);
    } else {
      setCommentPressed(false);
    }
  }

  async function sendComment() {

    try {
    const collectionRef = collection(database, 'Users');
    const query_user = query(collectionRef, where('uid', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(query_user);

    const collectionRefComment = collection(database, 'Comments');
    const query_comment = query(collectionRefComment, where('postID', '==', postID));
    const querySnapshotComment = await getDocs(query_comment);
    
    const commentRef = querySnapshotComment.docs[0].ref;
    const email = querySnapshot.docs[0].data().email;
    const documentID = querySnapshot.docs[0].id;
    
    const timestamp = Timestamp.now();
    const comment = {content: input, time: timestamp, author: email}
    await updateDoc(commentRef, {content: arrayUnion(comment)});
    setSendPressed(!sendPressed);
    changeInput('');
    } catch (err) {
      console.log('Error Occured in ', err);
    }
  }

  return (
    
      <View style={styles.flatListStyle}>
          <View style={styles.userIntroView}>
            <Image
              source={props.item.avatar}
              style={styles.postAvatar}

            />
            <Text style={styles.userNameFont}> {docID}</Text>
          </View>
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
            <Text style={styles.timeFont}> {time.toString()} </Text>
          </View>
          <Text style={{marginLeft: 5}}>{props.item.description}</Text>
            <PressableButton customStyle={{width: 200, marginTop: 10,}} onPressFunction={commentHanlder}>
              <Text style={{color: '#737373'}}>View All Comments</Text>
            </PressableButton>
          <Modal title='All Comments' animationType='slide' visible={commentPressed} presentationStyle="overFullScreen" transparent={true}>
            <KeyboardAvoidingView 
              style={styles.textInputContainer} 
              behavior='padding' 
              enabled={true}
            >
              <View style={styles.containerStyle}>
                <Button title={"close comment"} onPress={commentHanlder}/>
                <FlatList
                    style={styles.flatListStyle}
                    data={comments}
                    renderItem={({item}) =>  (
                      <View style={styles.commentView}>
                        <Image
                          source={item.avatarURL}
                          style={styles.avatar}
                        />
                        <View style={{flexDirection: 'column'}}>
                          <Text style={styles.commentEmailText}>{item.author}</Text>
                          <Text style={styles.commentText}>{item.content}</Text>
                        </View>
                      </View>
                    )}
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
  postAvatar: {
    width: 50,
    height: 50,
    borderRadius: 60,
    marginLeft: 10,
  },
  userIntroView: {
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  userView: {
    flexDirection: 'row',
  },
  commentView: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 40,
  },
  commentEmailText: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  commentText: {
    marginTop: 5,
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 60,
  },
  
  userNameFont: {
    fontSize: 16,
    fontWeight: 'bold',
    //marginBottom: 30,
    marginLeft: 10,
  },

  timeFont: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    
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
    marginLeft: 20,
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
    width: width,

  },



})