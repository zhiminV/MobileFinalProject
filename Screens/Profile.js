import { StyleSheet, Text, View, SafeAreaView,FlatList,TouchableOpacity,Alert, Button,Image,ScrollView} from 'react-native'
import React from 'react'
import PressableButton from '../Components/PressableButton';
import { useEffect,useState } from 'react';
import colors from '../Helpers/colors';
import { fetchInfoById,deleteFromDB, updateFromDB} from '../firebase-files/firebaseHelper';
import {auth, database,storage  } from '../firebase-files/firebaseSetup';
import { collection,query, where, getDocs,onSnapshot } from 'firebase/firestore'
import { signOut } from "firebase/auth";
import { Ionicons, AntDesign ,Feather} from "@expo/vector-icons";
import { getDownloadURL, ref } from "firebase/storage";


export default function Profile({navigation,route}) {
  const [postsCount, setPostsCount] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postHistory, setPostHistory] = useState([]);
  const [userId,setUserId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [Name, setName] = useState("");


  // console.log(route.params.newPosts)
  useEffect(() => {
    let unsubscribeSnapshot;
  
    const fetchData = async () => {
      const q = query(collection(database, "Users"), where("uid", "==", auth.currentUser.uid));
  
      unsubscribeSnapshot = onSnapshot(q, async (querySnapshot) => {
        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0];
          const userProfile = docSnapshot.data();
          setUserId(docSnapshot.id);
          setPostHistory(userProfile.post);
          const imageRef = ref(storage, userProfile.userAvatar);
          try {
            const imageDownloadURL = await getDownloadURL(imageRef);
            // console.log(imageDownloadURL);
            setAvatar(imageDownloadURL || "");
          } catch (error) {
            console.error("Error getting download URL:", error);
          }
          setName(userProfile.userName || "");
          setFollowers(userProfile.followers);
          setFollowingCount(userProfile.following ? userProfile.following.length : 0);
          setPostsCount(userProfile.post ? userProfile.post.length : 0);
        } else {
          console.log("No document found for the current user");
        }
      });
    };
  
    if (auth.currentUser) {
      fetchData();
    }
  
    return () => {
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
      }
    };
  }, [postHistory]);
  

  useEffect(() => {
    if (userId) {
      const fetchFollowersDetails = async () => {
        try {
          const followersQuery = query(
            collection(database, "Users"),
          );
          
          const unsubscribe = onSnapshot(followersQuery, (querySnapshot) => {
            let followersArr = [];
            querySnapshot.forEach((doc) => {
              if(doc.id != userId){
                const userData = doc.data()
                if(userData.following && userData.following.includes(auth.currentUser.uid)){
                  followersArr.push(userData.uid);
                }
              }
            });
    
            // Update the followers state with the new array
            setFollowers(followersArr);
            // Update the followers count
            setFollowersCount(followersArr.length);
    
            // Update the followers array in Firestore
            updateFromDB("Users", userId, { followers: followersArr });
          });
    
          // setFollowersCount(snapshot.docs.length);
          return unsubscribe;
        } catch (error) {
          console.error("Failed to fetch followers:", error);
        }
      };
      fetchFollowersDetails();
    }
  }, [userId]);
  
 


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
// console.log(avatar)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          {avatar ? (
            <Image source={{ uri:avatar}} style={styles.avatarImage} />

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