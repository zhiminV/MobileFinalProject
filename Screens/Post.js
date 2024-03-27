import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../Helpers/colors';

export default function Post() {
  const [description, setDescription] = useState("");
  return (
    <View>
      <Text style={colors.text}>Description</Text>
      <TextInput
      value={description}
      style = {[colors.input, { height: 100, width: 300,marginLeft:20}]}
      onChange={(text)=>setDescription(text)}
      />

      



    </View>
  )
}

const styles = StyleSheet.create({})