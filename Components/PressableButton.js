import { StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function PressableButton({customStyle,onPressFunction,children}) {
  return (
    <Pressable
      onPress={onPressFunction}
      style={({ pressed }) => [
        styles.defaultStyle,
        customStyle,
        pressed && styles.pressedButton,
      ]}
    >
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
    defaultStyle: {
      borderRadius: 5,
      padding: 5,
      width:120,
      height:40,
    },
    pressedButton: {
        backgroundColor: "pink",
        opacity: 0.5,
    },
  });