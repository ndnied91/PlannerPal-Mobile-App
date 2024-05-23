import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { useAuth } from '@clerk/clerk-expo';
import { useGlobalContext } from '../context/GlobalProvider';

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const onSaveUser = async () => {
    try {
      // This is not working!
      const result = await user.update({
        firstName: 'John',
        lastName: 'Doe',
      });
      console.log('🚀 ~ file: profile.tsx:16 ~ onSaveUser ~ result:', result);
    } catch (e) {
      console.log(
        '🚀 ~ file: profile.tsx:18 ~ onSaveUser ~ e',
        JSON.stringify(e)
      );
    }
  };

  return (
    <SafeAreaView className="m-12 !mt-40 ">
      <Text>
        Good morning {user.firstName} {user.lastName}!
      </Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <Button
        onPress={onSaveUser}
        title="Update account"
        color={'#6c47ff'}
      ></Button>

      <View className="items-center">
        <TouchableOpacity
          className="bg-red-300 rounded-md mt-12 w-1/2 items-center "
          onPress={signOut}
        >
          <Text className="text-center p-4"> Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
