import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { onSnapshot, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, database } from '../firebase-files/firebaseSetup';


export default function NearMe({ navigation }) {
  const [postHistory, setPostHistory] = useState([]);
  const [userId, setUserId] = useState("");
  const [postLocations, setPostLocations] = useState([]);
  const [markerInfo, setMarkerInfo] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      const fetchUserData = () => {
        // Assuming auth.currentUser is not null and has a valid uid
        const q = query(collection(database, "Users"), where("uid", "==", auth.currentUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          if (!querySnapshot.empty) {
            const docSnapshot = querySnapshot.docs[0];
            const userProfile = docSnapshot.data();
            setUserId(docSnapshot.id);
            setPostHistory(userProfile.post);

          } else {
            console.log("No document found for the current user");
          }
        });

        return () => unsubscribe();
      };

      const unsubscribe = fetchUserData();
      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      const fetchPostLocations = async () => {
        try {
          let markerData = [];
          // Iterate over each post ID in postHistory
          for (const postId of postHistory) {
            // Fetch post document from Firestore
            const postDocRef = await doc(database, 'Posts', postId);
            const postDocSnap = await getDoc(postDocRef);
            if (postDocSnap.exists()) {
              const postData = postDocSnap.data();
              // Extract latitude and longitude from post data
              let coordinate;
              if (!postData.postLocation.latitude && !postData.postLocation.longitude) {
                coordinate = { latitude: 0, longitude: 0 }
              } else {
                coordinate = { latitude: postData.postLocation.latitude, longitude: postData.postLocation.longitude }
                // Add location to postLocations array
              }
              setPostLocations(prevLocations => [...prevLocations, coordinate]);
              markerData.push({ coordinate, location: postData.postLocation.location });
            }
          }
          setMarkerInfo(markerData);
        } catch (error) {
          console.error('Error fetching post locations:', error);
        }
      };

      // Call fetchPostLocations when postHistory changes
      fetchPostLocations();
    }
  }, [postHistory]);

  return (
    <View style={styles.container}>
      <Text>NearMe</Text>
      <MapView style={styles.map} initialRegion={{ latitude: 49.28852168359985, longitude: -123.13880274881578, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
        {/* Display markers for each post location */}
        {markerInfo.map(({ coordinate, location }, index) => (
          <Marker key={index} coordinate={coordinate}>
            <Callout>
              <Text>{location}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.9,
  },
});
