import React, { useState } from 'react';

import { RectButton } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import RoundedCheckbox from './RoundedCheckbox';
import { useGlobalContext } from '../../context/GlobalProvider';
import { convertToNormalTime } from '../../../utils/utilsFunctions';

const SingleTodo = ({ item, navigation }) => {
  const [isCompleted, setIsCompleted] = useState(item.isCompleted);
  // individual todo
  const {} = useGlobalContext();

  return (
    <View>
      <View className="flex-row p-6 rounded-sm shadow bg-gray-200">
        <RoundedCheckbox
          id={item.id}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
          completed={() => setIsCompleted(!isCompleted)}
        />

        <View className="flex-col pl-8">
          <Text>{item.title}</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>
            {convertToNormalTime(item.dueDate, 'short')}
          </Text>
        </View>
        <TouchableOpacity
          className="ml-auto mr-2 justify-center items-center border-2 border-gray-400 bg-gray-300 rounded-md shadow-md"
          onPress={() => navigation.navigate('ItemDetails', { item })}
        >
          <View className="flex-row gap-1 p-2">
            <Text className="text-xs"> Details </Text>
            <Feather name="arrow-right" size={16} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleTodo;
