import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Button } from 'react-native';

import TodoItem from './TodoItem';
import { useGlobalContext } from '../context/GlobalProvider';
import SortModal from './SortModal';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import FilterModal from './FilterModal';

const TodoList = ({ navigation }) => {
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

  const { error, setTodos, sortedTodos, selectedFilter } = useGlobalContext();

  const check = sortedTodos.some(
    (item) => item.isPriority && item.category === selectedFilter
  );

  const handleCheckboxChange = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const renderNormalItems = ({ item }) => {
    return (
      (selectedFilter !== 'All' ? item.category === selectedFilter : item) &&
      !item.isCompleted &&
      !item.isPriority && (
        <TodoItem
          item={item}
          onCheckboxChange={() => handleCheckboxChange(item.id)}
          navigation={navigation}
        />
      )
    );
  };

  // {check && (

  // )}
  const renderPriorityItems = ({ item }) => {
    return (
      (selectedFilter !== 'All' ? item.category === selectedFilter : item) &&
      !item.isCompleted &&
      item.isPriority && (
        <TodoItem
          item={item}
          onCheckboxChange={() => handleCheckboxChange(item.id)}
          navigation={navigation}
        />
      )
    );
  };

  return (
    <SafeAreaView className="h-screen">
      <SortModal
        isSortModalVisible={isSortModalVisible}
        setIsSortModalVisible={setIsSortModalVisible}
      />
      <FilterModal
        isCategoryModalVisible={isCategoryModalVisible}
        setIsCategoryModalVisible={setIsCategoryModalVisible}
        title={'Filter By'}
      />

      <View className=" flex-row justify-between p-6">
        <Text className="text-center font-bold text-2xl">TodoList</Text>

        <View className="flex-row items-center gap-1">
          <Text
            className="text-gray-500"
            onPress={() => setIsCategoryModalVisible(true)}
          >
            {selectedFilter}
          </Text>
          <Ionicons
            name="filter-circle-sharp"
            size={30}
            color="green"
            onPress={() => setIsCategoryModalVisible(true)}
          />
          <FontAwesome
            name="sort"
            size={30}
            color="green"
            onPress={() => setIsSortModalVisible(true)}
          />
        </View>
      </View>

      {/* priority todo list */}

      {check && (
        <View className="mb-32">
          <Text className="pl-1 font-bold text-lg"> Priority List </Text>
          <View>
            <FlatList
              data={sortedTodos}
              renderItem={renderPriorityItems}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      )}

      {/* todo list */}
      <View className="text-md">
        <Text className="pl-1 font-bold"> Regular List </Text>
        <View>
          <FlatList
            data={sortedTodos}
            renderItem={renderNormalItems}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TodoList;
