import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Stack } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-start p-10">
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <TextInput
            className="border border-gray-400 rounded-lg p-3 w-full mb-4"
            placeholder="test@gmail.com"
            placeholderTextColor="grey"
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
          <TextInput
            className="border border-gray-400 rounded-lg p-3 w-full mb-1"
            placeholder="Password"
            placeholderTextColor="grey"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={onSignUpPress}
            className="bg-gray-700 rounded-lg p-3  items-center mt-4"
          >
            <Text className="text-white font-bold tracking-wider">Sign up</Text>
          </TouchableOpacity>
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput
              className="border border-gray-400 rounded-lg p-3 w-full mb-1"
              value={code}
              placeholder="Code..."
              placeholderTextColor="grey"
              onChangeText={setCode}
            />
          </View>

          <TouchableOpacity
            onPress={onPressVerify}
            className="bg-gray-700 rounded-lg p-3 items-center mt-4"
          >
            <Text className="text-white font-bold tracking-wider">
              Verify Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.replace('register')}
            className="bg-red-500 rounded-lg p-3 items-center mt-4"
          >
            <Text className="text-white font-bold tracking-wider">Back</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

export default Register;
