import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import Carousel from '../components/Carousel';

import { Ionicons } from '@expo/vector-icons';

const LandingPage = ({ navigation }) => {
  const router = useRouter();
  const renderItem = ({ item }) => (
    <View
      className=" p-6 items-center"
      style={{ width: Dimensions.get('window').width }}
    >
      <View className="bg-gray-200 p-5 rounded-lg shadow-lg items-center w-5/6 ">
        <Text className="text-xl font-bold">{item.name}</Text>
        <View className="flex-row items-center mb-2">
          {Array.from({ length: item.rating }, (_, index) => (
            <Ionicons key={index} name="star" size={24} color="#FFD700" />
          ))}
        </View>
        <Text className="text-xs">{item.review}</Text>
      </View>
    </View>
  );

  const reviews = [
    {
      name: 'Alice Johnson',
      rating: 5,
      review:
        'PlannerPal has completely changed the way I manage my tasks. The ability to set priorities and deadlines has helped me stay organized and focused. Highly recommend!',
    },
    {
      name: 'Bob Smith',
      rating: 4,
      review:
        'I love the customization options in PlannerPal. Being able to customize task background colors helps me visually categorize my tasks, making it easier to see what needs to be done.',
    },
    {
      name: 'Charlie Brown',
      rating: 3,
      review:
        'PlannerPal is a solid productivity tool. It syncs seamlessly across my devices, which is great for keeping track of tasks on the go. However, I wish there were more advanced features for power users.',
    },
    {
      name: 'Emily Davis',
      rating: 5,
      review:
        'PlannerPal is a lifesaver! As a busy professional, I rely on it to keep track of all my tasks and deadlines. The sync feature is especially helpful for keeping everything up to date.',
    },
    {
      name: 'Jack Wilson',
      rating: 4,
      review:
        "I've tried several task management apps, but PlannerPal is by far the best. It's intuitive, easy to use, and has all the features I need to stay organized.",
    },
    {
      name: 'Sophia Lee',
      rating: 3,
      review:
        'Overall, I like PlannerPal, but I wish there were more customization options for the user interface. It would be great to be able to personalize the colors and layout more.',
    },
    {
      name: 'Oliver Harris',
      rating: 5,
      review:
        'PlannerPal has been a game changer for me. I love how I can easily organize my tasks and see everything at a glance. The app is simple yet powerful!',
    },
  ];

  return (
    <SafeAreaView className="flex justify-center items-center h-full bg-white p-4">
      <View className="h-[60%] w-full items-center">
        <View className="">
          <Text
            style={{
              fontSize: 45,
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 10,
            }}
          >
            PlannerPal
          </Text>
          <Text className="text-lg text-gray-600 mt-2 text-center">
            Your ultimate tool for staying organized and productive.
          </Text>
        </View>

        <Carousel
          data={reviews}
          renderItem={renderItem}
          slideInterval={3000} // Change slide every 3 seconds
        />

        <TouchableOpacity
          className="bg-blue-600 py-3 px-6 rounded-lg shadow-lg w-4/6"
          onPress={() => {
            router.push('/login');
          }}
        >
          <Text className="text-white text-xl font-semibold tracking-widest text-center ">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
