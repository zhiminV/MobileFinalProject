import { StyleSheet, Text, View, SafeAreaView,FlatList,TouchableOpacity,Alert, Button,Image,ScrollView} from 'react-native'
import React from 'react'
import PressableButton from '../Components/PressableButton';
import { useEffect,useState } from 'react';
import colors from '../Helpers/colors';
import { fetchInfoById,deleteFromDB} from '../firebase-files/firebaseHelper';
import {auth, database  } from '../firebase-files/firebaseSetup';
import { collection,query, where, getDocs,onSnapshot } from 'firebase/firestore'
import { signOut } from "firebase/auth";
import { Ionicons, AntDesign ,Feather} from "@expo/vector-icons";

export default function Profile({navigation,route}) {
  const [postsCount, setPostsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postHistory, setPostHistory] = useState([]);
  const [userId,setUserId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [Name, setName] = useState("");
  const [isSignedOut, setIsSignedOut] = useState(false);
  
  // console.log(route.params.newPosts)
  useEffect(() => {
    const fetchUserData = () => {
      // Assuming auth.currentUser is not null and has a valid uid
      const q = query(collection(database, "Users"), where("uid", "==", auth.currentUser.uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0];
          const userProfile = docSnapshot.data();
          setUserId(docSnapshot.id);
          setPostHistory(userProfile.post);
          setAvatar(userProfile.userAvatar || "");
          setName(userProfile.userName || "");
          setFollowersCount(userProfile.followers ? userProfile.followers.length : 0);
          setFollowingCount(userProfile.following ? userProfile.following.length : 0);
          setPostsCount(userProfile.post ? userProfile.post.length : 0);
        } else {
          console.log("No document found for the current user");
        }
      });

      return () => unsubscribe();
    };
    const unsubscribe = fetchUserData();
    return () => unsubscribe();
  }, [postHistory]);


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


  // const navigateToPostDetail = (postId) => {
  //   navigation.navigate('PostDetail', {postId,userId});
  // };ß

  

  // const renderPostItem = ({ item }) => (
  //   <View style={styles.postItemContainer}>
  //     <PressableButton style={colors.postItem} onPressFunction={() => navigateToPostDetail(item)}>
  //       <Text>{item}</Text>
  //     </PressableButton>
  //   </View>
  // );


  function handleEdit(){
    navigation.navigate("EditProfile");

  }
  function handleNotification(){
    navigation.navigate("Notification")
  }

  function handleHistory(){
    navigation.navigate("PostList", {postHistory,userId})
  }

  function HandledeleteAccount() {
    // Display a confirmation alert
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Yes",
          onPress: () => {
            try {
              deleteFromDB("Users", userId)
                .then(() => {
                  console.log("User account deleted successfully");
                  // Sign out the user after deleting the account
                  signOut(auth)
                    .then(() => {
                      console.log("User signed out successfully");
                      // navigation.navigate("Start"); 
                    })
                    .catch((error) => console.error("Error signing out user:", error));
                })
                .catch((error) => console.error("Error deleting user account:", error));
            } catch (error) {
              console.error("Error deleting user account:", error);
            }
          },
        },
        {
          text: "No",
        },
      ],
      { cancelable: false } // This prevents the alert from being dismissed by tapping outside of the alert dialog
    );
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

      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <View style={styles.buttonContent}>
          <View style={colors.iconContaner}> 
            <Feather name="edit" size={24} color="green" />
          </View>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleNotification}>
        <View style={styles.buttonContent}>
          <View style={colors.iconContaner}> 
          <Ionicons name="notifications" size={24} color="cornflowerblue" />
          </View>
          <Text style={styles.buttonText}>Notification</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleHistory}>
        <View style={styles.buttonContent}>
          <View style={colors.iconContaner}> 
            <Ionicons name="image-outline" size={24} color="goldenrod" />
          </View>
          <Text style={styles.buttonText}>Post History</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={HandledeleteAccount}>
        <View style={styles.buttonContent}>
          <View style={colors.iconContaner}> 
            <AntDesign name="deleteuser" size={24} color="red" />
          </View>
          <Text style={styles.buttonText}>Delete Account</Text>
        </View>
      </TouchableOpacity>

      {/* <FlatList
        data={postHistory}
        renderItem={renderPostItem}
        keyExtractor={(item) => item}
      /> */}
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
    marginBottom:10,
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

});