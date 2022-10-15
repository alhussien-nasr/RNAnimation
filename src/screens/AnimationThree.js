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
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    const setwidth = interpolate(
      move.value,
      [height - 170, height - 100],
      [width, 160],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    const setheight = interpolate(move.value, [0, height - 150], [200, 80], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      width: setwidth,
      height: setheight,
    };
  });

  const animatedStyleView = useAnimatedStyle(() => {
    const opacity = interpolate(
      move.value,
      [height - 200, height - 100],
      [0, 1],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    const setwidth = interpolate(
      move.value,
      [height - 170, height - 100],
      [0, width - 160],
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,

      },
    );
    return {
      opacity,
      width: setwidth,
    };
  });
  const animatedStyleText = useAnimatedStyle(() => {
    const setwidth = interpolate(
      move.value,
      [height - 140, height - 100],
      [0, width - 290],
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      },
    );
    return {
      width: setwidth,
    };
  });
  const animatedStyleIcon = useAnimatedStyle(() => {
    const translateX = interpolate(
      move.value,
      [height - 170, height - 140],
      [-100, 0],
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      },
    );
    return {
      transform: [{translateX}],
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
      <Animated.View style={[{height: height - 200, alignItems: 'center'}]}>
        {/* <Text style={styles.titleText}> youtube </Text> */}
      </Animated.View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            height: 80,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          },
          animatedStyleView,
        ]}>
        <Icon
          name="close"
          size={40}
          style={[
            {
              backgroundColor: 'white',
              zIndex: 20,
            },
          ]}
        />
        <Animated.View style={[animatedStyleIcon]}>
          <Icon name="replay" size={40} />
        </Animated.View>
        <Animated.View style={[{overflow: 'hidden' , marginLeft:5}, animatedStyleText]}>
          <Text numberOfLines={1}>youtube youtubeyoutubeyoutube</Text>
          <Text numberOfLines={1}>youtube youtubeyoutubeyoutube</Text>
        </Animated.View>
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
