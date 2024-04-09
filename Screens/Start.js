import { StyleSheet, Text, View ,SafeAreaView,ImageBackground} from 'react-native'
import React from 'react'
import PressableButton from '../Components/PressableButton'
import colors from "../Helpers/colors"

export default function Start({navigation}) {

    function handleStart(){
        navigation.navigate("SignUp");
    }

  return (
    <ImageBackground source={require("../assets/background.jpeg")} style={styles.container}>
    <View style={styles.textContainer}>
        <Text style={styles.titleText}>Record</Text>
        <Text style={styles.titleText}>Share</Text>
        <Text style={styles.titleText}>Enjoy</Text>
    </View>

    <View style={styles.buttonView}>
        <PressableButton customStyle={styles.startButton} onPressFunction={handleStart}>
            <Text style={styles.buttonText}>Start</Text>
        </PressableButton>
    </View>
</ImageBackground>
);
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  textContainer: {
      marginBottom: 60, 
  },
  titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'mistyrose', 
      textAlign: 'center',
      margin: 10, 
  },
  buttonView: {
      paddingHorizontal: 20,
      width: '100%', 
      alignItems: 'center',
  },
  startButton: {
      backgroundColor: "mediumturquoise", 
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 25,
      shadowColor: "#000",
      width:200,
      height:50,
      shadowOffset: {
          width: 10,
          height: 7,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign:"center"
    
  },
});