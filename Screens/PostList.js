import { FlatList, StyleSheet, Text, View, TouchableOpacity ,ScrollView} from "react-native";
import React, { useState,useEffect} from "react";
import colors from "../Helpers/colors";

export default function PostList({ route, navigation }) {
  const {userId, postHistory } = route.params;
  const [postList, setPostList] = useState(postHistory);
  
  useEffect(() => {
    setPostList(postHistory);
  }, [postHistory]);
  

  const navigateToPostDetail = (postId) => {
    navigation.navigate("PostDetail", { postId, userId });
  };

  const renderPostItem = (item) => (
    <TouchableOpacity key={item} onPress={() => navigateToPostDetail(item)}>
      <View style={styles.postItemContainer}>
        <Text style={styles.postItem}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {postList.map(renderPostItem)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  postItemContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 10,
  },
  postItem: {
    fontSize: 16,
  },
});