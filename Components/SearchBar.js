import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { database } from '../firebase-files/firebaseSetup';
import { doc, Firestore, where , query, collection, getDoc, getDocs} from 'firebase/firestore';
import { getAllDocs } from '../firebase-files/firebaseHelper';
import UserIntro from './UserIntro';
import { debounce } from "lodash";


export default function SearchBar( props ) {

  [searchText, setSearchText] = useState('');

  async function searchHandler(text) {
    setSearchText(text);
    search(text);
  };

  


  useEffect(() => {
    async function search(command) {

      props.setUsers([]);
  
      try {
        const collectionRef = collection(database, 'Users');
        const result = query(collectionRef, where('email', '==', searchText));
        const querySnapshot = await getDocs(result);
        querySnapshot.forEach((doc) => {
          if (doc.id){
          // doc.data() is never undefined for query doc snapshots
            //_onTextChangeHandler([...users, doc.data().email]);
            props.setUsers([doc.data().email]);
          }
        });
      } catch (err) {
        console.log("This Error Happened in SearchBar.js", err);
      }
      console.log(props.users);
    };
    search(searchText);
  }, [searchText])

  /*
  async function search(command) {

    props.setUsers([]);

    try {
      const collectionRef = collection(database, 'Users');
      const result = query(collectionRef, where('email', '==', searchText));
      const querySnapshot = await getDocs(result);
      querySnapshot.forEach((doc) => {
        if (doc.id){
        // doc.data() is never undefined for query doc snapshots
          //_onTextChangeHandler([...users, doc.data().email]);
          props.setUsers([doc.data().email]);
        }
      });
    } catch (err) {
      console.log("This Error Happened in SearchBar.js", err);
    }
    console.log(props.users);
  };
  */
  //const _onTextChangeHandler = debounce(props.setUsers, 2000, []);

  return (
    <View>
      <View style={styles.searchLogoView}>
        <FontAwesome name="search" size={24} color="black" />
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder={"Enter Email to Search for Users"}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: 300,
    height: 30,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
  },
  searchLogoView: {
    position: 'absolute',
    top: 2,
    left: 320,
  }
});
