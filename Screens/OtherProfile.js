import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '../Components/SearchBar';
import colors from '../Helpers/colors';
import PressableButton from '../Components/PressableButton';
import { Ionicons } from '@expo/vector-icons';
import TimeLine from '../Components/TimeLine';


export default function OtherProfile( {route} ) {
  
  const [postsCount, setPostsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  function addImageHandle(){
    console.log("user can edit profile picture");
  }

  const imageArray = ["https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg", 
  "https://www.gettyimages.ca/gi-resources/images/500px/983794168.jpg", "https://www.befunky.com/images/prismic/1f427434-7ca0-46b2-b5d1-7d31843859b6_funky-focus-red-flower-field-after.jpeg?auto=avif,webp&format=jpg&width=863"];

  const userArray = ['Europe', 'USA', 'Canada'];



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
      <View>
        <TimeLine
          data={imageArray}
          userData={userArray}
        />
      </View >
      
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