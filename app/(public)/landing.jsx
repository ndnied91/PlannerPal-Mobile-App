import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const LandingPage = () => {
  return (
    <SafeAreaView className="bg-gray-900 h-full">
      <Text className="text-white text-center text-4xl mt-10 font-bold">
        {' '}
        PlannerPal
      </Text>

      <View className="w-full items-center mt-10">
        <TouchableOpacity
          className="bg-white flex-row items-center justify-center w-1/2 p-6 rounded-xl"
          onPress={() => {
            router.push('/login');
          }}
        >
          <Text className="text-md"> Get started </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
