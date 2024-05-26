import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import CategoryPicker from './CategoryPicker';
import CreateNewCategory from './CreateNewCategory';

const FilterModal = ({
  isCategoryModalVisible,
  setIsCategoryModalVisible,
  title,
  setSelectedCategory,
  createItem,
  selectedCategory,
}) => {
  const [createNewCat, setCreateNewCat] = useState(false);
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (createNewCat) {
      fadeIn();
    } else {
      fadeInAnim.setValue(0);
    }
  }, [createNewCat]);

  return (
    <Modal
      visible={isCategoryModalVisible}
      transparent={true}
      animationType="slide"
    >
      <TouchableWithoutFeedback
        onPress={() => {
          setIsCategoryModalVisible(false);
          setCreateNewCat(false);
        }}
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
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ width: '100%', alignItems: 'center' }}
            >
              <View className="bg-white p-6 rounded-md w-[95%]">
                <Text className="text-lg font-semibold">{title}</Text>

                {!createNewCat && (
                  <CategoryPicker
                    setSelectedCategory={setSelectedCategory}
                    createItem={createItem}
                    selectedCategory={selectedCategory}
                    createNewCat={createNewCat}
                    setCreateNewCat={setCreateNewCat}
                  />
                )}

                {createNewCat && (
                  <Animated.View style={{ opacity: fadeInAnim }}>
                    <CreateNewCategory setCreateNewCat={setCreateNewCat} />
                  </Animated.View>
                )}

                {!createNewCat && (
                  <View className="flex-row justify-between gap-4">
                    {createItem && (
                      <TouchableOpacity
                        onPress={() => setCreateNewCat(true)}
                        className="bg-blue-500 h-12 flex-1 rounded-md justify-center items-center mb-4"
                      >
                        <Text className="text-white font-semibold">
                          Add New
                        </Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      onPress={() => setIsCategoryModalVisible(false)}
                      className="bg-green-500 h-12 flex-1 rounded-md justify-center items-center"
                    >
                      <Text className="text-white font-semibold">Select</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;
