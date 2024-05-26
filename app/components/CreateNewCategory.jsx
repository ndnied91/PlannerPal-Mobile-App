import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalProvider';

const CreateNewCategory = ({ setCreateNewCat }) => {
  const { categories, setCategories, setSelectedFilter } = useGlobalContext();
  const [category, setCategory] = useState('');

  const updateCategories = () => {
    const isDuplicate = (category) => categories.includes(category);

    if (category.length > 0) {
      if (!isDuplicate(category)) {
        setCategories([...categories, category]);
        setSelectedFilter(category);
        setCreateNewCat(false);
      } else {
        Alert.alert('This category already exists!');
      }
    } else {
      Alert.alert('Category can not be empty');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Add new category"
        placeholderTextColor={'grey'}
        className="h-12 pl-4 mt-4 mb-4 w-max border border-gray-400 rounded-md"
        onChangeText={(item) => setCategory(item.trimStart().trimEnd())}
      />

      <View className="flex-row items-center justify-between gap-4">
        <TouchableOpacity
          onPress={() => updateCategories(false)}
          className="flex-1 bg-blue-500 h-12 rounded-md justify-center items-center mb-4"
        >
          <Text className="font-semibold text-white">Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCreateNewCat(false)}
          className="flex-1 bg-red-500 h-12 rounded-md justify-center items-center mb-4"
        >
          <Text className="font-semibold text-white">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateNewCategory;
