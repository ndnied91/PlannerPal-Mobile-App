import { useSignIn, useOAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Text,
  Alert,
  TouchableOpacity,
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
    <SafeAreaView className="h-screen bg-gray-950">
      <ScrollView>
        <View className="items-center">
          <Spinner visible={loading} />

          <View className="p-6 mt-10 w-full">
            <Text className="text-white"> Email </Text>
            <TextInput
              className="bg-gray-700 rounded-lg p-4 text-gray-950  mb-4"
              autoCapitalize="none"
              value={emailAddress}
              onChangeText={setEmailAddress}
            />

            <Text className="text-white"> Password </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="bg-gray-700 rounded-lg p-4 text-gray-950"
            />
          </View>

          <TouchableOpacity
            onPress={onSignInPress}
            title="Login"
            color={'#6c47ff'}
            className="bg-gray-500 rounded-lg p-4 items-center w-48 "
          >
            <Text className="text-white font-bold tracking-widest"> Login</Text>
          </TouchableOpacity>

          <Link href="/reset" asChild>
            <TouchableOpacity>
              <Text>Forgot password?</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/register" asChild>
            <TouchableOpacity className="bg-gray-500 rounded-lg p-4 items-center w-48 ">
              <Text className="text-white font-bold tracking-widest">
                Create Account
              </Text>
            </TouchableOpacity>
          </Link>

          <View className="mt-20 w-max flex-row">
            <TouchableOpacity
              title="Sign in with Google"
              onPress={onPress}
              className="flex-row bg-white rounded-lg p-4 items-center w-48 "
            >
              <Text>
                <AntDesign name="google" size={24} color="black" />
              </Text>
              <Text> Sign in with Google </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
