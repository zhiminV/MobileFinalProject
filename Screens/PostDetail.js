import { StyleSheet, Text, View,Image,Pressable,Alert} from 'react-native'
import React, { useEffect,useState } from 'react'
import { fetchInfoById,deleteFromDB} from '../firebase-files/firebaseHelper';
import { AntDesign } from '@expo/vector-icons';
import {auth, database  } from '../firebase-files/firebaseSetup';
import { collection,query, where, getDocs } from 'firebase/firestore'


export default function PostDetail({route,navigation}) {

    const { postId } = route.params;
    const [postDetail, setPostDetail] = useState(null);
    const [description, setDescription] = useState("");
    const [imageUris, setImageUris] = useState([]);

    useEffect(() => {
      navigation.setOptions({
        headerRight:()=>{
          return<Pressable onPress={deleteFunction}>
          <AntDesign name="delete" size={20} color="white"style={{ padding: 10 }} />
        </Pressable>
        },
      });
    },[postId])
  
    function deleteFunction() {
 
    }
  

    useEffect(() => {
      const fetchPostDetail = async () => {
          try {
              const postDetailData = await fetchInfoById("Posts", postId);
              if (postDetailData) {
                setDescription(postDetailData.description);
                setImageUris(postDetailData.imageUris)
              } else {
                  console.log("Post not found");
              }
          } catch (error) {
              console.error("Error fetching post detail:", error);
          }
      };

      fetchPostDetail();
  }, [postId]);

  return (
    <View style={styles.container}>
        <View>
            <Text>Post ID: {postId}</Text>
            <Text>Description: {description}</Text>
            {imageUris.map((uri, index) => (
                <Image key={index} source={{ uri }} style={styles.image} />
            ))}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  image: {
      width: 200,
      height: 200,
      marginVertical: 10,
  },
  });