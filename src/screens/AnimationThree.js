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
      ctx.startY = move.value;
    },
    onActive: (event, ctx) => {
      move.value = ctx.startY + event.translationY;
      console.log(move.value, 'active');
    },
    onEnd: (event, ctx) => {
      event.translationY > 100
        ? (move.value = withSpring(height - 100))
        : (move.value = withSpring(0));
      console.log(event.translationY, 'end');
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: move.value}],
    };
  });

  const animatedStylevid = useAnimatedStyle(() => {
    const setwidth = interpolate(move.value, [height-300, height - 150], [width, 200], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    const setheight = interpolate(move.value, [0, height - 150], [200, 100], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      width: setwidth,
      height: setheight,
    };
  });
  const animatedStyleView = useAnimatedStyle(() => {
    const opacity = interpolate(move.value, [height-300, height - 150], [0, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            styles.box,
            {
              width,
              zIndex: 300,
              position: 'absolute',
              right: 0,
              top: 0,
            },
            animatedStylevid,
          ]}></Animated.View>
      </PanGestureHandler>
      <Animated.View style={[, {height: height - 200, alignItems: 'center'}]}>
        {/* <Text style={styles.titleText}> youtube </Text> */}
      </Animated.View>

      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            width: width - 200,
            alignItems: 'center',
            height: 100,
            justifyContent: 'center',
          },
          animatedStyleView,
        ]}>
        <Text numberOfLines={1}>youtube youtubeyoutubeyoutube</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default AnimationThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
