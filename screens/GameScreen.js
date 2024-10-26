import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ShapeSortingGame from './ShapeSortingGame';

const GameScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ShapeSortingGame navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AEE1E1',
  },
});

export default GameScreen;
