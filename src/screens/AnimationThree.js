import {StyleSheet, Text, View, PanResponder, Dimensions} from 'react-native';
import Animated, {
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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: move.value}],
  }));

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
          <Animated.View style={[{flex: 1},animatedStyle]}>
            <Text style={styles.titleText}>swipe up !</Text>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default AnimationThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
