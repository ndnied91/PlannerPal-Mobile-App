import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  // TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  // ScrollView,
} from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useGlobalContext } from '../context/GlobalProvider';
import OverviewTodo from './OverviewTodo';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { convertToNormalTime } from '../../utils/utilsFunctions';
import ViewPastDue from './ViewPastDue';
import SearchBar from './SearchBar';

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const Overview = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const { sortedTodos } = useGlobalContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const activeTodos = sortedTodos.filter((item) => !item.isCompleted);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const pastDue = sortedTodos.filter(
    (item) => new Date(item.dueDate).getTime() < Date.now() && !item.isCompleted
  );

  const currentDayTodos = activeTodos.filter((todo) => {
    const dueDate = new Date(todo.dueDate);

    return (
      dueDate.getDate() === currentDate.getDate() &&
      dueDate.getMonth() === currentDate.getMonth() &&
      dueDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const updateCurrentDate = (days) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    });
  };

  const renderItem = ({ item }) => (
    <OverviewTodo item={item} navigation={navigation} />
  );

  useEffect(() => {
    activeTodos.length > 0 && setLoading(false);
  }, [activeTodos]);

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor:
          searchTerm.length > 0 ? 'rgba(0, 0, 0, 0.5)' : '#F9FAFB',
      }}
    >
      <View
        style={{
          backgroundColor:
            searchTerm.length > 0 ? 'rgba(0, 0, 0, 0.5)' : '#F9FAFB',
        }}
        className={`p-6 h-screen`}
      >
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, {user?.firstName}!
        </Text>

        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          className="h-screen"
        >
          <View>
            <View className="relative w-full z-50 mb-4">
              <SearchBar
                navigation={navigation}
                sortedTodos={sortedTodos}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </View>

            {searchTerm.length <= 0 && (
              <View>
                <View className="flex-row justify-between mb-4 !relative !z-1">
                  <View className="flex-1 mr-2 p-4 bg-green-300 rounded-lg shadow-sm border border-green-500 !relative !z-1">
                    <Text className="text-lg font-semibold text-gray-800">
                      Active
                    </Text>
                    <Text className="text-5xl font-bold text-gray-800">
                      {activeTodos.length}
                    </Text>
                  </View>

                  <View className="flex-1 ml-2 p-4 bg-red-300 rounded-lg shadow-sm border border-red-500 !relative !z-1">
                    <Text className="text-lg font-semibold text-gray-800">
                      Past Due
                    </Text>
                    <Text className="text-5xl font-bold text-gray-800">
                      {pastDue.length}
                    </Text>
                  </View>
                </View>

                <ViewPastDue pastDue={pastDue} navigation={navigation} />

                <View>
                  {currentDate.toLocaleDateString() ===
                  new Date().toLocaleDateString() ? (
                    <Text className="text-lg font-semibold text-gray-800 mb-1">
                      Today's Agenda
                    </Text>
                  ) : (
                    <Text className="text-lg font-semibold text-gray-800 mb-1">
                      {convertToNormalTime(currentDate, 'date_no_year')} Agenda
                    </Text>
                  )}

                  <View className="flex-row justify-between mb-3 items-center">
                    {currentDate.toLocaleDateString() ===
                    new Date().toLocaleDateString() ? (
                      <Text className="text-gray-600 font-semibold">
                        {currentDate.toLocaleDateString()}
                      </Text>
                    ) : (
                      <TouchableOpacity
                        className="text-md font-semibold text-gray-500 flex-row items-center bg-gray-100 border border-gray-300 p-2 rounded-md shadow-md"
                        onPress={() => updateCurrentDate(-1)}
                      >
                        <Feather name="arrow-left" size={16} color="gray" />
                        <Text className="font-semibold"> Previous Day</Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      className="text-md font-semibold text-gray-500 flex-row items-center bg-gray-100 border border-gray-300 p-2 rounded-md shadow-md"
                      onPress={() => updateCurrentDate(1)}
                    >
                      <Text className="font-semibold"> Next day </Text>
                      <Feather name="arrow-right" size={16} color="gray" />
                    </TouchableOpacity>
                  </View>

                  {loading ? (
                    <View>
                      <ActivityIndicator />
                    </View>
                  ) : currentDayTodos.length > 0 ? (
                    <FlatList
                      data={currentDayTodos}
                      showsVerticalScrollIndicator={false}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id.toString()}
                      scrollEnabled={true}
                      className="h-[40%]"
                      contentContainerStyle={{ paddingBottom: 20 }}
                    />
                  ) : (
                    <Text className="mt-5 text-lg text-gray-400 italic text-center">
                      {' '}
                      No items scheduled for this date{' '}
                    </Text>
                  )}
                </View>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default Overview;
