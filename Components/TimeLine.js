import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'


function Post( photos, username ) {
  <View>
    <View>
      <Text>{username}</Text>
    </View>
    <View>
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
  </View>
}

export default function TimeLine( props ) {
  
  return (
    <View>
      <FlatList

      />
    </View>
  )
}