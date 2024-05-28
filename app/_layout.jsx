import 'react-native-gesture-handler';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import 'react-native-reanimated';
import GlobalProvider from './context/GlobalProvider';
import { VITE_CLERK_PUBLISHABLE_KEY } from '@env';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';
    if (isSignedIn && !inTabsGroup) {
      router.replace('/OverviewScreenStack');
    } else if (!isSignedIn) {
      router.replace('/landing');
    }
  }, [isSignedIn]);

  return <Slot />;
};

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalProvider>
        <ClerkProvider
          publishableKey={VITE_CLERK_PUBLISHABLE_KEY}
          tokenCache={tokenCache}
          navigate={(to) => navigation.navigate(to)}
        >
          <InitialLayout />
        </ClerkProvider>
      </GlobalProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
