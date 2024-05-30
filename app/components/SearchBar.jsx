import { View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Keyboard } from 'react-native';
import SingleTodo from './MainTodoItems/SingleTodo';

import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchBar = ({ sortedTodos, navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const results = sortedTodos.filter(
    (todo) =>
      searchTerm.length > 0 &&
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View>
      <View className="relative">
        <View className="border border-gray-300 flex-row items-center p-2 rounded-full bg-gray-50 shadow-md">
          <FontAwesome
            name="search"
            size={26}
            color="#9CA3AF"
            style={{
              paddingLeft: 4,
            }}
          />

          <TextInput
            value={searchTerm}
            className="pl-1 flex-1 h-full "
            placeholder="Search for todo"
            placeholderTextColor="#9CA3AF"
            style={{ fontStyle: 'normal' }}
            autoCorrect={false}
            placeholderStyle={{ fontStyle: 'italic' }}
            onChangeText={setSearchTerm}
          />

          {searchTerm !== '' && (
            <TouchableOpacity className="" onPress={() => setSearchTerm('')}>
              <Entypo
                name="circle-with-cross"
                size={18}
                color="#9CA3AF"
                style={{
                  paddingRight: 5,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        {searchTerm.length > 0 && (
          <View className="absolute top-full w-full shadow-lg">
            {results.slice(0, 4).map((item, index) => (
              <SingleTodo
                key={index}
                item={item}
                navigation={navigation}
                searchBar
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchBar;
