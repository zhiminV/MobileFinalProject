import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase-files/firebaseSetup'
import { Ionicons } from '@expo/vector-icons';
import PressableButton from '../Components/PressableButton';
import { useEffect,useState } from 'react';

export default function Profile() {
  const [postsCount, setPostsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(()=> {
    //fetch user postsCount,followersCount,followingCount
    
  },[])

  function addImageHandle(){
    // let user add photo 
  }

 
  return (
    <View style={styles.container}>
      <PressableButton onPressFunction={addImageHandle} style={styles.iconContainer}>
        <Ionicons name="person-add-outline" size={40} color="black" /> 
      </PressableButton>

      <View style={styles.userInfo}>
        <View style={styles.stats}>
          <Text style={styles.statsItem}>Posts: {postsCount} </Text>
          <Text style={styles.statsItem}>Fans:  {followersCount} </Text>
          <Text style={styles.statsItem}>Following: {followingCount} </Text>
          
      </View >
        <Text>Name: </Text>
        <Text>Email: {auth.currentUser.email}</Text>
        <Text>UID: {auth.currentUser.uid}</Text>
        
      </View>
    </View>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginRight: 5,
  },
  userInfo: {
    flexDirection: 'column',
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  statsItem: {
    marginRight: 5,
  },
});
