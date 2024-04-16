import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NotificationManager from '../Components/NotificationManager';

export default function Notification() {
  return (
    <View style={styles.container}>
      <NotificationManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
