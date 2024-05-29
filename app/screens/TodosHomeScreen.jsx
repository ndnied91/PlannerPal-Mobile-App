import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import AddNewItemModal from '../components/AddNewItemModal';
import ViewCompletedModal from '../components/ViewCompletedModal';

import { Entypo, MaterialIcons } from '@expo/vector-icons';
import SortModal from '../components/SortModal';
import FilterModal from '../components/FilterModal';
import { useGlobalContext } from '../context/GlobalProvider';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import TodoList from '../components/MainTodoItems/TodoList';

const HomeScreen = ({ navigation }) => {
  const [isPlusModalVisible, setPlusIsModalVisible] = useState(false);
  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const { selectedFilter } = useGlobalContext();
  return (
    <SafeAreaView className="h-full bg-gray-50 w-screen">
      <SortModal
        isSortModalVisible={isSortModalVisible}
        setIsSortModalVisible={setIsSortModalVisible}
      />
      <FilterModal
        isCategoryModalVisible={isCategoryModalVisible}
        setIsCategoryModalVisible={setIsCategoryModalVisible}
        title={'Filter By'}
        createItem={false}
      />

      <View className="flex-row justify-end pr-4">
        <View className="flex-row items-center">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setIsCategoryModalVisible(true)}
          >
            <Text className="text-gray-500">{selectedFilter}</Text>
            <Ionicons name="filter-circle-sharp" size={30} color="#228B22" />
          </TouchableOpacity>

          <TouchableOpacity
            className="pl-2"
            onPress={() => setIsSortModalVisible(true)}
          >
            <FontAwesome name="sort" size={30} color="#228B22" />
          </TouchableOpacity>
        </View>
      </View>

      {/* todo list goes here */}
      <TodoList navigation={navigation} />
      {/* todo list goes here ^^ */}

      {/*  new todo modal and button */}
      <TouchableOpacity
        onPress={() => setPlusIsModalVisible(true)}
        className="mb-1 absolute bottom-2 right-2 bg-blue-600 p-3 rounded-full shadow-md"
      >
        <Entypo name="add-to-list" size={30} color="white" />
      </TouchableOpacity>
      <AddNewItemModal
        isPlusModalVisible={isPlusModalVisible}
        closeModal={() => setPlusIsModalVisible(false)}
        navigation={navigation}
      />

      {/*  completed todos modal and button */}
      <TouchableOpacity
        onPress={() => setIsCompletedModalVisible(true)}
        className="mb-1 absolute bottom-2 left-2 bg-green-700 p-3 rounded-full shadow-md"
      >
        <MaterialIcons name="download-done" size={35} color="white" />
      </TouchableOpacity>
      <ViewCompletedModal
        navigation={navigation}
        isCompletedModalVisible={isCompletedModalVisible}
        closeModal={() => setIsCompletedModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
