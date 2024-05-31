import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useUser } from '@clerk/clerk-react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { supabase } from '../../utils/SupabaseConfig';
import { useGlobalContext } from '../context/GlobalProvider';
import FilterModal from './FilterModal';
import { AntDesign } from '@expo/vector-icons';
import ColorPicker from './ColorPicker';

const AddNewItemModal = ({ isPlusModalVisible, closeModal, navigation }) => {
  const { fetchTodos, selectedFilter } = useGlobalContext();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColor, setSelectedColor] = useState(null);

  const handleDateChange = (event, date) => {
    setShowPicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleInputChange = (name, text) => {
    setFormData({
      ...formData,
      [name]: text,
    });
  };

  const resetFormState = () => {
    setFormData({ title: '', body: '' });
    setSelectedCategory(selectedFilter);
    setSelectedDate(new Date());
    setShowPicker(false);
  };

  const handleSubmit = async () => {
    if (formData.title !== '' || formData.body !== '') {
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
              category: selectedCategory || 'All',
              bg_color: selectedColor || '#FFFFFF',
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

  const modalProps = isCategoryModalVisible ? {} : { swipeDirection: 'down' };

  return (
    <Modal
      isVisible={isPlusModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onSwipeComplete={closeModal}
      onBackdropPress={closeModal}
      {...modalProps}
      className="m-0 absolute bottom-0"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
            <View className="bg-white w-screen p-6 pb-10 rounded-lg">
              <View className="flex-row justify-between items-center pb-3">
                <Text className="font-bold text-xl">Create</Text>
                <TouchableOpacity onPress={closeModal}>
                  <AntDesign
                    name="close"
                    size={26}
                    color="red"
                    className="pb-2"
                  />
                </TouchableOpacity>
              </View>

              <View>
                <TextInput
                  placeholderTextColor={'grey'}
                  className="border border-gray-300 rounded p-5 mb-2"
                  placeholder="Title"
                  value={formData.title}
                  onChangeText={(text) => handleInputChange('title', text)}
                />

                <TextInput
                  placeholderTextColor={'grey'}
                  className="border border-gray-300 rounded p-5 mb-2"
                  placeholder="Content"
                  multiline={true}
                  numberOfLines={4}
                  value={formData.body}
                  onChangeText={(text) => handleInputChange('body', text)}
                />

                <View
                  className={`flex-row items-center mb-2 border p-2 border-gray-300 rounded`}
                >
                  <Text className="text-gray-500">Due date</Text>
                  <DateTimePicker
                    value={selectedDate}
                    mode="datetime"
                    display="default"
                    onChange={handleDateChange}
                  />
                </View>

                <TouchableOpacity
                  className="flex-row items-center p-3 border border-gray-300 rounded mb-10"
                  onPress={() => setIsCategoryModalVisible(true)}
                >
                  <Text className="text-gray-500 pr-2">Category</Text>
                  <View className="p-2 bg-gray-200 w-32 rounded-lg shadow-md">
                    <Text>{selectedCategory}</Text>
                  </View>
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

                <ColorPicker
                  isEditable
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />

                <TouchableOpacity
                  className="bg-blue-500 p-4 rounded-lg"
                  onPress={handleSubmit}
                >
                  <Text className="text-center font-bold tracking-wider text-white">
                    Create todo
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddNewItemModal;
