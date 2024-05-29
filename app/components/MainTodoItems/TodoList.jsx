import { SafeAreaView, FlatList, View, Text } from 'react-native';
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
  const { selectedFilter, sortedTodos } = useGlobalContext();

  const categoryFilter = (list) => {
    if (selectedFilter !== 'All') {
      return list.filter((item) => item.category === selectedFilter);
    }
    return list;
  };

  const isPriority = categoryFilter(sortedTodos).some(
    (item) => item.isPriority && !item.isCompleted
  );

  const regularList = sortedTodos.filter(
    (item) => !item.isPriority && !item.isCompleted
  );

  const priorityList = sortedTodos.filter(
    (item) => item.isPriority && !item.isCompleted
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {isPriority && (
        <View className="max-h-[35%] p-2 mb-5">
          <Text className="font-bold text-xl mb-3">Priority List</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={categoryFilter(priorityList)}
            ItemSeparatorComponent={() => <View className="m-1/2" />}
            renderItem={({ item, index }) => (
              <SwipeableRow item={item} index={index} navigation={navigation} />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle="mb-20"
          />
        </View>
      )}

      <View
        className={`flex-1 ${isPriority ? 'max-h-[65%]' : 'h-full'} p-2 pb-10`}
      >
        <Text className="font-bold text-xl mb-3">Current Todos</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={categoryFilter(regularList)}
          ItemSeparatorComponent={() => <View className="m-1/2" />}
          renderItem={({ item, index }) => (
            <SwipeableRow item={item} index={index} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle="mb-20 pb-20"
        />
      </View>
    </SafeAreaView>
  );
};

export default TodoList;
