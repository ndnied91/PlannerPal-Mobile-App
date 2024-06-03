import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useAuth } from '@clerk/clerk-expo';

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="items-center mb-6">
          {user.profileImageUrl ? (
            <Image
              source={{ uri: user.profileImageUrl }}
              className="w-20 h-20 rounded-full mb-4"
            />
          ) : (
            <View className="w-20 h-20 rounded-full bg-gray-600 items-center justify-center mb-4">
              <Text className="text-white text-2xl">
                {user.firstName[0]}
                {user.lastName[0]}
              </Text>
            </View>
          )}
          <Text className="text-xl font-bold text-gray-900 text-center">
            Good morning, {user.firstName} {user.lastName}!
          </Text>
        </View>

        <View className="mb-6 bg-gray-200 rounded-lg shadow-md">
          <Text className="text-sm mb-1 text-gray-900 p-2">
            First Name: {user.firstName}
          </Text>
          <Text className="text-sm mb-1 text-gray-900 p-2">
            Last Name: {user.lastName}
          </Text>
          <Text className="text-sm mb-3 text-gray-900 p-2">
            Email: {user.primaryEmailAddress.emailAddress}
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            App Features:
          </Text>
          <View className="bg-gray-200 rounded-lg shadow-md">
            <Text className="text-sm mb-1 text-gray-900 p-2">
              • Create and manage todos
            </Text>
            <Text className="text-sm mb-1 text-gray-900 p-2">
              • Set due dates for your tasks
            </Text>
            <Text className="text-sm mb-1 text-gray-900 p-2">
              • Assign priority status to tasks
            </Text>
            <Text className="text-sm mb-1 text-gray-900 p-2">
              • Filter tasks by their assigned background colors
            </Text>
            <Text className="text-sm mb-1 text-gray-900 p-2">
              • View a countdown to task deadlines
            </Text>
            <Text className="text-sm mb-1 text-gray-900 p-2">
              • Swipe to complete or delete tasks
            </Text>
            <Text className="text-sm mb-1 text-gray-900 p-2">
              • User authentication with Clerk
            </Text>
          </View>
        </View>

        <View className="items-center">
          <TouchableOpacity
            className="bg-red-500 p-3 rounded-md w-5/6 items-center shadow-lg"
            onPress={signOut}
          >
            <Text className="text-center text-white tracking-wider">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
