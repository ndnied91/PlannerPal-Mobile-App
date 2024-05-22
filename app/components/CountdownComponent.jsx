import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CountdownComponent = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        yrs: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)),
        mon: Math.floor((difference / (1000 * 60 * 60 * 24 * 30)) % 12),
        days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30),
        hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
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
      <Text className="text-gray-400 text-lg" key={interval}>
        {timeLeft[interval]}:{interval}{' '}
      </Text>
    );
  });

  return (
    <View className="flex-row justify-center items-center">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <Text>Countdown complete!</Text>
      )}
    </View>
  );
};

export default CountdownComponent;
