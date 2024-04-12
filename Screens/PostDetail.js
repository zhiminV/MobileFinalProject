import { StyleSheet, Text, View,Image,Pressable,Alert,SafeAreaView} from 'react-native'
import React, { useEffect,useState } from 'react'
import { fetchInfoById,deleteFromDB} from '../firebase-files/firebaseHelper';
import { AntDesign } from '@expo/vector-icons';
import {auth, database  } from '../firebase-files/firebaseSetup';
import { collection,query, where, getDocs } from 'firebase/firestore'
import { storage } from "../firebase-files/firebaseSetup";
import { getDownloadURL, ref } from "firebase/storage";
import { updateFromDB } from '../firebase-files/firebaseHelper';
import { firebase } from '../firebase-files/firebaseSetup';

export default function PostDetail({route,navigation}) {

    const  {postId,userId} = route.params;
    const [description, setDescription] = useState("");
    const [imageUris, setImageUris] = useState([]);
    const [time, setTime] = useState("");
    const [posts, setPosts] = useState([]);
    const [postLoc,setPostLoc] = useState("");
    const [weather, setWeather] = useState("");
    const [weatherIconuri, setWeatherIconuri] = useState("");


    useEffect(() => {
      const fetchPostDetail = async () => {
          try {
              const postDetailData = await fetchInfoById("Posts", postId);
              const userData = await fetchInfoById("Users", userId);
              if (postDetailData && userData) {
                  setPosts(userData.post)
                  setDescription(postDetailData.description);
                  setTime(postDetailData.timestamp)
                  setPostLoc(postDetailData.postLocation.location? postDetailData.postLocation.location: "")
                  setWeather(postDetailData.weather.text? postDetailData.weather.text:"")
                  setWeatherIconuri(postDetailData.weather.icon? postDetailData.weather.icon:"")
                  //  postDetailData.imageUris is an array of paths in Firebase Storage
                  const imageDownloadURL = await Promise.all(postDetailData.imageUris.map((uri) => 
                      getDownloadURL(ref(storage, uri)) 
                  ));
                  setImageUris(imageDownloadURL);
              } else {
                  console.log("Post not found");
              }
          } catch (error) {
              console.error("Error fetching post detail:", error);
          }
      };
  
      fetchPostDetail();
    }, [postId]);

  useEffect(() => {
    navigation.setOptions({
      headerRight:()=>{
        return<Pressable onPress={deleteFunction}>
        <AntDesign name="delete" size={20} color="black"style={{ padding: 10 }} />
      </Pressable>
      },
    });
  },[postId])

  function deleteFunction() {
    Alert.alert('Delete', 'Are you sure you want to delete this item?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          try {
        
            const newPosts = posts.filter((item) => item !== postId);
            console.log(newPosts)
            setPosts(newPosts);
          
           updateFromDB("Users", userId, { post: newPosts });

            //Delete the post from the "Posts" collection
            // await deleteFromDB('Posts', postId);
  

            navigation.navigate('Profile');

          } catch (error) {
            console.error('Failed to delete post:', error);
          }
        },
      },
    ]);
  }

  const renderImages = () => {
      return (
          <View style={styles.imageContainer}>
              {imageUris.slice(0, 9).map((uri, index) => (
                  <Image key={index} source={{ uri }} style={styles.image} />
              ))}
          </View>
      );
  };
  const renderTime = () => {
  
    if (time) {
      const date = new Date(time.seconds * 1000); 
      const dateString = date.toLocaleString(); 
      return <Text>{dateString}</Text>;
    } else {
      return null;
    }
  };

return (
  <SafeAreaView style={styles.container}>
      <View style={styles.descriptionText}>
        <Text>{description}</Text>
      </View>
        {renderImages()}
        {weather ? (
          <View style={styles.weatherContainer}>
            <Text>{weather}</Text> 
            <Image source={{ uri: weatherIconuri|| 'https://via.placeholder.com/150' }} 
            style={styles.weatherIcon} />
          </View>
        ) : null}

        <View style={styles.timetext}>
          {renderTime()}
        </View>
        <View style={styles.locationText}>
          <Text> {postLoc}</Text>
        </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10,
  },
  image: {
      width: '30%', 
      aspectRatio: 1, 
      margin: '1%', 
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginLeft:10,
  },
  timetext:{
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom:10,
    marginLeft:10,
  },
  descriptionText:{
    fontSize: 30,
    margin:25,
  },
  locationText:{
    marginLeft:10,
  }
  });