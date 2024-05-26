import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { useGlobalContext } from '../context/GlobalProvider';

const SortModal = ({ isSortModalVisible, setIsSortModalVisible }) => {
  const { sortOption, setSortOption } = useGlobalContext();

  const handleSortChange = (value) => setSortOption(value);

  const { width: screenWidth } = Dimensions.get('window');
  const pickerWidthPercentage = 80; // Adjust as needed

  return (
    <Modal
      visible={isSortModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsSortModalVisible(false)} // Handle modal close on Android
    >
      <TouchableWithoutFeedback onPress={() => setIsSortModalVisible(false)}>
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        >
          <TouchableWithoutFeedback>
            <View className="bg-white p-4 rounded-md ">
              <Text className="font-semibold tracking-wide pb-2">
                Select Sorting Option:
              </Text>
              <Picker
                selectedValue={sortOption}
                onValueChange={(itemValue) => handleSortChange(itemValue)}
                style={{ width: (screenWidth * pickerWidthPercentage) / 100 }}
              >
                <Picker.Item label="Default" value="default" />
                <Picker.Item label="Alphabetical" value="alphabetical" />
                <Picker.Item label="Due Date" value="dueDate" />
                {/* Add more sorting options as needed */}
              </Picker>

              <TouchableOpacity
                onPress={() => setIsSortModalVisible(false)}
                className="bg-red-500 p-3 rounded-md "
              >
                <Text className="text-center font-semibold text-white">
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SortModal;
