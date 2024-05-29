import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import OverviewTodo from './OverviewTodo';

const ViewPastDue = ({ pastDue, navigation }) => {
  const [isPastDueExpanded, setIsPastDueExpanded] = useState(false);
  const heightAnimation = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(heightAnimation, {
      toValue: isPastDueExpanded ? 400 : 50,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [isPastDueExpanded]);

  const renderItem = ({ item }) => (
    <OverviewTodo item={item} navigation={navigation} />
  );

  return (
    <Animated.View
      style={{
        height: heightAnimation,
      }}
      className="bg-red-100 rounded-lg shadow-sm border border-red-500 mb-4 p-2"
    >
      <TouchableOpacity
        activeOpacity={1}
        className={`flex-row justify-between items-center pb-1`}
        onPress={() => setIsPastDueExpanded(!isPastDueExpanded)}
      >
        <Text className="text-lg font-semibold text-red-800">
          Past Due Items
        </Text>

        <Feather
          name={`arrow-${isPastDueExpanded ? 'up' : 'down'}`}
          size={24}
          color="rgb(153 27 27)"
        />
      </TouchableOpacity>

      {pastDue.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={pastDue}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={true}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text className="text-lg text-gray-400 italic text-center">
          No past due items
        </Text>
      )}
    </Animated.View>
  );
};

export default ViewPastDue;
