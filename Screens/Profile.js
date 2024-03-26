import { StyleSheet, Text, View, SafeAreaView} from 'react-native'
import React from 'react'
import { auth } from '../firebase-files/firebaseSetup'
import { Ionicons } from '@expo/vector-icons';
import PressableButton from '../Components/PressableButton';
import { useEffect,useState } from 'react';
import colors from '../Helpers/colors';

export default function Profile({navigation}) {
  const [postsCount, setPostsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(()=> {
    //fetch user postsCount,followersCount,followingCount
    
  },[])

  function addImageHandle(){
    console.log("user can edit profile picture") 
  }
  function handleEdit(){
    console.log("navigate to edit page")

  }
  function handleNotification(){
    console.log("navigate to notification page")
  }

 
  return (
    <SafeAreaView style={colors.container}>
      <View style={styles.container}>
      <PressableButton onPressFunction={addImageHandle} style={styles.iconContainer}>
        <Ionicons name="person-add-outline" size={40} color="black" /> 
      </PressableButton>
    

      <View style={styles.userInfo}>
        <View style={styles.stats}>
          <Text style={styles.statsItem}>Posts: {postsCount} </Text>
          <Text style={styles.statsItem}>Fans: {followersCount} </Text>
          <Text style={styles.statsItem}>Following: {followingCount} </Text>
          </View >
      </View >
      </View>
      <View style={colors.buttonsContainer}>
          <View style={colors.buttonView}>
              <PressableButton customStyle={colors.save} onPressFunction={handleEdit}>
                  <Text style={colors.buttonText}>Edit Profile</Text>
              </PressableButton>
          </View>
          <View style={colors.buttonView}>
              <PressableButton customStyle={colors.save} onPressFunction={handleNotification}>
                  <Text style={colors.buttonText}>Notification</Text>
              </PressableButton>
          </View>
      </View>
     
    
    </SafeAreaView>
   
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
