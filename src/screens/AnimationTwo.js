import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useRef} from 'react';

const AnimationTwo = () => {
  const width = Dimensions.get('window').width;

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, g) => {
        pan.setOffset({
          x: g.dx,
          y: g.dy,
        });
      },

      onPanResponderMove: (e, g) => {
        Animated.timing(pan, {
          toValue: {x: g.dx, y: g.dy},
          useNativeDriver: false,
        }).start();
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;
  const maxHight = pan.y.interpolate({
    inputRange: [-300, 0],
    outputRange: [400, 50],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>swipe up !</Text>
      <Animated.View
        style={[
          styles.box,
          {
            position: 'absolute',
            bottom: 0,
            height: maxHight,
            width,
          },
        ]}
        {...panResponder.panHandlers}></Animated.View>
    </View>
  );
};

export default AnimationTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
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
