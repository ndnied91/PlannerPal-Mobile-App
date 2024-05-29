import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { useGlobalContext } from '../context/GlobalProvider';
import CompletedTodo from './CompletedTodo';
import { AntDesign } from '@expo/vector-icons';

const ViewCompletedModal = ({
  isCompletedModalVisible,
  closeModal,
  navigation,
}) => {
  const { sortedTodos } = useGlobalContext();
  const completedTodos = sortedTodos.filter((item) => item.isCompleted);

  const renderItem = (item) => {
    return (
      item?.isCompleted && (
        <CompletedTodo
          item={item}
          navigation={navigation}
          closeModal={closeModal}
        />
      )
    );
  };

  itemSeparatorComponent = () => {
    return (
      <View
        style={{
          height: '100%',
          width: 5,
        }}
      />
    );
  };

  return (
    <Modal
      isVisible={isCompletedModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      // swipeDirection="down"
      onSwipeComplete={closeModal}
      onBackdropPress={closeModal}
      className="m-0 absolute bottom-[-20%]"
    >
      <View className="bg-white w-screen h-screen p-5">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-bold text-xl mb-2">Completed Todos</Text>
          <TouchableOpacity className="" onPress={closeModal}>
            <View className="mb-1">
              <AntDesign name="close" size={26} color="red" className="pb-2" />
            </View>

            {/* <Text className=" text-white tracking-wider">Close</Text> */}
          </TouchableOpacity>
        </View>

        <FlatList
          vertical
          data={completedTodos}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={{
            maxHeight: '70%',
          }}
          ItemSeparatorComponent={() => <View className="m-1" />}
        />
      </View>
    </Modal>
  );
};

export default ViewCompletedModal;
