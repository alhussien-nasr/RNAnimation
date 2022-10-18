import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  SafeAreaView,
  PanResponder,
} from 'react-native';
import React, {useRef, useState} from 'react';

const HeaderAnimation = () => {
  const Max_Header_Height = 140;
  const Min_Header_Height = 60;
  const Scroll_Distance = Max_Header_Height - Min_Header_Height;

  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const value = useRef(new Animated.Value(0)).current;
  const [snap, setSnap] = useState(value._value);

  console.log(value);
  const setheight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Max_Header_Height, Min_Header_Height],
    extrapolate: 'clamp',
  });
  const moveY = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [40, 0],
    extrapolate: 'clamp',
  });
  const moveX = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [-30, 0],
    extrapolate: 'clamp',
  });
  const scale = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [1.8, 1],
    extrapolate: 'clamp',
  });

  console.log(snap);
  return (
    <SafeAreaView>
      <Animated.ScrollView
        pagingEnabled={200}
        snapToInterval={snap < Max_Header_Height ? Max_Header_Height : 0}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        style={{height}}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: value,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
            listener: val => setSnap(val.nativeEvent.contentOffset.y),
          },
        )}>
        <View>
          <Animated.View
            style={[{width, height: setheight, backgroundColor: 'white'}]}>
            <Animated.View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={styles.text}>hello</Text>
              <Animated.View
                style={{
                  transform: [
                    {translateX: moveX},
                    {translateY: moveY},
                    {scale},
                  ],
                }}>
                <Text style={styles.text}> WELCOME</Text>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </View>
        <View style={{width, height: 2000, backgroundColor: 'blue'}}></View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default HeaderAnimation;

const styles = StyleSheet.create({text: {fontSize: 20, marginHorizontal: 10}});
