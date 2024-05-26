// import { View, Text, StyleSheet } from 'react-native';
// import React from 'react';
// import { Picker } from '@react-native-picker/picker';
// import { useGlobalContext } from '../context/GlobalProvider';

// const CategoryPicker = () => {
//   const { selectedFilter, setSelectedFilter, categories } = useGlobalContext();

//   return (
//     <View>
//       <Picker
//         selectedValue={selectedFilter}
//         itemStyle={styles.pickerItem}
//         onValueChange={(itemValue) => setSelectedFilter(itemValue)}
//       >
//         {categories.map((category, index) => (
//           <Picker.Item key={index} label={category} value={category} />
//         ))}
//       </Picker>
//     </View>
//   );
// };

// export default CategoryPicker;

// const styles = StyleSheet.create({
//   pickerItem: {
//     fontSize: 16,
//     color: 'red',
//     textTransform: 'capitalize',
//   },
// });
