import { StyleSheet, Text, View ,SafeAreaView,ImageBackground} from 'react-native'
import React from 'react'
import PressableButton from '../Components/PressableButton'
import colors from "../Helpers/colors"
import { Image } from 'expo-image';

export default function Start({navigation}) {

    function handleStart(){
        navigation.navigate("SignUp");
    }

  return (
    <ImageBackground source={require("../assets/loginBackground.jpg")} style={styles.container}>
    <View style={styles.textContainer}>
         <Image
            source={require('../assets/WESHARE.png')}
            style={{
                width: 200,
                height: 200,
                marginBottom: 30,
            }}
        />
        {/*<Text style={styles.titleText}>Record</Text>*/}
        {/*<Text style={styles.titleText}>Share</Text>*/}
        {/*<Text style={styles.titleText}>Enjoy</Text>*/}
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
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 25,
      width: 360,
      height:50,
      marginTop:20,
      shadowColor: "#000",
      shadowOffset: {
          width: 2,
          height: 2,
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