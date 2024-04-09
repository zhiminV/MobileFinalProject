import { StyleSheet, Text, View, SafeAreaView,FlatList,TouchableOpacity,Alert, Button,Image} from 'react-native'
import React from 'react'
import PressableButton from '../Components/PressableButton';
import { useEffect,useState } from 'react';
import colors from '../Helpers/colors';
import { fetchInfoById,deleteFromDB} from '../firebase-files/firebaseHelper';
import {auth, database  } from '../firebase-files/firebaseSetup';
import { collection,query, where, getDocs } from 'firebase/firestore'
import { signOut } from "firebase/auth";
import { Ionicons, AntDesign } from "@expo/vector-icons";

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

  function deleteAccount() {
    try {
  
      deleteFromDB("Users", userId)
        .then(() => {
          console.log("User account deleted successfully");
          // Sign out the user after deleting the account
          auth.signOut()
            .then(() => {
              console.log("User signed out successfully");
              // Optionally navigate to a different screen after sign out
            })
            .catch((error) => console.error("Error signing out user:", error));
        })
        .catch((error) => console.error("Error deleting user account:", error));
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  }

 
  return (
    <SafeAreaView style={colors.container}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
              {avatar ? (
                  <Image source={{ uri: avatar }} style={styles.avatarImage} />
              ) : (
                  <Ionicons name="person-circle-outline" size={50} color="gray" />
              )}
             <Text style={styles.nameText}>{Name}</Text>
               <View style={styles.stats}>
                <Text style={styles.statsItem}>Posts: {postsCount} </Text>
                <Text style={styles.statsItem}>Fans: {followersCount} </Text>
                <Text style={styles.statsItem}>Following: {followingCount} </Text>
            </View >
        </View>
    
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
      keyExtractor={(item) => item} 
      />

    <Button title="Delete Account" onPress={deleteAccount} />
      
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
    marginTop:10,
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
  postItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  deleteButton: {
    padding: 10,
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
  },

});
