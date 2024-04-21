import { StyleSheet, Text, View,Dimensions } from 'react-native'
import { useEffect,useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { onSnapshot,collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'; 
import { auth, database } from '../firebase-files/firebaseSetup';


export default function NearMe() {
  const [postHistory, setPostHistory] = useState([]);
  const [userId,setUserId] = useState("");
  const [postLocations, setPostLocations] = useState([]);
  

  // console.log(postHistory)
  //["4W8WfC4cvvbmdAlOutqY", "yiEZRZuswEntLlyy1QHs", "l0zYHfNNY4gmyOaRu28T", "1ZfBu4uytdebDoxwZHvY"]

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
  }, [postHistory]);

  useEffect(() => {
    // Function to fetch post locations and update state
    if (auth.currentUser) {
      const fetchPostLocations = async () => {
      try {
        // Iterate over each post ID in postHistory
        for (const postId of postHistory) {
          // Fetch post document from Firestor
          const postDocRef = await doc(database, 'Posts', postId);
          const postDocSnap = await getDoc(postDocRef);
          if (postDocSnap.exists()) {
            const postData = postDocSnap.data();
            // Extract latitude and longitude from post data
            let coordinate
          
            if(!postData.postLocation.latitude || postData.postLocation.longitude){
              coordinate ={latitude:0,longitude:0} 
            }else{
               coordinate = {latitude: postData.postLocation.latitude, longitude: postData.postLocation.longitude}
              // console.log(typeof latitude)
              // Add location to postLocations arrayr
              
            }
            setPostLocations(prevLocations => [...prevLocations, coordinate]);
          }
        }
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
        {postLocations.map((location, index) => (
           <Marker key={index} coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        
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