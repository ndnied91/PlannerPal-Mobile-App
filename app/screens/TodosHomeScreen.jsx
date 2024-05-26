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
    <SafeAreaView className="h-full bg-slate-100 w-screen">
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

      <View className=" flex-row justify-end pr-4">
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

      {/* todo list goes here */}
      <TodoList navigation={navigation} />
      {/* todo list goes here ^^ */}

      {/*  new todo modal and button */}
      <TouchableOpacity
        onPress={() => setPlusIsModalVisible(true)}
        className="mb-10 absolute bottom-0 right-2"
      >
        <Entypo name="add-to-list" size={30} color="black" />
      </TouchableOpacity>
      <AddNewItemModal
        isPlusModalVisible={isPlusModalVisible}
        closeModal={() => setPlusIsModalVisible(false)}
        navigation={navigation}
      />

      {/*  completed todos modal and button */}
      <TouchableOpacity
        onPress={() => setIsCompletedModalVisible(true)}
        className="mb-10 absolute bottom-0 left-2"
      >
        <MaterialIcons name="download-done" size={35} color="green" />
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
