import { StyleSheet, Text, View ,TouchableOpacity, Alert, Platform, Dimensions, Image} from 'react-native'
import React, { useEffect,useState } from "react";
import * as Location from 'expo-location';
import { mapsApiKey } from "@env";


export default function LocationManager({setLocationNameProp,setLocationData}) {
    const [status, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState(null);
    const [locationName, setLocationName] = useState(null);

    
    useEffect(() => {
        if (location) {
            reverseGeocodeLocation();
        }
    }, [location]);
    async function verifyPermission() {
        if (status.granted) {
          return true;
        }
        try {
          const permissionResponse = await requestPermission();
          return permissionResponse.granted;
        } catch (err) {
          console.log(err);
        }
    }
    async function locateUserHandler() {   
        try {
          const havePermission = await verifyPermission();
          if (!havePermission) {
            Alert.alert("You need to give permission");
            Alert.alert("Permission required", "You need to grant location permission to use this feature.");
            return;
          }
          const receivedLocation = await Location.getCurrentPositionAsync();
          
          setLocation({
            latitude: receivedLocation.coords.latitude,
            longitude: receivedLocation.coords.longitude,
          });
        } catch (err) {
          console.log(err);
        }
    }
    async function reverseGeocodeLocation() {
      try {
          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${mapsApiKey}`);
          const data = await response.json();
          // Extract address components
          const addressComponents = data.results[0].address_components;
          
          // Initialize empty strings for street number and name
          let streetNumber = '';
          let streetName = '';
          
          // Iterate through the address components to find street number and street name
          addressComponents.forEach(component => {
              if (component.types.includes("street_number")) {
                  streetNumber = component.long_name;
              }
              if (component.types.includes("route")) {
                  streetName = component.long_name;
              }
          });
          
          // Combine the street number and name
          const locationName = `${streetNumber}, ${streetName}`;
          
          setLocationName(locationName);
          setLocationNameProp(locationName);
          setLocationData(location);
      } catch (err) {
          console.log(err);
      }
  }
  
  

  return (
    <View >
        <TouchableOpacity
            style={styles.button}
            onPress={locateUserHandler}
        >
            <Text style={styles.buttonText}>Location</Text>
        </TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
  image: { width: Dimensions.get("screen").width, height: 200 },
  buttonText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    padding: 3,
    borderColor: 'black',
    borderRadius: 5
},buttonText: {
  color: Platform.OS === 'ios' ? 'black' : 'black',
  fontSize: 18,
  textAlign: 'center',
  marginLeft:5,
},
});
