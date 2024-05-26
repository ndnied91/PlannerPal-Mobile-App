import { SafeAreaView, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';

import SingleTodo from './SingleTodo';

import AppleStyleSwipeableRow from './AppleStylesSwipeableRow';
import { useGlobalContext } from '../../context/GlobalProvider';

const SwipeableRow = ({ item, navigation }) => {
  return (
    <AppleStyleSwipeableRow item={item}>
      <SingleTodo item={item} navigation={navigation} />
    </AppleStyleSwipeableRow>
  );
};

const TodoList = ({ navigation }) => {
  const { sortedTodos } = useGlobalContext();
  const isPriority = sortedTodos.some(
    (item) => item.isPriority && !item.isCompleted
  );

  return (
    <SafeAreaView>
      {isPriority && (
        <View className="h-[35%] p-2">
          {/* priority list */}
          <Text className="font-bold text-xl mb-3"> Priority List</Text>

          <FlatList
            data={sortedTodos.filter(
              (item) => item.isPriority && !item.isCompleted
            )}
            ItemSeparatorComponent={() => <View className="m-1" />}
            renderItem={({ item, index }) => (
              <SwipeableRow item={item} index={index} navigation={navigation} />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={'mb-20'}
          />
        </View>
      )}

      <View className="h-[57%] p-2">
        <Text className="font-bold text-xl mb-3"> Current Todos </Text>
        <FlatList
          data={sortedTodos.filter(
            (item) => !item.isPriority && !item.isCompleted
          )}
          ItemSeparatorComponent={() => <View className="m-1" />}
          renderItem={({ item, index }) => (
            <SwipeableRow item={item} index={index} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={'mb-20 pb-20'}
        />
      </View>
    </SafeAreaView>
  );
};

export default TodoList;
