import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { useGlobalContext } from '../context/GlobalProvider';

const CategoryPicker = ({
  selectedCategory,
  setSelectedCategory,
  createItem,
}) => {
  const { selectedFilter, setSelectedFilter, categories } = useGlobalContext();

  const handleChange = (category) => {
    if (createItem) {
      setSelectedCategory(category);
    } else {
      setSelectedFilter(category);
    }
  };

  return (
    <View>
      <Picker
        selectedValue={createItem ? selectedCategory : selectedFilter}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue) => handleChange(itemValue)}
      >
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>
    </View>
  );
};

export default CategoryPicker;

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 16,
    color: 'black',
    textTransform: 'capitalize',
  },
});
