import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Profile() {
  return (
    <View>
      
      <View style={styles.followerStyle}>
        <Text>posts</Text>
        <Text>followers</Text>
        <Text>following</Text>
      </View>
    </View>
  )
}

const { width } = Dimensions.get('window');



const styles = StyleSheet.create({
  followerStyle: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },

})