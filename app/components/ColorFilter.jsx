import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../utils/utilsFunctions';
import { hexToRGB } from '../../utils/utilsFunctions';
import { useGlobalContext } from '../context/GlobalProvider';
import { MaterialIcons } from '@expo/vector-icons';

const ColorFilter = () => {
  const { selectedColorFilter, setSelectedColorFilter } = useGlobalContext();

  const renderItem = ({ item }) => {
    const rgb = hexToRGB(item.hex);
    const darkerRGB = rgb.map((c) => Math.max(c - 20, 0));
    const darkerHex =
      '#' + darkerRGB.map((c) => c.toString(16).padStart(2, '0')).join('');

    return (
      <TouchableOpacity
        onPress={() => {
          if (item.title === 'Clear') {
            setSelectedColorFilter('');
          } else {
            setSelectedColorFilter(item.hex);
          }
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: selectedColorFilter === item.hex ? 3 : 2,
          borderColor: selectedColorFilter === item.hex ? '#666666' : darkerHex,
          borderRadius: 99999,
          width: 30,
          height: 30,
          margin: 3,
        }}
      >
        <View
          style={{
            backgroundColor: item.hex,
            width: 27,
            height: 27,
            borderRadius: 9999,
          }}
          className="items-center justify-center"
        >
          {item.title === 'Clear' && (
            <MaterialIcons name="format-color-reset" size={24} color="black" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        horizontal
        data={colors}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ColorFilter;
