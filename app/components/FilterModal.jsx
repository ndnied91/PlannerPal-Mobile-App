import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
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
      <TouchableWithoutFeedback
        onPress={() => setIsCategoryModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableWithoutFeedback>
            <View className="bg-white p-6 rounded-md w-5/6">
              <Text className="text-lg font-semibold">{title}</Text>

              <CategoryPicker
                setSelectedCategory={setSelectedCategory}
                createItem={createItem}
                selectedCategory={selectedCategory}
              />

              <NewCategoryModal
                isNewCategoryModalVisible={isNewCategoryModalVisible}
                setIsNewCategoryModalVisible={setIsNewCategoryModalVisible}
              />

              <View className="flex-row justify-between gap-4">
                {createItem && (
                  <TouchableOpacity
                    onPress={() => setIsNewCategoryModalVisible(true)}
                    className="bg-blue-500 h-12 flex-1 rounded-md justify-center items-center mb-4"
                  >
                    <Text className="text-white font-semibold">Add New</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() => setIsCategoryModalVisible(false)}
                  className="bg-red-500 h-12 flex-1 rounded-md justify-center items-center"
                >
                  <Text className="text-white font-semibold">Select</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;
