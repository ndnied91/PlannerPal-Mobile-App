import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const AppleStyleSwipeableRow = ({ children }) => {
  const swipeableRowRef = useRef(null);

  const renderLeftActions = (progress, dragX) => {
    const trans = progress.interpolate({
      inputRange: [0, 100],
      outputRange: [-20, 0],
    });
    return (
      <RectButton
        className="w-18 items-center flex-row bg-blue-600 text-center pl-8"
        onPress={close}
      >
        <Animated.Text
          style={[styles.actionText, { transform: [{ translateX: trans }] }]}
        >
          <AntDesign name="pushpin" size={26} color="black" />
        </Animated.Text>
      </RectButton>
    );
  };

  const renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      close();
      alert(text);
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton
          className="h-full items-center flex-row bg-red-600 text-center pl-2"
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
        width: 72,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}
    >
      {renderRightAction(
        <EvilIcons name="trash" size={38} color="black" />,
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
  // leftAction: {
  //   width: 64,
  //   alignContent: 'center',
  //   backgroundColor: '#497AFC',
  //   justifyContent: 'center',
  // },
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
});

export default AppleStyleSwipeableRow;
