import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PressableButton from './PressableButton';
import { auth, database } from '../firebase-files/firebaseSetup';
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { updateFromDB } from '../firebase-files/firebaseHelper';

export default function UserIntro(props) {

  [followed, setFollowed] = useState(false);

  function buttonHandler() {
    if (pressed === true) {
      setPressed(false);
    } else {
      setPressed(true);
    }
  }

  async function profileButtonHandler() {

    try {
      const collectionRef = collection(database, 'Users');
      const query_follow = query(collectionRef, where('uid', '==', auth.currentUser.uid), where('following', 'array-contains', props.email));
      const querySnapshot = await getDocs(query_follow);
      
      querySnapshot.forEach(async (doc) => {
        
        console.log(doc.data());
        if (doc.data()) {
          
          await updateDoc(doc(database, 'Users', props.docID), {
            following: arrayRemove(props.email)})
          setFollowed(false);
          setDocID(doc.id);
        } else {
          await updateDoc(doc(database, 'Users', props.docID), {
            following: arrayUnion(props.email) });
          setFollowed(true);
          //props.setFollowed(false);}
      }
      });

      console.log(followed);
    } catch (err) {
      console.log(err);
    }

  }



  return (
    <View style={styles.introView}>
      <Text>{props.username}</Text>
      {followed ? (
        <PressableButton customStyle={styles.confirmButtonStyle} onPressFunction={profileButtonHandler} >
          <Text style={styles.textIntroStyle}>Unfollow</Text>
        </PressableButton>) : (
        <PressableButton customStyle={styles.confirmButtonStyle} onPressFunction={profileButtonHandler} >
          <Text style={styles.textIntroStyle}>Follow</Text>
        </PressableButton>)
      }
    </View>
  )
}

const styles = StyleSheet.create({

  introView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: 200,
  },

  confirmButtonStyle: {
    width: 130,
    height: 30,
    backgroundColor: '#373675', 
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 20,
  },
  textIntroStyle: {
    color: 'white',
  }
});