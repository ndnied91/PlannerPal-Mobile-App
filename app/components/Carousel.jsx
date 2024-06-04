import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, Animated } from 'react-native';

const Carousel = ({ data, renderItem, slideInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = React.createRef();
  const { width } = Dimensions.get('window');

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        if (currentIndex < data.length - 1) {
          flatListRef.current.scrollToIndex({
            index: currentIndex + 1,
            animated: true,
          });
          setCurrentIndex(currentIndex + 1);
        } else {
          flatListRef.current.scrollToIndex({ index: 0, animated: true });
          setCurrentIndex(0);
        }
      }
    }, slideInterval);

    return () => clearInterval(interval);
  }, [currentIndex, data.length, slideInterval]);

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}
      initialNumToRender={data.length}
      windowSize={3}
      getItemLayout={(data, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
    />
  );
};

export default Carousel;
