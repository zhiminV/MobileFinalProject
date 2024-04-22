import { View, Text, TextInput, StyleSheet, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { auth, database } from '../firebase-files/firebaseSetup';
import { doc, Firestore, where , query, collection, getDoc, getDocs} from 'firebase/firestore';
import { getAllDocs } from '../firebase-files/firebaseHelper';
import UserIntro from './UserIntro';
import { debounce } from "lodash";


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function SearchBar( props ) {

  
  [followed, setFollowed] = useState(false);

  async function searchHandler(text) {
    setSearchText(text);
    search(text);
  };

  useEffect(() => {
    
    async function search( command ) {
      props.setUsers([]);
      try {
        const collectionRef = collection(database, 'Users');
        const result = query(collectionRef, where('email', '==', props.searchText));
        
        const querySnapshot = await getDocs(result);

        querySnapshot.forEach((doc) => {
          if (doc.id){
          // doc.data() is never undefined for query doc snapshots
            //_onTextChangeHandler([...users, doc.data().email]);
            const data = {uid: doc.data().uid, email: doc.data().email};
            const tempArray = [];
            tempArray.push(data);
            props.setUsers(tempArray);
          }
        });
        

      } catch (err) {
        console.log("This Error Happened in SearchBar.js", err);
      }
    };
    search(props.searchText);
  }, [props.searchText])

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
      <View style={styles.searchBarView}>
        <View style={styles.searchLogoView}>
          <FontAwesome name="search" size={24} color="#378ef7"/>
        </View>
          <TextInput
            style={styles.textInput}
            placeholder={"Enter Email to Search for Users"}
            value={props.searchText}
            onChangeText={props.setSearchText}
          />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    //alignSelf: 'center',
    height: 40,
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 2,
    width: width* 0.7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    
  },
  searchBarView: {
    marginTop: 20,
    flexDirection: 'row', 
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  searchLogoView: {
    position: 'absolute',
    right: 75,
  }
});
