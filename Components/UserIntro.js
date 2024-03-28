import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import PressableButton from './PressableButton';

export default function UserIntro(props) {



  return (
    <View style={styles.introView}>
      <Text>{props.username}</Text>
      <PressableButton customStyle={styles.confirmButtonStyle} onPressFunction={props.navigation} >
        <Text style={styles.textIntroStyle}>Profile</Text>
      </PressableButton>
    </View>
  )
}

const styles = StyleSheet.create({

  introView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: 200,
  },

  confirmButtonStyle: {
    width: 130,
    height: 30,
    backgroundColor: '#373675', 
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 20,
  },
  textIntroStyle: {
    color: 'white',
  }
});