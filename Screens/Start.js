import { StyleSheet, Text, View ,SafeAreaView} from 'react-native'
import React from 'react'
import PressableButton from '../Components/PressableButton'
import colors from "../Helpers/colors"

export default function Start({navigation}) {

    function handleStart(){
        navigation.navigate("SignUp");
    }

  return (
    <SafeAreaView style={colors.container}>
      <Text>Record</Text>
      <Text>Share</Text>
      <Text>Enjoy</Text>

      <View style={colors.buttonView}>
        <PressableButton customStyle={colors.save} onPressFunction={handleStart} > 
            <Text style={colors.buttonText}> Start </Text>
        </PressableButton>
      </View>

      </SafeAreaView>
  )
}

const styles = StyleSheet.create({})