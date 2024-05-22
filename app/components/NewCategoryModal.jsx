import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalProvider';

const NewCategoryModal = ({
  isNewCategoryModalVisible,
  setIsNewCategoryModalVisible,
}) => {
  const { categories, setCategories } = useGlobalContext();
  const [category, setCategory] = useState('');

  const updateCategories = () => {
    if (category.length > 0) {
      setCategories([...categories, category]);
      setIsNewCategoryModalVisible(false);
    } else {
      console.log('category is empty', category);
    }
  };

  return (
    <Modal
      visible={isNewCategoryModalVisible}
      transparent={true}
      animationType="fade"
    >
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
        }}
        className="flex-1 justify-center items-center z-1 "
      >
        <View className="bg-white p-2 m-2 rounded-md w-5/6 h-96 justify-center">
          <View className="">
            <Text className="">Add new category</Text>

            <TextInput
              placeholder="category"
              className="h-12 w-max border"
              onChangeText={setCategory}
            />
          </View>

          <TouchableOpacity
            onPress={() => updateCategories(false)}
            className="bg-green-500 h-12 rounded-md justify-center items-center mt-6"
          >
            <Text className="font-bold text-lg">Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsNewCategoryModalVisible(false)}
            className="bg-red-500 h-12 rounded-md justify-center items-center mt-6"
          >
            <Text className="font-bold text-lg">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NewCategoryModal;

const styles = StyleSheet.create({});
