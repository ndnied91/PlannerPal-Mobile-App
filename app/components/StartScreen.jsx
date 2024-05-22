import 'react-native-gesture-handler';
import { ActivityIndicator, View } from 'react-native';

const StartScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default StartScreen;
