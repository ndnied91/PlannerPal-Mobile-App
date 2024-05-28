import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OverviewHomeScreen from '../screens/OverviewHomeScreen'; // Adjust the import path as necessary
import ItemDetails from '../screens/ItemDetails';
import { AntDesign } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OverviewHomeScreen"
        component={OverviewHomeScreen}
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
      {/* Add more screens to the stack as needed */}
    </Stack.Navigator>
  );
};

export default HomeStack;
