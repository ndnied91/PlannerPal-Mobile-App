import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { useGlobalContext } from '../context/GlobalProvider';

const SortModal = ({ isSortModalVisible, setIsSortModalVisible }) => {
  const { sortOption, setSortOption } = useGlobalContext();

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  return (
    <Modal
      visible={isSortModalVisible}
      transparent={true}
      animationType="slide"
    >
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
        className="flex-1 justify-center items-center"
      >
        <View
          className="bg-white p-10 rounded-md w-3/4"
          // style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}
        >
          <Text>Select Sorting Option:</Text>
          <Picker
            selectedValue={sortOption}
            onValueChange={(itemValue) => handleSortChange(itemValue)}
            style={{ width: 200 }}
          >
            <Picker.Item label="Default" value="default" />
            <Picker.Item label="Alphabetical" value="alphabetical" />
            <Picker.Item label="Due Date" value="dueDate" />
            {/* Add more sorting options as needed */}
          </Picker>
          <TouchableOpacity onPress={() => setIsSortModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SortModal;
