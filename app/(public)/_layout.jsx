import React from 'react';
import { Stack } from 'expo-router';

const PublicLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="landing"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Create Account',
        }}
      />
      <Stack.Screen
        name="reset"
        options={{
          headerTitle: 'Reset Password',
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
