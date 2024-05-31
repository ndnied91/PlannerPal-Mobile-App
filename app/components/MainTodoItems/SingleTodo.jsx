import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import RoundedCheckbox from './RoundedCheckbox';
import { convertToNormalTime } from '../../../utils/utilsFunctions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SingleTodo = ({ item, navigation, searchBar }) => {
  if (!searchBar) {
    return (
      <View
        className={`flex-row p-3 rounded-lg shadow-sm mb-2 border justify-between items-center`}
        style={{
          borderColor: item.bg_color !== null ? item.bg_color : '#E0E0E0',
          backgroundColor: item.bg_color !== null ? item.bg_color : 'white',
        }}
      >
        <View className="flex-col">
          <Text className="text-lg font-semibold text-gray-800">
            {item.title}
          </Text>
          <Text className="text-sm text-gray-500">
            {convertToNormalTime(item.dueDate, 'short')}
          </Text>
        </View>

        <View className="flex-row items-center">
          <RoundedCheckbox
            item={item}
            isCompleted={item?.isCompleted || false}
          />

          <TouchableOpacity
            className="ml-2 flex-row items-center border border-gray-300 bg-gray-100 rounded-lg p-2"
            onPress={() => navigation.navigate('ItemDetails', { item })}
          >
            <Text className="text-gray-600"> Details </Text>
            <Feather name="arrow-right" size={16} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ItemDetails', { item })}
          className={`flex-row p-3 m-0.5 rounded-md justify-between items-center `}
          style={{
            backgroundColor: item.bg_color !== null ? item.bg_color : 'white',
          }}
        >
          <View className="flex-row items-center justify-between w-full">
            <Text className="text-lg font-semibold text-gray-800">
              {item.title}
            </Text>
            <Text className="text-sm text-gray-500">
              {convertToNormalTime(item.dueDate, 'short')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

export default SingleTodo;
