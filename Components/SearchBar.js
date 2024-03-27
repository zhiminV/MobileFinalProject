import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';

export default function SearchBar() {

  [search, setSearch] = useState('');

  

  return (
    <View>
      <View>
        <FontAwesome name="search" size={24} color="black" />
      </View>
      <TextInput
        style={}
        placeholder={}
        value={}


      />
    </View>
  )
}