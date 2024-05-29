import { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const colors = [
    { id: 1, title: 'Lavender', hex: '#E6E6FA' },
    { id: 2, title: 'Light Coral', hex: '#F08080' },
    { id: 3, title: 'Peach Puff', hex: '#FFDAB9' },
    { id: 4, title: 'Honeydew', hex: '#F0FFF0' },
    { id: 6, title: 'Light Blue', hex: '#ADD8E6' },
    // { id: 7, title: 'Light Maroon', hex: '#FFB6C1' },
  ];

  console.log(selectedColor);

  const renderItem = ({ item }) => {
    // Calculate darker color for border
    const hexToRGB = (hex) =>
      hex
        .replace(
          /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
          (m, r, g, b) => '#' + r + r + g + g + b + b
        )
        .substring(1)
        .match(/.{2}/g)
        .map((x) => parseInt(x, 16));

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
          // borderWidth: selectedColor === item.title ? 2 : 1,
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
  };

  return (
    <View
      className={`mb-2 border p-2 border-gray-300 rounded`}
      style={{
        backgroundColor: selectedColor,
      }}
    >
      <Text className="text-gray-500 mb-2"> Background Color</Text>
      <FlatList
        horizontal
        data={colors}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ColorPicker;
