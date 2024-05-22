import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CategoryPicker from './CategoryPicker';
import NewCategoryModal from './NewCategoryModal';

const FilterModal = ({
  isCategoryModalVisible,
  setIsCategoryModalVisible,
  title,
  setSelectedCategory,
  createItem,
  selectedCategory,
  navigation,
}) => {
  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] =
    useState(false);

  return (
    <Modal
      visible={isCategoryModalVisible}
      transparent={true}
      animationType="slide"
    >
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
        className="flex-1 justify-center items-center z-1"
      >
        <View className="bg-white p-6 rounded-md w-5/6">
          <Text className="">{title}</Text>

          <CategoryPicker
            setSelectedCategory={setSelectedCategory}
            createItem={createItem}
            selectedCategory={selectedCategory}
          />

          <NewCategoryModal
            isNewCategoryModalVisible={isNewCategoryModalVisible}
            setIsNewCategoryModalVisible={setIsNewCategoryModalVisible}
          />

          {createItem && (
            <TouchableOpacity
              onPress={() => setIsNewCategoryModalVisible(true)}
              className="bg-green-500 h-12 rounded-md justify-center items-center mb-4"
            >
              <Text className="font-bold text-lg">Create category</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => setIsCategoryModalVisible(false)}
            className="bg-red-500 h-12 rounded-md justify-center items-center"
          >
            <Text className="font-bold text-lg">Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
