import { View, Text, FlatList, StyleSheet, Button, Dimensions, SectionList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAllDocs, fetchInfoById } from '../firebase-files/firebaseHelper';
import { auth, database, storage } from '../firebase-files/firebaseSetup';
import TimeLine from '../Components/TimeLine';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Home() {

  
  const [following, setFollowing] = useState([]);
  const [postID, setPostID] = useState([]);
  const [refresh, setRefresh] = useState(false);

  async function getData() {
    try {
      setRefresh(true);
      let tempArray = [];
      const collectionRef = collection(database, 'Users');
      const collectionRefPosts = collection(database, 'Posts');
      //const commentRef = collection(database, 'Comments');

      const query_user = query(collectionRef, where('uid', '==', auth.currentUser.uid))
      const querySnapshot = await getDocs(query_user);
      setFollowing(querySnapshot.docs[0].data().following); 
      //console.log(following);

      for (let i = 0; i<following.length; i++) {
        //console.log(following[i]);
        const query_posts = query(collectionRef, where('uid', '==', following[i]));
        const querySnapshotPosts = await getDocs(query_posts);
        const user = querySnapshotPosts.docs[0].data();
        //console.log(user);

        const posts = user.post;
        const email = user.email;
        const avatar = user.userAvatar;
        const imageRef = ref(storage, avatar);
        url = await getDownloadURL(imageRef);

        for (let j = 0; j < posts.length; j++) {
          if (!tempArray.some(object => object.docId === posts[j])) {
            const result = await fetchInfoById('Posts', posts[j]);
            //console.log(result);
            //const query_comment = query(commentRef, where('postID', '==', result.docId));
            //const querySnapshotComment = await getDocs(query_comment);
            //const comments = querySnapshotComment.docs[0].data();

            const imageArray = result.imageUris;
            for (let k = 0; k < imageArray.length; k++) {
              const imageRef = ref(storage, imageArray[k]);
              const downloadURL = await getDownloadURL(imageRef);
              imageArray[k] = downloadURL;
            }
            result['email'] = email;
            result['avatar'] = url;
            result['downloadUris'] = imageArray;
            //result['comments'] = comments;
            tempArray.push(result);
            //console.log()
            //console.log(tempArray);
          }
        }
        /*
        querySnapshotPosts.forEach(async (document) => {
          //console.log(document.data());
          const posts = document.data().post;
          const email = document.data().email;
          const avatar = document.data().userAvatar;
          const imageRef = ref(storage, avatar);
          url = await getDownloadURL(imageRef);


          for (let j = 0; j < posts.length; j++) {
            if (!tempArray.some(object => object.docId === posts[j])) {
              const result = await fetchInfoById('Posts', posts[j]);
              //console.log(result);
              //const query_comment = query(commentRef, where('postID', '==', result.docId));
              //const querySnapshotComment = await getDocs(query_comment);
              //const comments = querySnapshotComment.docs[0].data();

              const imageArray = result.imageUris;
              for (let k = 0; k < imageArray.length; k++) {
                const imageRef = ref(storage, imageArray[k]);
                const downloadURL = await getDownloadURL(imageRef);
                imageArray[k] = downloadURL;
              }
              result['email'] = email;
              result['avatar'] = url;
              result['downloadUris'] = imageArray;
              //result['comments'] = comments;
              tempArray.push(result);
              //console.log()
              //console.log(tempArray);
            }
          }
        });*/
      }
      
      setPostID(tempArray);
      tempArray.sort((post1, post2) => post2.timestamp.seconds - post1.timestamp.seconds);
      //console.log(tempArray[0].timestamp);
      setRefresh(false);
    } catch (err){
      console.log(err);
    }
  }
  
  useEffect(()=> {

    getData();

  }, []);
  


  function refreshHandler() {
    if (refresh === false) {
      setRefresh(true);
    }
    else {
      setRefresh(false);
    }
  }



  return (
    <View>
      <FlatList
        //key={postID.length}
        refreshing={refresh}
        onRefresh={getData}
        data={postID}
        renderItem={({item}) =>  (
            <TimeLine
              item={item}
            />
          )
        }
        //keyExtractor={(item) => item.docId}
        style={styles.flatListStyle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  
  searchView: {
    flex: 1,
  },
  
  flatListStyle: {
    //marginTop: 30,
    height: height*0.82,
    width: width,
    backgroundColor: 'white',
  },


})