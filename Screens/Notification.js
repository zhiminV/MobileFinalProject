import { StyleSheet, Text, View,Button, Alert, TextInput } from 'react-native'
import React from 'react'
import * as Notifications from "expo-notifications";
import { useEffect,useState } from 'react';
import { updateFromDB, writeToDB } from '../firebase-files/firebaseHelper';
import {auth, database  } from '../firebase-files/firebaseSetup';
import { collection,query, where, getDocs,onSnapshot ,documentId} from 'firebase/firestore'

let preCount = 0;
export default function Notification({route,navigation}) {
  const{userId}= route.params;
  const [followersCount, setFollowersCount] = useState(0);
  const [previousFollowersCount, setPreviousFollowersCount] = useState(0);

  useEffect(() => {
    const fetchFollowersDetails = async () => {
      try {
        const followersQuery = query(collection(database, 'Users'), where('uid', '==', auth.currentUser.uid));

        const unsubscribe = onSnapshot(followersQuery, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const currentFollowersCount = userData.followers.length;
            setFollowersCount(() => {
              return currentFollowersCount;
            });
            
            if (followersCount > previousFollowersCount) {
              localNotificationHandler();
            }
            
            setPreviousFollowersCount(() => {
              return followersCount;
            });
            
          

          });
        });

        return unsubscribe; // Return the unsubscribe function directly
      } catch (error) {
        console.error('Failed to fetch followers:', error);
      }
    };

    const unsubscribe = fetchFollowersDetails();

    if (unsubscribe && typeof unsubscribe === 'function') {
      return () => unsubscribe(); 
    }
  }, [followersCount]);


  async function verifyPermission() {
    try {
      const status = await Notifications.getPermissionsAsync();
      console.log(status);
      if (status.granted) {
        return true;
      }
      const permissionResponse = await Notifications.requestPermissionsAsync();
      return permissionResponse.granted;
    } catch (err) {
      console.log(err);
    }
  }

  async function localNotificationHandler() {
      try {
        const havePermission = await verifyPermission();
        if (!havePermission) {
          Alert.alert("You need to give permission for notification");
          return;
        }

        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: "Notification",
            body: "You have a new follower",
          },
          trigger: null,
        });
      } catch (err) {
        console.log(err);
      }
    }

  return (
      <View>
      
        <Text style={styles.info}>Allow notification when you gain a new follower.</Text>

        <Button
          title="Set Notification"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }
    
  const styles = StyleSheet.create({
    text:{
      fontSize: 15,
        marginBottom: 0,
        alignSelf: 'flex-start',
        marginLeft:30,
        marginTop:30,
    },
    input:{
      fontSize: 20,
      borderWidth: 2,
      padding: 10,
      borderRadius: 5,
      width: "85%",   
    }
  });
