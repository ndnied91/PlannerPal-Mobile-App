import {
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      console.log(result);
      alert('Password reset successfully');

      // Set the user session active, which will log in the user automatically
      await setActive({ session: result.createdSessionId });
    } catch (err) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View className="flex-1 justify-start p-10">
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <TextInput
            className="border border-gray-400 rounded-lg p-3 w-full mb-4"
            autoCapitalize="none"
            placeholder="simon@galaxies.dev"
            placeholderTextColor="grey"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />

          {/* <Button
            onPress={onRequestReset}
            title="Send Reset Email"
            color={'#6c47ff'}
          ></Button> */}

          <TouchableOpacity
            onPress={onRequestReset}
            className="bg-gray-700 rounded-lg p-3  items-center mt-4"
          >
            <Text className="text-white font-bold tracking-wider">
              Send Reset Email
            </Text>
          </TouchableOpacity>
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              className="border border-gray-400 rounded-lg p-3 w-full mb-1"
              placeholderTextColor="grey"
              onChangeText={setCode}
            />
            <TextInput
              placeholder="New password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="border border-gray-400 rounded-lg p-3 w-full mb-1"
              placeholderTextColor="grey"
            />
          </View>

          <TouchableOpacity
            onPress={onReset}
            className="bg-gray-700 rounded-lg p-3  items-center mt-4"
          >
            <Text className="text-white font-bold tracking-wider">
              Set new Password
            </Text>
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

export default PwReset;
