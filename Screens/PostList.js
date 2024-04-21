import { FlatList, StyleSheet, Text, View, TouchableOpacity ,Image} from "react-native";
import React, { useState, useEffect} from "react";
import colors from "../Helpers/colors";
import { fetchInfoById } from '../firebase-files/firebaseHelper';
import { storage } from "../firebase-files/firebaseSetup";
import { getDownloadURL, ref } from "firebase/storage";
import { set } from "firebase/database";

export default function PostList({ route, navigation }) {
  const { userId, postHistory } = route.params;
  const [postList, setPostList] = useState(postHistory);
  const [postDetails, setPostDetails] = useState([]);


  useEffect(() => {
    setPostList(postHistory);
  }, []);

// console.log(postDetails)

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const details = [];
        for (const postId of postList) {
          const postDetailData = await fetchInfoById("Posts", postId);
          if (postDetailData.imageUris && postDetailData.imageUris[0]) {
            // Ensure there's a valid path before creating the reference
            const imageRef = ref(storage, postDetailData.imageUris[0]);
            const imageUri = await getDownloadURL(imageRef);
            postDetailData.imageUri = imageUri; // Store the image URI in the post data
          }
            details.push(postDetailData);
        }
        setPostDetails(details);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    fetchPostDetails();
  }, [postList]);

  const navigateToPostDetail = (postId) => {
    navigation.navigate("PostDetail", { postId, userId });
  };

  const renderPostItem = ({ item }) => {
    // Extract the date from the timestamp and format it
    const date = item.timestamp.toDate();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  
    return (
      <TouchableOpacity onPress={() => navigateToPostDetail(item.docId)}>
        <View style={styles.postItemContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
          <View style={styles.detailsContainer}>
            {/* Show only the first 100 characters and then ellipsis */}
            <Text style={styles.postItem} numberOfLines={3} ellipsizeMode="tail">
              {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}
            </Text>
            {item.imageUri && (
              <Image source={{ uri: item.imageUri }} style={styles.image} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={postDetails}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.docId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  postItemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 10,
  },
  dateContainer: {
    width: 80, // Fixed width for the date to ensure consistent layout
    marginRight: 20,
  },
  dateText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1, // Takes remaining space
    justifyContent: 'center', // Centers the content vertically
  },
  postItem: {
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 5,
  },
});
