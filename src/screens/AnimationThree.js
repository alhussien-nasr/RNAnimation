import {StyleSheet, Text, View, PanResponder, Dimensions} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import React, {useRef} from 'react';
import {Gesture, PanGestureHandler} from 'react-native-gesture-handler';

const AnimationThree = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const move = useSharedValue(0);
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = move.value;
    },
    onActive: (event, ctx) => {
      move.value = ctx.startX + event.translationY;
      console.log(move.value);
    },
    onEnd: (event, ctx) => {
      event.translationY > 100
        ? (move.value = withSpring(height - 200))
        : (move.value = withSpring(0));
      console.log(event.translationY);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const movex = interpolate(move.value, [0, height], [0, width * 0.25], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    const scale = interpolate(move.value, [0, height], [1, 0.4], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    console.log(movex);
    return {
      transform: [
        {translateY: move.value},
        {translateX: movex},
        {scale: scale},
      ],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View>
          <Animated.View
            style={[
              styles.box,
              {
                height: 200,
                width,
              },
              animatedStyle,
            ]}></Animated.View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[animatedStyle, {flex: 1, alignItems: 'center'}]}>
        <Text style={styles.titleText}> youtube </Text>
      </Animated.View>
    </View>
  );
};

export default AnimationThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
