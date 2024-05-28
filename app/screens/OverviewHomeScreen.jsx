import { View } from 'react-native';
import Overview from '../components/Overview';

const OverviewHomeScreen = ({ navigation }) => {
  return (
    <View>
      <Overview navigation={navigation} />
    </View>
  );
};

export default OverviewHomeScreen;
