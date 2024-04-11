import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../Helpers/colors";

export default function PostList({ route, navigation }) {
  const {userId, postHistory } = route.params;

  const navigateToPostDetail = (postId) => {
    navigation.navigate("PostDetail", { postId, userId });
  };

  const renderPostItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToPostDetail(item)}>
      <View style={styles.postItemContainer}>
        <Text style={styles.postItem}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={postHistory}
        renderItem={renderPostItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
