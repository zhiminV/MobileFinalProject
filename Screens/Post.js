import { StyleSheet, Text, TextInput, View,Button, ScrollView, Image, TouchableWithoutFeedback, Keyboard,TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
import colors from '../Helpers/colors';
import ImageManerge from '../Components/ImageManerge';
import { writeToDB,updateFromDB,fetchInfoById} from '../firebase-files/firebaseHelper';
import { ref, uploadBytes } from "firebase/storage";
import { storage, auth, database, firestore  } from '../firebase-files/firebaseSetup';
import { serverTimestamp } from 'firebase/firestore';
import { collection,query, where, getDocs } from 'firebase/firestore'
import { EvilIcons ,Feather,Entypo,Ionicons,AntDesign,Fontisto} from '@expo/vector-icons';
import PressableButton from '../Components/PressableButton';
import LocationManager from '../Components/LocationManager';
import axios from 'axios';


export default function Post({navigation}) {
  const [description, setDescription] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [docID, setdocID] = useState("");
  const [postArr, setPostArr] = useState([]);
  const [CurrentLocation, setCurrentLocation] = useState("");
  const[locationData, setLocationData] = useState("");
  const [weatherData, setWeatherData] = useState(null);


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <ImageManerge recieveImageUri={handleImageUri}/>,
    });
  }, []);

  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: { q: locationData ? `${locationData.latitude || 0},${locationData.longitude || 0}` : "auto:ip" },
    headers: {
      'X-RapidAPI-Key': '244355f437msh6306e2a4a1a67e1p140199jsnea9c42e0d2ed',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

 
  const fetchWeather = async () => {
    try {
      const response = await axios.request(options);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Query the "Users" collection to find the document associated with the current user's UID
        const usersCollectionRef = collection(database, "Users");
        const q = query(usersCollectionRef, where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // If a document is found, obtain its document ID and fetch user data using fetchInfoById
          const docId = querySnapshot.docs[0].id;
          // console.log(docId);
          setdocID(docId);
          const userProfile = await fetchInfoById("Users", docId);
          // console.log(userProfile)
          setPostArr(userProfile.post);
        
        } else {
          console.log("No document found for the current user");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


  async function getImageData(uri) {
    try {
      const response = await fetch(uri);
      const imageBlob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytes(imageRef, imageBlob);
      return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log(err);
    }
  }

  const handleImageUri = (uri) => {
    if (imageUris.length < 9) {
      setImageUris(prevImageUris => [...prevImageUris, uri]);
    } else {
      alert('You can only add up to 9 images.');
    }
  };
  
  const handleDeleteImage = (index) => {
    setImageUris(prevImageUris => prevImageUris.filter((_, i) => i !== index));
  };


  function handleReset(){
    setDescription('');
    setImageUris([]);
    setCurrentLocation("");
    setLocationData("");
    setWeatherData(null);
  }

  const handlePost = async () => {
    try {
      const uploadUris = await Promise.all(imageUris.map(uri => getImageData(uri)));
      const timestamp = serverTimestamp();
      const newPost = {
        description: description,
        imageUris: uploadUris?uploadUris:[],
        timestamp: timestamp, 
        userID: auth.currentUser.uid,
        postLocation: {
          location: CurrentLocation,
          latitude: locationData ? locationData.latitude : "", // Check if locationData is available
          longitude: locationData ? locationData.longitude : "" // Check if locationData is available
        },
        weather: {
          icon: weatherData ? `https:${weatherData.current.condition.icon}` : null,
          text: weatherData ? weatherData.current.condition.text : null
        }
      };


      console.log(newPost);

      const docRef = await writeToDB(newPost, "Posts")
      //console.log(docRef.id);
      const postId = docRef.id;

      // Update the user document with the updated postArr
      updateFromDB("Users", docID, { post: [...postArr, postId] });
      //console.log(postArr)

      const comment = {postID: docRef.id, content:[]};
      const commentDocRef = await writeToDB(comment, "Comments");

      // Reset state
      setDescription('');
      setImageUris([]);
      setCurrentLocation(null);
      setLocationData(null);
      setWeatherData(null);
      navigation.navigate("Home");
      
    } catch (error) {
      console.error("Failed to post:", error);
      alert('Failed to add post. Please try again.');
    }
  };

  function handleLocationName(locationName){
    setCurrentLocation(locationName)
  }

  function handleLocationData(locData){
    setLocationData(locData);
  }

  const handleWeather = () => {
    if (!locationData) {
      alert('Please select a location first.');
      return;
    }
    
    fetchWeather();
  };
  


  
 
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <TextInput
            value={description}
            style={[styles.input, { height: 100 }]}
            onChangeText={setDescription}
            multiline
            placeholder="Share your moment..."
          />

          <View style={styles.imageGrid}>
            {imageUris.map((uri, index) => (
              <View style={styles.imageContainer} key={index}>
                <Image source={{ uri }} style={styles.image} />
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteImage(index)}>
                  <AntDesign name="delete" size={10} color="black"/>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <Text style={styles.locationText}>{CurrentLocation}</Text>

          {weatherData && (
            <View style={styles.weatherContainer}>
              <Image
                source={{ uri: `https:${weatherData.current.condition.icon}` }}
                style={styles.weatherIcon}
              />
              <Text style={styles.weatherText}>{weatherData.current.condition.text}</Text>
            </View>
          )}
     
          <TouchableOpacity style={styles.button} onPress={handlePost}>
          <View style={styles.buttonContent}>
            <View style={colors.iconContaner}> 
              <Feather name="send" size={24} color="black" />
            </View>
            <Text style={styles.buttonText}>Post</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} >
          <View style={styles.buttonContent}>
            <View style={colors.iconContaner}> 
              <Entypo name="location-pin" size={24} color="black" />
            </View>

            <LocationManager setLocationNameProp={handleLocationName} setLocationData={handleLocationData}/>

          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleWeather}>
          <View style={styles.buttonContent}>
            <View style={colors.iconContaner}> 
              <Feather name="sun" size={24} color="black" />
            </View>
            <Text style={styles.buttonText}>Weather</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <View style={styles.buttonContent}>
            <View style={colors.iconContaner}> 
             <Fontisto name="arrow-return-left" size={24} color="black" />
            </View>
            <Text style={styles.buttonText}>Reset</Text>
          </View>
        </TouchableOpacity>

      

        </View>
      </TouchableWithoutFeedback>
      
  </ScrollView>
);
}


const styles = StyleSheet.create({
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    marginBottom: 50,
  },
  imageContainer: {
    width: '30%', // Approximately three images per row
    aspectRatio: 1, // Keep the aspect ratio of images to 1:1
    marginBottom: 10,
    margin:5,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: 'whitesmoke',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    width: "100%",
    marginBottom:10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginLeft:10,
    opacity:3,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent:"flex-start",
  },
  locationText:{
    marginBottom:20,
    color:"green",

  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  weatherText: {
    marginLeft: 10,
    fontSize: 16,
    color:"green",
  }

});

