import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Button,
  Alert,
} from 'react-native';
import { useUser } from '@clerk/clerk-react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { supabase } from '../../utils/SupabaseConfig';
import { useGlobalContext } from '../context/GlobalProvider';
import FilterModal from './FilterModal';

const AddNewItemModal = ({ isPlusModalVisible, closeModal, navigation }) => {
  const { fetchTodos } = useGlobalContext();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleDateChange = (event, date) => {
    setShowPicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const showDatePicker = () => setShowPicker(true);

  const handleInputChange = (name, text) => {
    setFormData({
      ...formData,
      [name]: text,
    });
  };

  const resetFormState = () => {
    setFormData('title', '');
    setFormData('body', '');
    setSelectedCategory('');
    setSelectedDate(new Date());
    setShowPicker(false);
  };

  const handleSubmit = async () => {
    if (formData.title !== '' || formData.body !== '') {
      if (selectedCategory === '') setSelectedCategory('All');
      try {
        const { data, error } = await supabase
          .from('todos')
          .insert([
            {
              created_by: user.primaryEmailAddress.emailAddress,
              isPriority: false,
              title: formData.title,
              body: formData.body,
              isCompleted: false,
              dueDate: selectedDate,
              category: selectedCategory,
            },
          ])
          .select();

        fetchTodos();

        resetFormState();
        closeModal();

        if (data) {
          Alert.alert('Todo successfully created!');
        }

        if (error) {
          console.log('Supabase error:', error);
        }
      } catch (e) {
        console.log('Catch error:', e);
      }
    } else {
      Alert.alert("Title or body can't be empty");
    }
  };

  const modalProps = isCategoryModalVisible ? {} : { swipeDirection: 'down' }; // Set your default swipe direction or use a prop to determine the direction

  return (
    <Modal
      isVisible={isPlusModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onSwipeComplete={closeModal}
      onBackdropPress={closeModal}
      {...modalProps}
      className="m-0 absolute bottom-[-15%]"
    >
      <View className="bg-white w-screen h-[75%] p-10">
        <Text className="font-bold text-xl text-center">Add new todo</Text>

        <View>
          <TextInput
            className="border border-gray-300 rounded p-2 mb-2"
            placeholder="Title"
            value={formData.title}
            onChangeText={(text) => handleInputChange('title', text)}
          />

          <TextInput
            className="border border-gray-300 rounded p-2 mb-2"
            placeholder="Body"
            multiline={true}
            numberOfLines={4}
            value={formData.body}
            onChangeText={(text) => handleInputChange('body', text)}
          />

          <View className={`self-start `}>
            <DateTimePicker
              value={selectedDate}
              mode="datetime"
              display="clock"
              onChange={handleDateChange}
            />
            {/* )} */}
          </View>

          <TouchableOpacity
            onPress={() => setIsCategoryModalVisible(true)}
            className="p-2 m-2 mb-12 bg-red-300 w-32 rounded-lg shadow-md"
          >
            <Text>
              {' '}
              {selectedCategory ? selectedCategory : 'Select Category'}{' '}
            </Text>
          </TouchableOpacity>

          <FilterModal
            isCategoryModalVisible={isCategoryModalVisible}
            setIsCategoryModalVisible={setIsCategoryModalVisible}
            setSelectedCategory={setSelectedCategory}
            title={'Select a category'}
            createItem={true}
            selectedCategory={selectedCategory}
            navigation={navigation}
          />

          <TouchableOpacity
            className="bg-green-500 p-4 rounded-lg"
            onPress={handleSubmit}
          >
            <Text className="text-center font-bold tracking-wider">
              {' '}
              Create todo{' '}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="mt-48"
          style={{ backgroundColor: 'red', padding: 10, borderRadius: 8 }}
          onPress={closeModal}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Close Modal
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddNewItemModal;
