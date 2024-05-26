import React, { useState } from 'react';

import { RectButton } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import RoundedCheckbox from './RoundedCheckbox';

import { convertToNormalTime } from '../../../utils/utilsFunctions';

const SingleTodo = ({ item, navigation }) => {
  return (
    <View>
      <View className="flex-row p-6 !pl-3 !pr-3 rounded-sm shadow bg-gray-200 justify-between">
        <View className="flex-col ">
          <Text>
            {item.title}:{item.id}
          </Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>
            {convertToNormalTime(item.dueDate, 'short')}
          </Text>
        </View>

        <View className="flex-row items-center">
          <RoundedCheckbox
            item={item}
            isCompleted={item?.isCompleted || false}
          />

          <TouchableOpacity
            className="ml-2 justify-center items-center border-2 border-gray-400 bg-gray-300 rounded-md shadow-md"
            onPress={() => navigation.navigate('ItemDetails', { item })}
          >
            <View className="flex-row gap-1 p-2">
              <Text className="text-xs"> Details </Text>
              <Feather name="arrow-right" size={16} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SingleTodo;
