import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { getAllDocs } from '../firebase-files/firebaseHelper';

export default function Home() {

  const [userID, setUserID] = useState('');
  
  useEffect(() => {
    try {
      const posts = await getAllDocs('goals');
    }catch (err) {
      console.log('Failed to Get User Data, ', err);
    }
  });
  return (
    <View>
      <Text>{}</Text>
    </View>
  )
}