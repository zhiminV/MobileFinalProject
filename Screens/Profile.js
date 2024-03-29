import { StyleSheet, Text, View, SafeAreaView,FlatList,TouchableOpacity} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import PressableButton from '../Components/PressableButton';
import { useEffect,useState } from 'react';
import colors from '../Helpers/colors';
import { fetchInfoById} from '../firebase-files/firebaseHelper';
import {auth, database  } from '../firebase-files/firebaseSetup';
import { collection,query, where, getDocs } from 'firebase/firestore'

export default function Profile({navigation}) {
  const [postsCount, setPostsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postHistory, setPostHistory] = useState([]);

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
          setPostHistory(userProfile.post);
          console.log(postHistory);
        
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
    // Navigate to the post detail screen with postId as a parameter
    navigation.navigate('PostDetail', { postId });
  };

  const renderPostItem = ({ item }) => (
    <PressableButton style={colors.postItem} onPress={() => navigateToPostDetail(item.id)}>
      <Text>{item}</Text>
    </PressableButton>
  );



  function addImageHandle(){
    console.log("user can edit profile picture") 
  }
  function handleEdit(){
    console.log("navigate to edit page")
    navigation.navigate("EditProfile");

  }
  function handleNotification(){
    console.log("navigate to notification page")
  }

  function handleHistory(){

  }

 
  return (
    <SafeAreaView style={colors.container}>
      <View style={styles.container}>
      <PressableButton onPressFunction={addImageHandle} style={styles.iconContainer}>
        <Ionicons name="person-add-outline" size={40} color="black" /> 
      </PressableButton>
    

      <View style={styles.userInfo}>
        <View style={styles.stats}>
          <Text style={styles.statsItem}>Posts: {postsCount} </Text>
          <Text style={styles.statsItem}>Fans: {followersCount} </Text>
          <Text style={styles.statsItem}>Following: {followingCount} </Text>
          </View >
      </View >
      </View>
      <View style={colors.buttonsContainer}>
          <View style={colors.buttonView}>
              <PressableButton customStyle={colors.save} onPressFunction={handleEdit}>
                  <Text style={colors.buttonText}>Edit Profile</Text>
              </PressableButton>
          </View>
          <View style={colors.buttonView}>
              <PressableButton customStyle={colors.save} onPressFunction={handleNotification}>
                  <Text style={colors.buttonText}>Notification</Text>
              </PressableButton>
          </View>
      </View>
      <FlatList
      data ={postHistory}
      renderItem ={renderPostItem}
      keyExtractor={(item) => item.id}

      />

    </SafeAreaView>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginRight: 5,
  },
  userInfo: {
    flexDirection: 'column',
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  statsItem: {
    marginRight: 5,
  },
  postItem: {
    padding: 10,
    backgroundColor: "plum",
    borderRadius: 5,
    marginBottom: 10,
    marginTop:10,
  },

});
