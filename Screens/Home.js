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

  useEffect(()=> {

    async function getData() {
      try {
        let tempArray = [];
        const collectionRef = collection(database, 'Users');
        const collectionRefPosts = collection(database, 'Posts');
  
        const query_user = query(collectionRef, where('uid', '==', auth.currentUser.uid))
        const querySnapshot = await getDocs(query_user);
        setFollowing(querySnapshot.docs[0].data().following); 
        //console.log(querySnapshot.docs[0].data());

        for (let i = 0; i<following.length; i++) {
          const query_posts = query(collectionRef, where('uid', '==', following[i]));
          const querySnapshotPosts = await getDocs(query_posts);
          //console.log(querySnapshotPosts.docs[0].data());
          querySnapshotPosts.forEach(async (document) => {

            const posts = document.data().post;
            const email = document.data().email;
            const avatar = document.data().userAvatar;
            //console.log(posts);
            for (let j = 0; j < posts.length; j++) {
              if (!tempArray.some(object => object.docId === posts[j])) {
                const result = await fetchInfoById('Posts', posts[j]);
                const imageArray = result.imageUris;
                for (let k = 0; k < imageArray.length; k++) {
                  const imageRef = ref(storage, imageArray[k]);
                  const downloadURL = await getDownloadURL(imageRef);
                  imageArray[k] = downloadURL;
                }
                result['downloadUris'] = imageArray;
              
                result['email'] = email;
                result['avatar'] = avatar;
                //result['downloadUris'] = imageArray;
                //console.log(posts);
                tempArray.push(result);
              

                //console.log(tempArray);
                //setPostID(previousItems => [...previousItems, result]);
              }
              //console.log(j);
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
        setPostID(tempArray);
        //console.log(postID);
        //setPostID(previousItems => [...previousItems, result]);
        //console.log(postID.length);
        //integer = integer + 1;
        //console.log('How many times?', integer);
        //console.log('How many items does this array have?', postID.length);
        //console.log(tempArray);
      } catch (err){
        console.log(err);
      }
    }
    getData();
  }, [refresh]);


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
    height: height * 0.7,
    width: width,
  },


})