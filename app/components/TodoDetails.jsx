import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { CheckBox } from '@rneui/themed';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { convertToNormalTime, hexToRgba } from '../../utils/utilsFunctions';
import { FontAwesome5, FontAwesome6, Feather } from '@expo/vector-icons';

import { supabase } from '../../utils/SupabaseConfig';
import { useGlobalContext } from '../context/GlobalProvider';
import CountdownComponent from './CountdownComponent';
import ColorPicker from './ColorPicker';

const TodoDetails = ({ item, navigation }) => {
  const { fetchTodos, updateCompletion, deleteTodo } = useGlobalContext();

  const [itemDetails, setItemDetails] = useState({
    title: item.title,
    body: item.body,
    isPriority: item.isPriority,
  });

  const [selectedDate, setSelectedDate] = useState(new Date(item?.dueDate));
  const [showPicker, setShowPicker] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [targetDate, setTargetDate] = useState(selectedDate);
  const [selectedColor, setSelectedColor] = useState(item.bg_color || null);

  console.log(isEditable);

  const handleDateChange = (event, date) => {
    setShowPicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleInputChange = (name, text) => {
    setItemDetails({
      ...itemDetails,
      [name]: text,
    });
  };

  const handleCheckboxChange = () => {
    setItemDetails({
      ...itemDetails,
      isPriority: !itemDetails.isPriority,
    });
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({
          isPriority: itemDetails.isPriority,
          title: itemDetails.title,
          body: itemDetails.body,
          dueDate: selectedDate,
          bg_color: selectedColor,
        })
        .eq('id', item.id)
        .select();

      if (!error) {
        Alert.alert('Item successfully updated!');
        fetchTodos();
        navigation.goBack();
      }
    } catch (e) {
      Alert(e);
    }
  };

  const backgroundColor =
    item.bg_color !== null
      ? hexToRgba(item.bg_color, 0.5)
      : 'rgba(255, 255, 255, 0.5)';

  return (
    <View className="flex-1">
      <SafeAreaView className="bg-gray-100 h-screen w-screen">
        <ScrollView scrollEnabled={false}>
          <View className="flex-1">
            {/* main content */}
            <View className="p-4">
              <Text className="font-bold text-xl text-center">
                Todo Details Page
              </Text>

              <View className="flex-row justify-center">
                <CountdownComponent targetDate={targetDate} />
              </View>

              <View
                className=" rounded-md p-4"
                style={{
                  borderColor:
                    item.bg_color !== null ? item.bg_color : '#E0E0E0',
                  backgroundColor: backgroundColor,
                }}
              >
                {/* background would go here, idk if I wanna do it */}
                <TouchableOpacity
                  className=" items-end"
                  onPress={() => setIsEditable(!isEditable)}
                >
                  <FontAwesome5 name="pencil-alt" size={24} color="black" />
                </TouchableOpacity>

                <View className="flex-row">
                  <Text className="text-xs text-gray-500">Title: </Text>
                </View>

                <TextInput
                  className={`${
                    isEditable ? ' border-gray-300 ' : 'border-transparent'
                  } border rounded p-2 mb-2`}
                  placeholder="Title"
                  editable={isEditable}
                  value={itemDetails.title}
                  onChangeText={(text) => handleInputChange('title', text)}
                />

                <View className="flex-row">
                  <Text className="text-xs text-gray-500">Body: </Text>
                </View>
                <TextInput
                  className={`${
                    isEditable ? ' border-gray-300 ' : 'border-transparent'
                  } border rounded p-2 mb-2`}
                  placeholder="Body"
                  editable={isEditable}
                  multiline={true}
                  numberOfLines={4}
                  value={itemDetails.body}
                  onChangeText={(text) => handleInputChange('body', text)}
                />

                <View className="flex-row mb-2 ">
                  <Text className=" text-gray-500">Priority Item:</Text>
                  <View className="pl-1">
                    <Text>
                      {!isEditable ? (
                        itemDetails.isPriority ? (
                          <Feather name="check" size={20} color="green" />
                        ) : (
                          <Feather name="x" size={20} color="red" />
                        )
                      ) : (
                        <CheckBox
                          onPress={handleCheckboxChange}
                          checked={itemDetails.isPriority}
                          iconType="material-community"
                          checkedIcon="checkbox-outline"
                          uncheckedIcon="checkbox-blank-outline"
                          size={30}
                          containerStyle={{
                            padding: 0,
                            paddingTop: 0,
                            margin: 0,
                            width: 0,
                          }}
                        />
                      )}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  className={`items-start`}
                  onPress={() => setShowPicker(false)}
                >
                  <TouchableOpacity onPress={() => setShowPicker(true)}>
                    <View
                      className={`${
                        isEditable ? 'invisible' : 'visible'
                      } flex-row`}
                    >
                      <Text className="text-xs text-gray-500 pb-2">
                        Due Date:
                      </Text>
                    </View>
                    <Text
                      className={`${isEditable ? 'hidden' : 'visible pl-2'} `}
                    >
                      {convertToNormalTime(selectedDate)}
                    </Text>
                  </TouchableOpacity>
                  {isEditable ? (
                    <DateTimePicker
                      value={selectedDate}
                      mode="datetime"
                      display="clock"
                      onChange={handleDateChange}
                    />
                  ) : null}
                </TouchableOpacity>

                <View className="mt-4">
                  <ColorPicker
                    itemDetails
                    isEditable={isEditable} // user is currently editing the todo
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                  />
                </View>
              </View>
            </View>
          </View>
          {isEditable && (
            <TouchableOpacity
              className="bg-green-500 w-64 self-center p-4 mb-10 rounded-xl shadow-xl"
              onPress={handleSubmit}
            >
              <Text className="text-center">Update Item</Text>
            </TouchableOpacity>
          )}

          {!isEditable && (
            <View className="flex-row justify-around items-center gap-4 p-6 ">
              <TouchableOpacity
                className="bg-green-400 p-2 flex-1 rounded-md flex-row items-center justify-center shadow-md"
                onPress={() =>
                  updateCompletion(
                    item,
                    'Are you sure you want to mark this item as complete?'
                  )
                }
              >
                <Feather name="check-circle" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-500 p-2 flex-1 rounded-md flex-row items-center justify-center shadow-md"
                onPress={() => deleteTodo(item.id, navigation.goBack)}
              >
                <FontAwesome6 name="trash-can" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TodoDetails;
