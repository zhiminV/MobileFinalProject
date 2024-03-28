import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../Components/SearchBar'
import UserIntro from '../Components/UserIntro';

export default function Search({ navigation }) {

  [users, setUsers] = useState([]);
  function ProfileButtonHandler() {
    navigation.navigate('OtherProfile');
  }

  return (
    <View>
      <SearchBar
        users={users}
        setUsers={setUsers}
      />
      <FlatList
          data={users}
          renderItem={({item}) => {
            return (
              <UserIntro
                username={item}
                navigation={ProfileButtonHandler}
              />
            )
          }}
          style={styles.flatListStyle}
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
    height:300,
  },


})