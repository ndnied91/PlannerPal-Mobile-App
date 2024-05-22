import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity } from 'react-native';

import SingleTodo from './SingleTodo';

import AppleStyleSwipeableRow from './AppleStylesSwipeableRow';
import { useGlobalContext } from '../../context/GlobalProvider';

const SwipeableRow = ({ item, index, navigation }) => {
  console.log(navigation);
  return (
    <AppleStyleSwipeableRow>
      <SingleTodo item={item} navigation={navigation} />
    </AppleStyleSwipeableRow>
  );
};

const TodoList = ({ navigation }) => {
  const { sortedTodos } = useGlobalContext();
  return (
    <SafeAreaView>
      <FlatList
        data={sortedTodos}
        ItemSeparatorComponent={() => <View className="m-1" />}
        renderItem={({ item, index }) => (
          <SwipeableRow item={item} index={index} navigation={navigation} />
        )}
        keyExtractor={(item, index) => `message ${index}`}
      />
    </SafeAreaView>
  );
};

export default TodoList;
