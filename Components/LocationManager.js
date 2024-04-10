import { StyleSheet, Text, View ,Dimensions,Button,Image} from 'react-native'
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
            const locationName = data.results[0].formatted_address;
            setLocationName(locationName);
            setLocationNameProp(locationName);
            setLocationData(location)
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <View>
      <Button title="Location" color="black" onPress={locateUserHandler} />
      {/* {location && (
        <Image
          style={styles.image}
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
          }}
        />
      )} */}
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
});
