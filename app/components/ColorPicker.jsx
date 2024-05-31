import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/utilsFunctions';
import { hexToRGB } from '../../utils/utilsFunctions';

const ColorPicker = ({
  selectedColor,
  setSelectedColor,
  itemDetails,
  isEditable,
}) => {
  const renderItem = ({ item }) => {
    // if (itemDetails && item.title !== 'Clear') {
    // Calculate darker color for border
    const rgb = hexToRGB(item.hex);
    const darkerRGB = rgb.map((c) => Math.max(c - 20, 0));
    const darkerHex =
      '#' + darkerRGB.map((c) => c.toString(16).padStart(2, '0')).join('');

    return (
      <TouchableOpacity
        onPress={() => setSelectedColor(item.hex)}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: selectedColor === item.hex ? 'gray' : darkerHex,
          borderRadius: 7,
          margin: 5,
        }}
      >
        <View
          className="h-12 w-12 rounded-md"
          style={{
            backgroundColor: item.hex,
          }}
        ></View>
      </TouchableOpacity>
    );
    // }
  };

  return (
    <View>
      {isEditable && (
        <View
          className={`mb-2 border p-2 border-gray-300 rounded`}
          style={{
            backgroundColor: selectedColor,
          }}
        >
          <Text className="text-gray-500 mb-2">
            {' '}
            {itemDetails
              ? 'Update background color'
              : 'Set background color'}{' '}
          </Text>
          <FlatList
            horizontal
            data={colors}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default ColorPicker;
