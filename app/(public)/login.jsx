import { useSignIn, useOAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import { AntDesign } from '@expo/vector-icons';

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <SafeAreaView className="h-screen bg-gray-100 ">
      <ScrollView>
        <View className="items-center">
          <Spinner visible={loading} />

          <View className="p-6 mt-10 w-full">
            <Text className="text-black">Email</Text>
            <TextInput
              className="border border-gray-400 rounded-lg p-3 w-full mb-4"
              placeholder="Enter your email address"
              placeholderTextColor="black"
              autoCapitalize="none"
              value={emailAddress}
              onChangeText={setEmailAddress}
            />

            <Text className="text-black">Password</Text>
            <TextInput
              className="border border-gray-400 rounded-lg p-3 w-full mb-4"
              placeholder="Enter your password"
              placeholderTextColor="black"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View className="flex-row gap-4 flex-wrap items-center justify-center">
            <TouchableOpacity
              onPress={onSignInPress}
              className="bg-gray-700 rounded-lg p-3 w-48 items-center"
            >
              <Text className="text-white font-bold tracking-wider">Login</Text>
            </TouchableOpacity>

            <Link href="/register" asChild>
              <TouchableOpacity className="bg-gray-700 rounded-lg p-3 w-48 items-center">
                <Text className="text-white font-bold tracking-wider">
                  Create Account
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View className="flex-row mt-4">
            <Link href="/reset" asChild>
              <TouchableOpacity>
                <Text className="text-gray-600">Forgot password?</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View className="mt-10 flex-row items-center">
            <TouchableOpacity
              onPress={onPress}
              className="bg-white rounded-lg p-3 flex-row items-center"
            >
              <AntDesign name="google" size={24} color="black" />
              <Text className="ml-2">Sign in with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
