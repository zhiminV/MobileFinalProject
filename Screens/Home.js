import { View, Text, FlatList, StyleSheet, Button, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAllDocs, fetchInfoById } from '../firebase-files/firebaseHelper';
import { auth, database } from '../firebase-files/firebaseSetup';
import TimeLine from '../Components/TimeLine';
import { collection, getDocs, query, where } from 'firebase/firestore';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Home() {

  const [posts, setPosts] = useState([]);

  const [following, setFollowing] = useState([]);
  const [postID, setPostID] = useState([]);
  const [refresh, setRefresh] = useState(false);

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

        const query_posts = query(collectionRef, where('uid', '==', following[i]));
        const querySnapshotPosts = await getDocs(query_posts);
        
        querySnapshotPosts.forEach(async (document) => {
          const posts = document.data().post;
          for (j = 0; j < posts.length; j++) {
            if(!postID.find(post => post.postID === posts[j])){
              const result = await fetchInfoById('Posts', posts[j]);
              result["postID"] = posts[j];
              setPostID(previousItems => [...previousItems, result]);
            }
          }
          /*
          if(!postID.find(post => post.postID === doc.id)){
            const post = doc.data();
            post["postID"] = doc.id;
            //console.log(doc.id);
            setPostID(previousItems => [...previousItems, post]);
          }
          */
        });
      }
    } catch (err){
      console.log(err);
    }
  }

  useEffect(()=> {
    getData();
  }, []);

  useEffect(()=> {
    getData();
  }, [refresh]);

    //console.log(postID);

  function refreshHandler() {
    if (refresh === false) {
      setRefresh(true);
      setPostID([]);
    }
    else {
      setRefresh(false);
      setPostID([]);
    }
  }


  return (
    <View>
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
        onPress={refreshHandler}
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
    height:height * 0.7,
    width: width,
  },


})