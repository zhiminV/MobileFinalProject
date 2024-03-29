import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-swiper'
import { collection, getDocs, query, where, whereIn } from 'firebase/firestore'
import { getAllDocs } from '../firebase-files/firebaseHelper'
import { auth, database } from '../firebase-files/firebaseSetup'



function Post( postID ) {

  [photos, setPhotos] = useState([]);
  [username, setName] = useState('');


  useEffect(() => {
    async function getData() {
      try {
        
        const querySnapshot = await getAllDocs(postID);
        querySnapshot.forEach((doc) => {
          console.log(doc);
        });
      } catch (err) {
        console.log(err);
      }
   }
   getData();
  })


  return (
    <View>
      <View>
        <Text>{username}</Text>
      </View>
      <View>
        <Swiper
          horizontal={true}
          showsButtons={true}
        >
          {
            photos.map((photo, index) => (
              <Image
                source={{uri: photo}}
              />
            ))
          }
        </Swiper>
      </View>
    </View>
  )
}

export default function TimeLine( props, {navigation}) {

  const [following, setFollowing] = useState([]);
  const [postID, setPostID] = useState([]);

  /*
  useEffect(()=> {
    async function getData() {
      try {
        const collectionRef = collection(database, 'Users');
        const collectionRefPosts = collection(database, 'Posts');

        const query_user = query(collectionRef, where('uid', '==', auth.currentUser.uid))
        const querySnapshot = await getDocs(query_user);
        querySnapshot.forEach((doc) => {
          setFollowing(doc.data().following); 
        
        });
        for (i = 0; i<following.length; i++) {
          const query_posts = query(collectionRefPosts, where('userID', '==', following[i]));
          const querySnapshotPosts = await getDocs(query_posts);
          querySnapshotPosts.forEach((doc) => {
          if(!postID.includes(doc.id)){
            setPostID(previousItems => [...previousItems, doc.id]);
          }
        });
        }
        /*
        const query_posts = query(collectionRefPosts, where('userID', 'array-contains-any', following));
        const querySnapshotPosts = await getDocs(query_posts);
        querySnapshotPosts.forEach((doc) => {
          setPostID([...oldItems, doc.id]);
        });
        
        console.log(postID)
      
      } catch (err){
        console.log(err);
      }
    }
    getData()
  }, [navigation]) */



  return (
    <View>
      
    </View>
  )
}


const styles = StyleSheet.create({
  searchView: {
    flex: 1,
  },
  
  flatListStyle: {
    marginTop: 30,
    height:300,
  },


})