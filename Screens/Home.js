import { View, Text, FlatList, StyleSheet, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAllDocs } from '../firebase-files/firebaseHelper';
import { auth, database } from '../firebase-files/firebaseSetup';
import TimeLine from '../Components/TimeLine';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Home() {

  const [posts, setPosts] = useState([]);

  const [following, setFollowing] = useState([]);
  const [postID, setPostID] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
          if(!postID.find(post => post.postID === doc.id)){
            const post = doc.data();
            post["postID"] = doc.id;
            console.log(doc.id);
            setPostID(previousItems => [...previousItems, post]);
          }
        });
        }
      } catch (err){
        console.log(err);
      }
    }
    getData();
  }, [refresh])




  return (
    <View>
      <Text>Here are all the Posts docuemnt IDs for this follower's timeline.</Text>
      <FlatList
        data={postID}
        renderItem={({item}) => {
          return (
            <TimeLine
              item={item}
            />
          )
        }}
        style={styles.flatListStyle}
        
      />
      <Button
        title = {'Refresh'}
        onPress={setRefresh}
      />
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