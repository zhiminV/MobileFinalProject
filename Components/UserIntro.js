import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PressableButton from './PressableButton';
import { auth, database } from '../firebase-files/firebaseSetup';
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { updateFromDB } from '../firebase-files/firebaseHelper';

export default function UserIntro(props) {

  [followed, setFollowed] = useState();
  [docID, setDocID] = useState('');
  
  useEffect(() => {
    
    async function search() {

      try {
        const collectionRef = collection(database, 'Users');
        const query_follow = query(collectionRef, where('uid', '==', auth.currentUser.uid), where('following', 'array-contains', props.email));
        const query_user = query(collectionRef, where('uid', '==', auth.currentUser.uid))
        const querySnapshot = await getDocs(query_follow);
        const querySnapshot2 = await getDocs(query_user);
        querySnapshot.forEach((doc) => {
          
          //console.log(doc.data());
          if (doc.data()) {
            //setFollowed(true);
          }
        });

        querySnapshot2.forEach((doc) => {
          
          //console.log(doc.id);
          if (doc.data()) {
            setDocID(doc.id);
          }
        });
      } catch (err) {
        console.log("This Error Happened in SearchBar.js", err);
      }
    };

    search();

  }, [followed])
  
  
 /*
  async function profileButtonHandler() {

    try {
      const collectionRef = collection(database, 'Users');
      const query_follow = query(collectionRef, where('uid', '==', auth.currentUser.uid), where('following', 'array-contains', props.email));
      const querySnapshot = await getDocs(query_follow);
      querySnapshot.forEach(async (doc) => {
        console.log(doc.data());
        console.log(typeof doc);
        if (doc.data()) {
          console.log('xixi');
          
          //await updateDoc(doc(database, 'Users', doc.id), {
           // following: arrayRemove(props.email)})
          setFollowed(false);
          //setDocID(doc.id);
        } else {
          await updateDoc(doc(database, 'Users', doc.id), {
            following: arrayUnion(props.email)});
          setFollowed(true);
          //props.setFollowed(false);}
      }
      });

      console.log(followed);
    } catch (err) {
      console.log(err);
    }

  }
  
*/
  async function followHandler() {
    setFollowed(true);
    await updateDoc(doc(database, 'Users', docID), {
      following: arrayUnion(props.email)});
    
  }

  async function unfollowHandler() {
    setFollowed(false);
    await updateDoc(doc(database, 'Users', docID), {
      following: arrayRemove(props.email)});
  }


  return (
    <View style={styles.introView}>
      <Text>{props.username}</Text>
      {followed ? (
        <PressableButton customStyle={styles.confirmButtonStyle} onPressFunction={unfollowHandler} >
          <Text style={styles.textIntroStyle}>Unfollow</Text>
        </PressableButton>) : (
        <PressableButton customStyle={styles.confirmButtonStyle} onPressFunction={followHandler} >
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