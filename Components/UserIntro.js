import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PressableButton from './PressableButton';
import { auth, database } from '../firebase-files/firebaseSetup';
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { updateFromDB } from '../firebase-files/firebaseHelper';

export default function UserIntro(props) {

  [followed, setFollowed] = useState(false);
  [documentID, setDocID] = useState('');
  [pressed, setPressed] = useState(false);
  
  useEffect(() => {
    
    async function search() {

      try {
        const collectionRef = collection(database, 'Users');
        const query_follow = query(collectionRef, where('uid', '==', auth.currentUser.uid), where('following', 'array-contains', props.email));
        const query_user = query(collectionRef, where('uid', '==', auth.currentUser.uid))
        const querySnapshot = await getDocs(query_follow);
        const querySnapshot2 = await getDocs(query_user);
        
        /*
        querySnapshot.forEach((doc) => {
          
          //console.log(doc.data());
          if (doc.data()) {
            setFollowed(true);
            //setFollowed(true);
          }
        });
        */

        querySnapshot2.forEach((doc) => {
          const following = doc.data().following;
          if (following.includes(props.username.uid)) {
            setFollowed(true);
          } else {
            setFollowed(false);
          }

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

  }, [props.email, pressed]);
  
  
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
    let uid = '';
    //setFollowed(true);
    setPressed(!pressed);
    const collectionRef = collection(database, 'Users');
    const query_user = query(collectionRef, where('email', '==', props.email));
    const querySnapshot2 = await getDocs(query_user);
    querySnapshot2.forEach(
      (doc) => {
        uid = doc.data().uid;
      }
    )
    await updateDoc(doc(database, 'Users', documentID), {
      following: arrayUnion(uid)});
    
  }

  async function unfollowHandler() {
    let uid = ''
    //setFollowed(true);
    setPressed(!pressed);
    const collectionRef = collection(database, 'Users');
    const query_user = query(collectionRef, where('email', '==', props.email));
    const querySnapshot2 = await getDocs(query_user);
    querySnapshot2.forEach(
      (doc) => {
        uid = doc.data().uid;
      }
    )
    setFollowed(false);
    await updateDoc(doc(database, 'Users', documentID), {
      following: arrayRemove(uid)});
  }


  return (
    <View style={styles.introView}>
      <Text style={styles.emailStyle}>{props.username.email}</Text>
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
    alignItems: 'center',
  },
  emailStyle: {
    fontWeight: 'bold',
  },
  confirmButtonStyle: {
    backgroundColor: '#378ef7',
    borderRadius:20,
    width: 80,
    marginLeft: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIntroStyle: {
    color: 'white',
  }
});