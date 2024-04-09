import { StyleSheet, Text, View, SafeAreaView,FlatList,TouchableOpacity,Alert, Button,Image,ScrollView} from 'react-native'
import React from 'react'
import PressableButton from '../Components/PressableButton';
import { useEffect,useState } from 'react';
import colors from '../Helpers/colors';
import { fetchInfoById,deleteFromDB} from '../firebase-files/firebaseHelper';
import {auth, database  } from '../firebase-files/firebaseSetup';
import { collection,query, where, getDocs } from 'firebase/firestore'
import { signOut } from "firebase/auth";
import { Ionicons, AntDesign ,Feather} from "@expo/vector-icons";

export default function Profile({navigation}) {
  const [postsCount, setPostsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postHistory, setPostHistory] = useState([]);
  const [userId,setUserId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [Name, setName] = useState("");

  useEffect(() => {
    navigation.setOptions({
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
          <AntDesign name="logout" size={24} color="black" />
        </PressableButton>
        );
      }, 
    }); 
  },[])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Query the "Users" collection to find the document associated with the current user's UID
        const usersCollectionRef = collection(database, "Users");
        const q = query(usersCollectionRef, where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docId = querySnapshot.docs[0].id;    
          const userProfile = await fetchInfoById("Users", docId);
          setUserId(docId);
          setPostHistory(userProfile.post);
          setAvatar(userProfile.userAvatar);
          setName(userProfile.userName);
          setFollowersCount(userProfile.followers.length);
          setFollowingCount(userProfile.following.length);
          setPostsCount(userProfile.post.length);
          
        
        } else {
          console.log("No document found for the current user");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  

  const navigateToPostDetail = (postId) => {
    navigation.navigate('PostDetail', { postId });
  };

  

  const renderPostItem = ({ item }) => (
    <View style={styles.postItemContainer}>
      <PressableButton style={colors.postItem} onPressFunction={() => navigateToPostDetail(item)}>
        <Text>{item}</Text>
      </PressableButton>
    </View>
  );


  function handleEdit(){
    navigation.navigate("EditProfile");

  }
  function handleHistory(){
    console.log("navigate to History")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={120} color="gray" />
          )}
          <Text style={styles.nameText}>{Name}</Text>
          <View style={styles.stats}>
            <Text style={styles.statsItem}>Posts: {postsCount}</Text>
            <Text style={styles.statsItem}>Fans: {followersCount}</Text>
            <Text style={styles.statsItem}>Following: {followingCount}</Text>
          </View>
        </View>
      </View>

      <View style={styles.lineBetween} />

      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <View style={styles.buttonContent}>
          <View style={colors.iconContaner}> 
            <Feather name="edit" size={24} color="green" />
          </View>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.lineBetween} />

      <TouchableOpacity style={styles.button} onPress={handleHistory}>
        <View style={styles.buttonContent}>
          <View style={colors.iconContaner}> 
            <Ionicons name="image-outline" size={24} color="goldenrod" />
          </View>
          <Text style={styles.buttonText}>Post History</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={postHistory}
        renderItem={renderPostItem}
        keyExtractor={(item) => item}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  statsItem: {
    marginHorizontal: 10,
  },
  postItem: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'whitesmoke',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent:"flex-start",
  },
  lineBetween: {
    height: 1,
    width: "100%",
    backgroundColor: 'whitesmoke',
    marginBottom: 5,
    marginTop: 5,
  },
});