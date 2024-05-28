import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircleCountdown from './CircleCountdown';

const CountdownComponent = ({ targetDate }) => {
  var difference = 0;
  const calculateTimeLeft = () => {
    difference = targetDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        yrs: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)),
        mon: Math.floor((difference / (1000 * 60 * 60 * 24 * 30)) % 12),
        days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <View className="m-3 ml-0 p-2 bg-gray-200 rounded-md" key={interval}>
        <Text className="text-gray-900 text-4xl text-center">
          {timeLeft[interval]}
        </Text>
        <Text className="text-center text-xs uppercase">{interval}</Text>
      </View>
    );
  });

  return (
    <View>
      <View className="flex-row justify-center items-center">
        {timerComponents.length ? (
          timerComponents
        ) : (
          <Text>Countdown complete!</Text>
        )}
      </View>
    </View>
  );
};

export default CountdownComponent;
