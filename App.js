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
import PressableButton from './Components/PressableButton';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import EditProfile from "./Screens/EditProfile";
import OtherProfile from './Screens/OtherProfile';
import PostDetail from './Screens/PostDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userLogined, setUserLogined] = useState(false);

  useEffect(()=> {
    onAuthStateChanged(auth,(user) =>{
      if(user) {
        setUserLogined(true);
      }
      else{
        setUserLogined(false);
      }
    });
  },[])

  const AuthStack = (
    <> 
    <Stack.Screen
        options={{
          headerShown: false,
          headerTitle: "",
        }} 
        name="Start" 
        component={Start} 
      />
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="SignUp" component={SignUp}/>
    </>
  )
  const AppStack = (
    <>

      <Stack.Screen 
       options={({navigation})=>{
        return{
          headerShown: false,
          headerRight: () => {
            return (
            <PressableButton
              onPressFunction ={()=>{

                try{
                  signOut(auth);
                }
                catch(err){
                  console.log('Error at App.js', err);
                }

              }}
            >
               <AntDesign name="logout" size={24} color="white" />
            </PressableButton>
            );
          },
        }
       
      }}
        name="HomeScreen" 
        component = {TabNavigator}
      /> 

      <Stack.Screen
      name='EditProfile'
      component={EditProfile}
      />
      <Stack.Screen
        name='OtherProfile'
        component={OtherProfile}
      />
      <Stack.Screen
        name='PostDetail'
        component={PostDetail}
      />
    </>
  )

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
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
