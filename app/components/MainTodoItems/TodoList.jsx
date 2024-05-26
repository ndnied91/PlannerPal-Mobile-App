import { SafeAreaView } from 'react-native';
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
  // this component renders the whole list
  const { selectedFilter, sortedTodos } = useGlobalContext();

  const categoryFilter = (list) => {
    //responsible for filtering todos
    if (selectedFilter !== 'All') {
      return list.filter((item) => item.category === selectedFilter);
    }
    return list;
  };

  const isPriority = categoryFilter(sortedTodos).some(
    // checks if there are priority items
    (item) => item.isPriority && !item.isCompleted
  );

  const regularList = sortedTodos.filter(
    //renders regular list
    (item) => !item.isPriority && !item.isCompleted
  );

  const priorityList = sortedTodos.filter(
    //renders regular list
    (item) => item.isPriority && !item.isCompleted
  );

  return (
    <SafeAreaView>
      {isPriority && (
        <View className="h-[35%] p-2">
          {/* priority list */}
          <Text className="font-bold text-xl mb-3"> Priority List</Text>

          <FlatList
            data={categoryFilter(priorityList)}
            ItemSeparatorComponent={() => <View className="m-1" />}
            renderItem={({ item, index }) => (
              <SwipeableRow item={item} index={index} navigation={navigation} />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={'mb-20'}
          />
        </View>
      )}

      <View className={`h-[${isPriority ? '57%' : '100%'}] p-2 `}>
        <Text className="font-bold text-xl mb-3"> Current Todos </Text>
        <FlatList
          data={categoryFilter(regularList)}
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
