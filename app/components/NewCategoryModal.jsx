import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
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
      <TouchableWithoutFeedback
        onPress={() => setIsNewCategoryModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableWithoutFeedback>
            <View className="bg-white p-2 m-2 rounded-md w-5/6 h-96 justify-center">
              <View className="">
                <TextInput
                  placeholder="Add new category"
                  placeholderTextColor={'grey'}
                  className="h-12 pl-4 w-max border"
                  onChangeText={setCategory}
                />
              </View>

              <View className="flex-row justify-between gap-4">
                <TouchableOpacity
                  onPress={() => updateCategories(false)}
                  className="bg-blue-500 h-12 flex-1 rounded-md justify-center items-center mb-4"
                >
                  <Text className="text-white font-semibold">Add</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setIsNewCategoryModalVisible(false)}
                  className="bg-red-500 h-12 flex-1 rounded-md justify-center items-center"
                >
                  <Text className="text-white font-semibold">Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NewCategoryModal;

const styles = StyleSheet.create({});
