import { SafeAreaView, FlatList, View, Text } from 'react-native';
import SingleTodo from './SingleTodo';
import AppleStyleSwipeableRow from './AppleStylesSwipeableRow';
import { useGlobalContext } from '../../context/GlobalProvider';
import ColorFilter from '../ColorFilter';
import { useEffect } from 'react';

const SwipeableRow = ({ item, navigation }) => {
  return (
    <AppleStyleSwipeableRow item={item}>
      <SingleTodo item={item} navigation={navigation} />
    </AppleStyleSwipeableRow>
  );
};

const TodoList = ({ navigation }) => {
  const {
    selectedFilter,
    selectedColorFilter,
    setSelectedColorFilter,
    sortedTodos,
    setColorsInUse,
    colorsInUse,
  } = useGlobalContext();

  const categoryFilter = (list) => {
    if (selectedFilter !== 'All' && selectedColorFilter !== '') {
      // not all and selectedColor
      return list.filter(
        (item) =>
          item.category === selectedFilter &&
          item.bg_color === selectedColorFilter
      );
    } else if (selectedFilter !== 'All' && selectedColorFilter === '') {
      // not all and NO selectedColor
      return list.filter((item) => item.category === selectedFilter);
    } else if (selectedFilter === 'All' && selectedColorFilter !== '') {
      // all and selected color
      return list.filter(
        (item) =>
          // item.category === selectedFilter &&
          item.bg_color === selectedColorFilter
      );
    }

    //all and no selected color ( everything )
    return list;
  };

  useEffect(() => {
    let regularColors = [
      ...new Set(categoryFilter(regularList).map((todo) => todo.bg_color)),
    ];
    let priorityColors = [
      ...new Set(categoryFilter(priorityList).map((todo) => todo.bg_color)),
    ];

    setColorsInUse([
      ...new Set([...regularColors, ...priorityColors, '#FFFFFF']),
    ]);
  }, [selectedFilter]);

  const isPriority = categoryFilter(sortedTodos).some(
    (item) => item.isPriority && !item.isCompleted
  );

  const regularList = categoryFilter(
    sortedTodos.filter((item) => !item.isPriority && !item.isCompleted)
  );

  const priorityList = categoryFilter(
    sortedTodos.filter((item) => item.isPriority && !item.isCompleted)
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {isPriority && (
        <View className="max-h-[35%] p-2 mb-5">
          <Text className="font-bold text-xl mb-3">Priority List</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={priorityList}
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
        className={`flex-1 ${isPriority ? 'max-h-[65%]' : 'h-full'} p-2 pb-6`}
      >
        <Text className="font-bold text-xl mb-3">Current Todos</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={regularList}
          ItemSeparatorComponent={() => <View className="m-1/2" />}
          renderItem={({ item, index }) => (
            <SwipeableRow item={item} index={index} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle="mb-20 pb-20"
        />
      </View>
      <View className="items-center -translate-y-3 flex-row justify-center">
        <ColorFilter />
      </View>
    </SafeAreaView>
  );
};

export default TodoList;
