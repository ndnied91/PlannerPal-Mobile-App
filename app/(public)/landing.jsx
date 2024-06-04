import React, { useState } from 'react';
import { Link } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import Carousel from '../components/Carousel';
import { useSignIn, useOAuth } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { AntDesign } from '@expo/vector-icons';

const LandingPage = ({ navigation }) => {
  const router = useRouter();

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
    <SafeAreaView className="flex justify-center items-center h-full bg-white p-4">
      <View className="w-full items-center">
        <View>
          <Text
            style={{
              fontSize: 45,
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 10,
            }}
          >
            PlannerPal
          </Text>
          <Text className="text-md text-gray-600 mt-2 text-center w-60">
            Your ultimate tool for staying organized and productive.
          </Text>
        </View>

        <View className="items-center w-full">
          <Spinner visible={loading} />

          <View className="p-6 mt-10 w-full ">
            <TextInput
              className="border border-gray-400 rounded-lg p-3 w-full mb-4"
              placeholder="Email address"
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

            <View className="flex-row justify-end mb-4">
              <Link href="/reset" asChild>
                <TouchableOpacity>
                  <Text className="text-gray-600">Forgot password?</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          <View className="flex-row gap-4 flex-wrap items-center justify-center pl-8 pr-8">
            <TouchableOpacity
              onPress={onSignInPress}
              className="bg-gray-700 rounded-lg p-3 w-full items-center"
            >
              <Text className="text-white font-bold tracking-wider">
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-row items-center pl-8 pr-8 mt-4 mb-5">
          <View className="flex-1 border-t border-gray-200"></View>
          <Text className="text-gray-600 mx-4">OR</Text>
          <View className="flex-1 border-t border-gray-200 "></View>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={onPress}
            className="bg-blue-600 rounded-lg p-3 flex-row items-center"
          >
            <AntDesign name="google" size={24} color="white" />
            <Text className="ml-2 text-white font-bold">
              Sign in with Google
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row mt-32">
          <Text> Dont have an account? </Text>
          <Link href="/register" asChild>
            <TouchableOpacity className="">
              <Text className="text-blue-500">Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
