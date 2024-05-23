import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useUser } from '@clerk/clerk-react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { supabase } from '../../utils/SupabaseConfig';
import { useGlobalContext } from '../context/GlobalProvider';
// import TodoItem from './TodoItem';

import SingleTodo from './MainTodoItems/SingleTodo';

const ViewCompletedModal = ({
  isCompletedModalVisible,
  closeModal,
  navigation,
}) => {
  const { sortedTodos, todos, setTodos } = useGlobalContext();

  const completedTodos = sortedTodos.filter((item) => item.isCompleted);

  const handleCheckboxChange = (id) => {
    // Update the state variable to force a rerender
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
    // Increment the forceRerender variable
  };

  const renderItem = ({ item }) => {
    return (
      item.isCompleted && (
        <SingleTodo
          item={item}
          onCheckboxChange={() => handleCheckboxChange(item.id)}
          navigation={navigation}
        />
      )
    );
  };

  return (
    <Modal
      isVisible={isCompletedModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection="down"
      onSwipeComplete={closeModal}
      onBackdropPress={closeModal}
      className="m-0 absolute bottom-[-30%]"
    >
      <View className="bg-white w-screen h-[85%] p-10">
        <Text className="font-bold text-xl text-center">Completed Todos</Text>

        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={todos} // Re-render FlatList when forceRerender changes
        />
      </View>
    </Modal>
  );
};

export default ViewCompletedModal;
