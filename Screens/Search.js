import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../Components/SearchBar'
import UserIntro from '../Components/UserIntro';

export default function Search() {

  [users, setUsers] = useState([]);

  useEffect(() => {
    

  })

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
              />
            )
          }}
        />
    </View>
  )
}

const styles = StyleSheet.create({})