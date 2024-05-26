import { TouchableOpacity, View, Alert, Text } from 'react-native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Ionicons } from '@expo/vector-icons';

const RoundedCheckbox = ({ item }) => {
  const { updateCompletion } = useGlobalContext();

  return (
    <TouchableOpacity
      onPress={() =>
        updateCompletion(
          item,
          'Are you sure you want to mark this item as complete?'
        )
      }
    >
      <View>
        <Ionicons name="checkmark-circle-outline" size={32} color="grey" />
      </View>
    </TouchableOpacity>
  );
};

export default RoundedCheckbox;
