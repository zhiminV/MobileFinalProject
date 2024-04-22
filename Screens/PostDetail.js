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
            // console.log(imageDownloadURL)
            setPosts(userData.post);
          
          } else {
            console.log("Post not found");
          }
        } catch (error) {
          console.error("Error fetching post detail:", error);
        }
      };
    
      fetchPostDetail();
    }, []);
    
  

    useEffect(() => {
      navigation.setOptions({
        headerRight:()=>{
          return<Pressable onPress={deleteFunction}>
          <AntDesign name="delete" size={20} color="black"style={{ padding: 10 }} />
        </Pressable>
        },
      });
    },[posts])

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
            
         
          
           updateFromDB("Users", userId, { post: newPosts });

            //Delete the post from the "Posts" collection
            await deleteFromDB('Posts', postId);
  

            navigation.navigate('Profile');

          } catch (error) {
            console.error('Failed to delete post:', error);
          }
        },
      },
    ]);
  }

  const renderImages = () => {
    if (imageUris.length === 4) {
      return (
        <View style={styles.FourimageContainer}>
          <View style={styles.row}>
            {imageUris.slice(0, 2).map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.image} />
            ))}
          </View>
          <View style={styles.row}>
            {imageUris.slice(2, 4).map((uri, index) => (
              <Image key={index + 2} source={{ uri }} style={styles.image} />
            ))}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.imageContainer}>
          {imageUris.slice(0, 9).map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
        </View>
      );
    }
  };

  const renderTime = () => {
  
    if (time) {
      const date = new Date(time.seconds * 1000); 
      const dateString = date.toLocaleString(); 
      return <Text style={styles.timeText}>{dateString}</Text>;
    } else {
      return null;
    }
  };

return (
  <SafeAreaView style={styles.container}>
      <Text style={styles.descriptionText}>{description}</Text>
        {renderImages()}
        {weather ? (
          <View style={styles.weatherContainer}>
            <Text style={styles.timeText}>{weather}</Text> 
            <Image source={{ uri: weatherIconuri|| 'https://via.placeholder.com/150' }} 
            style={styles.weatherIcon} />
          </View>
        ) : null}

  
        {renderTime()}
        <Text style={styles.timeText}>{postLoc}</Text>

  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  FourimageContainer:{
    flexDirection:"column",
    alignItems: 'center',
    marginLeft: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '100%',
    // padding:10,
   
  },
  image: {
    width: '30%',
    aspectRatio: 1,
    marginVertical: 5,
    marginRight:10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    // marginLeft:10,
  },
  timeText: {
    fontSize: 16,
    color: '#666',
    padding: 10,
  },
  descriptionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    padding: 15,
    marginTop:10,
  },
  locationText:{
    marginLeft:10,
  },
  Fourimage:{
    width: '30%', 
  }
  });