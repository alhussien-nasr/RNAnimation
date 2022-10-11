import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import React from 'react';
export const Screen = ({children, style, onScroll, scrollView = true}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {scrollView ? (
        <ScrollView scrollEventThrottle={16} onScroll={onScroll} style={[{flex: 1}, style]}>
          {children}
        </ScrollView>
      ) : (
        <View style={[{flex: 1}, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240	,240	,244)',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
