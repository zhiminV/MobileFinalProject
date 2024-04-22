import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import colors from '../Helpers/colors';

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
      <Text style={styles.title}>Share your happy moments every day</Text>
      {/* <Text style={styles.info}>Share your happy moments every day!</Text> */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={showDatePicker} style={[colors.login, styles.button,{ marginLeft: 25 }]}>
          <Text style={styles.buttonText}>Set Notification</Text>
        </TouchableOpacity>
        {isEnabled && (
          <Ionicons name="checkmark-done-circle" size={24} color="plum" style={{ marginTop: 50 }} />
         
        )}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      {isEnabled && (
        <TouchableOpacity
          onPress={handleCancel}
          disabled={!isEnabled}
          style={[styles.button ,{backgroundColor:"lightcoral"}]}
        >
          <Text style={styles.buttonText}>Cancel Notification</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    // paddingVertical: 12,
    // paddingHorizontal: 20,
    borderRadius: 25,
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancle:{
    color:"red",
    fontSize: 16,
    // fontWeight: 'bold',
    shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  }
});
