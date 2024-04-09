import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-swiper'
import { collection, getDocs, query, where, whereIn } from 'firebase/firestore'
import { getAllDocs } from '../firebase-files/firebaseHelper'
import { auth, database } from '../firebase-files/firebaseSetup'


export default function TimeLine( props, {navigation}) {

  const post = props.item;
  const photos = post.imageUris;
  console.log(photos);

  return (
    
      <View style={styles.flatListStyle}>
        <Text>{post.postID}</Text>
        <Swiper
          horizontal={true}
          showsButtons={true}
        >
          {
            photos.map((photo, index) => (
              <Image
                source={{uri: photo}}
              />
            ))
          }
        </Swiper>
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
    width: 200,
  },


})