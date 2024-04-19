import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getReactNativePersistence } from 'firebase/auth'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notification({ navigation }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Load notification state from AsyncStorage on component mount
    loadNotificationState();
  }, []);

  const loadNotificationState = async () => {
    try {
      const value = await AsyncStorage.getItem('notificationEnabled');
      if (value !== null) {
        setIsEnabled(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error loading notification state:', error);
    }
  };

  const saveNotificationState = async (value) => {
    try {
      await AsyncStorage.setItem('notificationEnabled', JSON.stringify(value));
    } catch (error) {
      console.error('Error saving notification state:', error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    scheduleNotification(time);
    hideDatePicker();
  };

  const handleCancel = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    setIsEnabled(false);
    saveNotificationState(false); // Save notification state to AsyncStorage
    Alert.alert('Notification Canceled', 'Your daily reminder has been canceled.');
  };

  async function verifyPermission() {
    const settings = await Notifications.getPermissionsAsync();
    if (!settings.granted) {
      return await Notifications.requestPermissionsAsync();
    }
    return settings;
  }

  async function scheduleNotification(time) {
    const permission = await verifyPermission();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'You need to grant notification permissions to use this feature.');
      return;
    }

    // Set the notification to repeat daily at the user's chosen time
    const schedulingOptions = {
      content: {
        title: 'Daily Reminder',
        body: 'Share your happy moment!',
      },
      trigger: {
        hour: time.getHours(),
        minute: time.getMinutes(),
        repeats: true,
      },
    };

    await Notifications.cancelAllScheduledNotificationsAsync(); // Cancel old notifications
    await Notifications.scheduleNotificationAsync(schedulingOptions);
    setIsEnabled(true);
    saveNotificationState(true); // Save notification state to AsyncStorage
    Alert.alert('Notification Set', `You will be notified daily at ${time.getHours()}:${time.getMinutes()}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Set daily reminder to share your moment:</Text>
      <View>
        <Button title="Set Notification" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Button title="Cancel Notification" onPress={handleCancel} disabled={!isEnabled} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
