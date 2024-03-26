import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './Screens/Start';
import colors from './Helpers/colors';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import Home from './Screens/Home';
import TabNavigator from './Components/TabNavigator';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-files/firebaseSetup";
import { useEffect, useState} from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userLogined, setUserLogined] = useState(false);

  useEffect(()=>{
    onAuthStateChanged(auth,(user) =>{
      if(user){
        setUserLogined(true);
      }
      else{
        setUserLogined(false);
      }
    });
  },[])

  const AuthStack = (
    <> 
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="SignUp" component={SignUp}/>
    </>
  )
  const AppStack = (
    <>
      {/* <Stack.Screen
        options={{
          headerShown: false,
          headerTitle: "",
        }} 
        name="Start" 
        component={Start} 
      /> */}

      <Stack.Screen 
        options={({ route }) => {
          return {
            headerTitle: route.params?.tabName,
            headerShown: false,
            headerTitle: "",
          };
        }}
        name="Home" 
        component = {TabNavigator}
      /> 
    </>
  )

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{
          headerStyle: { backgroundColor: "#929" },
          headerTintColor: "white",
        }}
      >
        {userLogined ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
