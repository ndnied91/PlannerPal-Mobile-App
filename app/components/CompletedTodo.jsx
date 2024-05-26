import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { Fontisto } from '@expo/vector-icons';
import { convertToNormalTime } from '../../utils/utilsFunctions';
import { useGlobalContext } from '../context/GlobalProvider';
import { FontAwesome6 } from '@expo/vector-icons';

const CompletedTodo = ({ item, closeModal }) => {
  const { updateCompletion, deleteTodo } = useGlobalContext();
  return (
    <View>
      <View className="flex-row justify-between p-4 rounded-md shadow-sm bg-gray-200 ">
        <View className="flex-col ">
          <Text>
            {item.title}:{item.id}
          </Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>
            {convertToNormalTime(item.dueDate, 'short')}
          </Text>
        </View>

        <View className="flex-row items-center gap-4">
          <TouchableOpacity
            className="bg-gray-300 p-2 border-2 border-gray-400 rounded-md shadow-md"
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
            className="ml-auto mr-2 justify-center items-center border-2 border-red-500 bg-red-500 rounded-md shadow-md"
            onPress={() => deleteTodo(item.id, closeModal)}
          >
            <View className="flex-row gap-1 p-2 items-center ">
              <Text className="text-xs"> Delete </Text>
              <FontAwesome6 name="trash-can" size={16} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CompletedTodo;
