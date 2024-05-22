import { View, Text } from 'react-native';
import React from 'react';
import TodoDetails from '../components/TodoDetails';

const ItemDetails = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <View>
      <TodoDetails item={item} navigation={navigation} />
    </View>
  );
};

export default ItemDetails;
