import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Dimensions, SafeAreaView, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  withSpring,
  interpolateColor,
  useAnimatedRef,
  scrollTo,
  runOnUI,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const cardWidth = width - 150;

export default function TileScrolling2Reanimated() {
  const data = Array(4).fill(0).map(() => getRandomColor())
  const images = [
    require('./App/assets/Blog.png'),
    require('./App/assets/CSA.png'),
    require('./App/assets/Newsletter.png'),
    require('./App/assets/Blog.png')
  ];

  const translationX = useSharedValue(0);
  const activeIndex = useSharedValue(0);
  const animatedRef = useAnimatedRef();

  const scrollHandler = useAnimatedScrollHandler(event => {
    const scrollPosition = (translationX.value + cardWidth / 2) / cardWidth;
    activeIndex.value = Math.floor(scrollPosition);
    translationX.value = event.contentOffset.x;
  });

  const animatedBg = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      translationX.value,
      data.map((x, i) => i * cardWidth),
      data.map((x) => x + '77'),
    ),
  }))

  const onPress = (i) => {
    runOnUI(scrollTo)(animatedRef, i * cardWidth, 0, true);
  }

  return (
    <SafeAreaView style={styles.flex}>
      <Animated.View style={[animatedBg, styles.abs]} />
      <Animated.ScrollView
        ref={animatedRef}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: (width - cardWidth) / 2,
          alignItems: 'center'
        }}
        style={{ height: '100%' }}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        snapToInterval={cardWidth}>
        {data.map((item, index) => (
          <Card key={index} {...{ item, index, translationX, activeIndex, onPress, images }} />
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

function Card({ item, index, translationX, activeIndex, onPress, images }) {
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value },
        { translateX: -(index * cardWidth) + index * 50 },
        {
          translateX: interpolate(translationX.value, [0, cardWidth], [0, -50]),
        },
        {
          scale: withSpring(
            interpolate(
              activeIndex.value,
              [index - 1, index, index + 1],
              [0.9, 1, 0.9],
            ),
          ),
        },
      ],
      zIndex: activeIndex.value >= index ? index : activeIndex.value - index,
      backgroundColor: item
    };
  });
  return (
    <Animated.View
      key={index}
      style={[styles.card, animatedCardStyle]}>
      <TouchableOpacity style={styles.abs} onPress={() => onPress(index)}>
        <Image source={images[index]} style={styles.image} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  card: {
    height: 300,
    width: cardWidth,
    elevation: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    shadowOffset: {
      height: 10,
    },
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  abs: { ...StyleSheet.absoluteFill },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
});

function getRandomColor() { return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0') };