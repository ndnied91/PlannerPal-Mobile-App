import { SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import TodoList from '../components/TodoList';
import AddNewItemModal from '../components/AddNewItemModal';
import ViewCompletedModal from '../components/ViewCompletedModal';

import { Entypo, MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [isPlusModalVisible, setPlusIsModalVisible] = useState(false);
  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);
  return (
    <SafeAreaView>
      <TodoList navigation={navigation} />

      <AddNewItemModal
        isPlusModalVisible={isPlusModalVisible}
        closeModal={() => setPlusIsModalVisible(false)}
        navigation={navigation}
      />

      <ViewCompletedModal
        isCompletedModalVisible={isCompletedModalVisible}
        closeModal={() => setIsCompletedModalVisible(false)}
      />

      <TouchableOpacity
        onPress={() => setPlusIsModalVisible(true)}
        className="absolute bottom-36 right-5 mb-10"
      >
        <Entypo name="add-to-list" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsCompletedModalVisible(true)}
        className="absolute bottom-36 left-5 mb-10"
      >
        <MaterialIcons name="download-done" size={35} color="green" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
