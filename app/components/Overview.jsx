import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useGlobalContext } from '../context/GlobalProvider';
import OverviewTodo from './OverviewTodo';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const Overview = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const { sortedTodos } = useGlobalContext();

  const activeTodos = sortedTodos.filter((item) => !item.isCompleted);
  const pastDue = sortedTodos.filter(
    (item) => new Date(item.dueDate).getTime() < Date.now()
  );

  const todayTodos = sortedTodos.filter((todo) => {
    const dueDate = new Date(todo.dueDate);
    const today = new Date();
    return (
      dueDate.getDate() === today.getDate() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear()
    );
  });

  const currentDate = new Date().toLocaleDateString();

  const renderItem = ({ item }) => (
    <OverviewTodo item={item} navigation={navigation} />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-8 bg-white rounded-lg shadow-md h-screen">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, {user?.firstName}!
        </Text>

        <View className="flex-row justify-between mb-6">
          <View className="flex-1 mr-2 p-4 bg-green-300 rounded-lg shadow-sm border border-green-500">
            <Text className="text-lg font-semibold text-gray-800">Active</Text>
            <Text className="text-5xl font-bold text-gray-800">
              {activeTodos.length}
            </Text>
          </View>

          <View className="flex-1 ml-2 p-4 bg-red-300 rounded-lg shadow-sm border border-red-500">
            <Text className="text-lg font-semibold text-gray-800">
              Past Due
            </Text>
            <Text className="text-5xl font-bold text-gray-800">
              {pastDue.length}
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-800">
            Today's Agenda
          </Text>
          <View className="flex-row justify-between mb-3 items-center">
            <Text className="text-md font-semibold text-gray-500">
              {currentDate}
            </Text>
            <TouchableOpacity className="text-md font-semibold text-gray-500 flex-row items-center bg-gray-100 border border-gray-300 p-2 rounded-md shadow-md">
              <Text className="font-semibold"> Next day </Text>
              <Feather name="arrow-right" size={16} color="gray" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={todayTodos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={true}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Overview;
