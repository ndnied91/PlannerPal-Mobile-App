import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodosHomeScreen from '../screens/TodosHomeScreen'; // Adjust the import path as necessary
import TestScreen from '../screens/TestScreen';

import ItemDetails from '../screens/ItemDetails';
import { AntDesign } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TodosHomeScreen"
        component={TodosHomeScreen}
        options={{
          headerShown: false,
          headerBackImage: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={{ marginLeft: 20 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ItemDetails"
        component={ItemDetails}
        options={{
          headerTitle: 'Details Page',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen name="TestScreen" component={TestScreen} />
      {/* Add more screens to the stack as needed */}
    </Stack.Navigator>
  );
};

export default HomeStack;
