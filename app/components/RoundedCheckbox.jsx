import React from 'react';
import { TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Assuming you're using Expo

const RoundedCheckbox = ({
  completed,
  isCompleted,
  setIsCompleted,
  updateCompletion,
}) => {
  return (
    <TouchableOpacity
      className=""
      onPress={() => {
        Alert.alert(
          'Confirm Action',
          'Are you sure you want to make as complete?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'OK',
              onPress: () => {
                setIsCompleted(!isCompleted);
                updateCompletion(!isCompleted);
              },
            },
          ]
        );
      }}
    >
      <View className="w-7 h-7 rounded-full border-2 border-black items-center justify-center relative">
        {isCompleted && (
          <MaterialCommunityIcons
            name="check"
            size={28}
            color="red"
            right={1.5}
            top={0}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RoundedCheckbox;
