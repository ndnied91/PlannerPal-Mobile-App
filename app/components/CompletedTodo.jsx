import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Fontisto } from '@expo/vector-icons';
import { convertToNormalTime } from '../../utils/utilsFunctions';
import { useGlobalContext } from '../context/GlobalProvider';
import { FontAwesome6 } from '@expo/vector-icons';

const CompletedTodo = ({ item, closeModal }) => {
  const { updateCompletion, deleteTodo } = useGlobalContext();

  return (
    <View className="flex-row p-3 bg-white rounded-lg shadow-sm mb-2 border border-gray-300 justify-between items-center">
      <View className="flex-col">
        <Text className="text-lg font-semibold text-gray-800">
          {item.title}
        </Text>
        <Text className="text-sm text-gray-500">
          {convertToNormalTime(item.dueDate, 'short')}
        </Text>
      </View>

      <View className="flex-row items-center gap-4">
        <TouchableOpacity
          className="flex-row items-center border border-gray-300 bg-gray-100 rounded-lg p-2"
          onPress={() =>
            updateCompletion(
              item,
              'Are you sure you want to return item to main todo list?'
            )
          }
        >
          <Fontisto name="arrow-return-left" size={16} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          className="ml-2 flex-row items-center border border-red-500 bg-red-500 rounded-lg p-2"
          onPress={() => deleteTodo(item.id, closeModal)}
        >
          <FontAwesome6 name="trash-can" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CompletedTodo;
