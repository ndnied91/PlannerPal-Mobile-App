import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { convertToNormalTime } from '../../utils/utilsFunctions';
import RoundedCheckbox from './MainTodoItems/RoundedCheckbox';
import { Feather } from '@expo/vector-icons';

const OverviewTodo = ({ item, navigation }) => {
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

      <View className="flex-row items-center">
        <RoundedCheckbox item={item} isCompleted={item?.isCompleted || false} />

        <TouchableOpacity
          className="ml-2 flex-row items-center border border-gray-300 bg-gray-100 rounded-lg p-2"
          onPress={() => navigation.navigate('ItemDetails', { item })}
        >
          <Feather name="arrow-right" size={16} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OverviewTodo;
