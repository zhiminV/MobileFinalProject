import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAllDocs } from '../firebase-files/firebaseHelper';

export default function Home() {

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
  
    async function getData() {
      
      try {
        
        const posts = await getAllDocs('posts/');
        console.log(posts);
        if (posts.length) {
          setPosts(posts);
        }

      } catch (err) {
        console.log('Failed to Get User Data, ', err);
      }

    }
    getData();
  }, []);


  return (
    <View>
      <Text>xixi</Text>
    </View>
  )
}