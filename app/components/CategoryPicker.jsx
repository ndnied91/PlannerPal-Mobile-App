import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
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
      //here if the component is just filtering and not creating a new category
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
