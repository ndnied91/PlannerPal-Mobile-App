import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Alert,
} from 'react-native';

import { Swipeable } from 'react-native-gesture-handler';
import { convertToNormalTime } from '../../utils/utilsFunctions';
import { Feather } from '@expo/vector-icons';
import TodoDetails from './TodoDetails'; // Import the new screen component
import { useGlobalContext } from '../context/GlobalProvider';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '../../utils/SupabaseConfig';
import RoundedCheckbox from './RoundedCheckbox';

const ListItem = ({ item, onCheckboxChange, navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { deleteTodo } = useGlobalContext();
  const [isCompleted, setIsCompleted] = useState(item.isCompleted);

  const updateCompletion = async (updatedState) => {
    onCheckboxChange();
    await supabase
      .from('todos')
      .update({ isCompleted: updatedState })
      .eq('id', item.id)
      .select();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 60, 100, 101],
      outputRange: [0, 0, 0, 100],
    });

    return (
      <Animated.View
        style={{
          transform: [{ translateX: trans }],
          backgroundColor: '#ff6347',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: 75,
          opacity: fadeAnim,
        }}
      >
        <TouchableOpacity onPress={() => deleteTodo(item?.id)}>
          <Feather name="trash-2" size={30} color="black" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      friction={2}
      tension={40}
      onSwipeableWillOpen={fadeIn}
    >
      <View
        className={`flex-row p-6 m-2 rounded-sm shadow ${
          item.isPriority ? 'bg-red-200' : 'bg-gray-200'
        } `}
      >
        <RoundedCheckbox
          updateCompletion={updateCompletion}
          setIsCompleted={setIsCompleted}
          completed={() => setIsCompleted(!isCompleted)}
          isCompleted={isCompleted}
        />

        <View className="flex-col pl-8">
          <Text>{item.title}</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>
            {convertToNormalTime(item.dueDate, 'short')}
          </Text>
        </View>

        <TouchableOpacity
          className="ml-auto mr-[1%] justify-center items-center border-2 border-gray-400 bg-gray-300 rounded-md shadow-md"
          // onPress={handlePress}
          onPress={() => navigation.navigate('ItemDetails', { item })}
        >
          <View className="flex-row gap-1 p-2">
            <Text className="text-xs"> Details </Text>
            <AntDesign name="arrowright" size={16} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      {/* </View> */}
    </Swipeable>
  );
};

export default ListItem;
