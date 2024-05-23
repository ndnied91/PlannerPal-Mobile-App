import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import {
  EvilIcons,
  AntDesign,
  MaterialIcons,
  FontAwesome,
  FontAwesome6,
} from '@expo/vector-icons';

import { useGlobalContext } from '../../context/GlobalProvider';

const AppleStyleSwipeableRow = ({ children, item }) => {
  const { deleteTodo, updatePriorityStatus } = useGlobalContext();
  const swipeableRowRef = useRef(null);

  const renderLeftActions = (progress, dragX) => {
    const trans = progress.interpolate({
      inputRange: [0, 100],
      outputRange: [-20, 0],
    });
    const pressHandler = async () => await updatePriorityStatus(item, close);

    return (
      <RectButton
        className="items-center flex-row bg-yellow-300 text-center pl-9"
        onPress={pressHandler}
      >
        <Animated.Text
          style={[styles.actionText, { transform: [{ translateX: trans }] }]}
        >
          <FontAwesome name="exclamation-circle" size={32} color="black" />
        </Animated.Text>
      </RectButton>
    );
  };

  const renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = async () => await deleteTodo(item.id, close);

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton
          className="h-full items-center flex-row bg-red-600 justify-center"
          style={{ backgroundColor: color }}
          onPress={pressHandler}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress) => (
    <View
      style={{
        width: 80,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}
    >
      {renderRightAction(
        <FontAwesome6 name="trash-alt" size={32} color="black" />,
        '#dd2c00',
        72,
        progress
      )}
    </View>
  );

  const updateRef = (ref) => (swipeableRowRef.current = ref);
  const close = () => swipeableRowRef.current.close();

  return (
    <Swipeable
      style={styles.swipeable}
      ref={updateRef}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  swipeable: {
    margin: 2,
  },
});

export default AppleStyleSwipeableRow;
