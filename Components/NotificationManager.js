import { StyleSheet, Text, View,Button, Alert } from 'react-native'
import React from 'react'
import * as Notifications from "expo-notifications";

export default function NotificationManager() {

    async function verifyPermission() {
        try {
          const status = await Notifications.getPermissionsAsync();
          console.log(status);
          if (status.granted) {
            return true;
          }
          const permissionResponse = await Notifications.requestPermissionsAsync();
          return permissionResponse.granted;
        } catch (err) {
          console.log(err);
        }
      }

    async function localNotificationHandler() {
        try {
          const havePermission = await verifyPermission();
          if (!havePermission) {
            Alert.alert("You need to give permission for notification");
            return;
          }
    
          const id = await Notifications.scheduleNotificationAsync({
            content: {
              title: "Notification",
              body: "You have a new comment/like",
            },
            trigger: { seconds: 3 },
          });
        } catch (err) {
          console.log(err);
        }
      }
    return (
        <View>
          <Button
            title="Notification"
            onPress={localNotificationHandler}
          />
        </View>
      );
}

const styles = StyleSheet.create({})