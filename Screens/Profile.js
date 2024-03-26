import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase-files/firebaseSetup'
import { Ionicons } from '@expo/vector-icons';
import PressableButton from '../Components/PressableButton';
import { useEffect } from 'react';

export default function Profile() {

  function addImageHandle({navigation}){
    // let user add photo 
  }
 
  return (
    <View style={styles.container}>
      <PressableButton onPressFunction={addImageHandle} style={styles.iconContainer}>
        <Ionicons name="person-add-outline" size={50} color="black" /> 
      </PressableButton>

      <View style={styles.userInfo}>
        <View style={styles.stats}>
          <Text style={styles.statsItem}>Posts: </Text>
          <Text style={styles.statsItem}>Followers: </Text>
          <Text style={styles.statsItem}>Following: </Text>
        </View>
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
    marginRight: 20,
  },
  userInfo: {
    flexDirection: 'column',
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  statsItem: {
    marginRight: 10,
  },
});
