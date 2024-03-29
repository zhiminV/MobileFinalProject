import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../Components/SearchBar'
import UserIntro from '../Components/UserIntro';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, database } from '../firebase-files/firebaseSetup';

export default function Search({ navigation }) {

  [users, setUsers] = useState([]);
  [searchText, setSearchText] = useState('');
  [docID, setDocID] = useState('');
  

  [followed, setFollowed] = useState(false);
  /*
  useEffect(() => {
    
    async function search() {

      try {
        setFollowed(false);
        const collectionRef = collection(database, 'Users');
        const query_follow = query(collectionRef, where('uid', '==', auth.currentUser.uid), where('following', 'array-contains', searchText));
        const querySnapshot = await getDocs(query_follow);
        querySnapshot.forEach((doc) => {
          
          //console.log(doc.data());
          if (doc.data()) {
            setFollowed(true);
            setDocID(doc.id);
          }
        });
      } catch (err) {
        console.log("This Error Happened in SearchBar.js", err);
      }
    };

    search();
    search();

  }, [searchText, followed])
  */
 
  return (
    <View>
      <SearchBar
        users={users}
        setUsers={setUsers}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <FlatList
          data={users}
          renderItem={({item}) => {
            return (
              <UserIntro
                username={item}
                followed={followed}
                setFollowed={setFollowed}
                docID={docID}
                email={searchText}
              />
            )
          }}
          style={styles.flatListStyle}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  searchView: {
    flex: 1,
  },
  
  flatListStyle: {
    marginTop: 30,
    height:300,
  },


})