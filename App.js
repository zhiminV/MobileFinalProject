import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './Screens/Start';
import colors from './Helpers/colors';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
            screenOptions={{
              headerTintColor: "white",
              headerTitleAlign: 'center',
              headerStyle: colors.hearderColor,
            }}
          >
            <Stack.Screen
              options={{
                headerShown: false,
                headerTitle: "",
              }} 
              name="Start" 
              component={Start} 
            />
            <Stack.Screen
              options={{
                headerShown: false,
                headerTitle: "",
              }} 
              name="SignUp" 
              component={SignUp} 
            />

            <Stack.Screen
              options={{
                headerShown: false,
                headerTitle: "",
              }} 
              name="Login" 
              component={Login} 
            />    

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
