import React from 'react';
import { View, Text } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

const CircleCountdown = ({ timeLeft }) => {
  const { days, hours, minutes, seconds } = timeLeft;

  const renderTimer = (duration, label) => (
    <View className="flex-1 items-center">
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[duration * 0.75, duration * 0.5, duration * 0.25, 0]}
        size={100}
        strokeWidth={10}
      >
        {({ remainingTime }) => <Text>{remainingTime}</Text>}
      </CountdownCircleTimer>
      <Text className="mt-2">{label}</Text>
    </View>
  );

  return (
    <View className="flex-row bg-red-300 justify-around">
      {renderTimer(days * 86400, 'Days')}
      {renderTimer(hours * 3600, 'Hours')}
      {renderTimer(minutes * 60, 'Minutes')}
      {renderTimer(seconds, 'Seconds')}
    </View>
  );
};

export default CircleCountdown;
