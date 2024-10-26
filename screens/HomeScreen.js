// screens/HomeScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.versionText}>Ver 1.0</Text>
      <TouchableOpacity style={styles.settingsButton}>
        <Image source={require('../assets/Settings-PNG-Free-Download.png')} style={styles.settingsIcon} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Mini Mentes</Text>
        <Text style={styles.subtitleText}>Brillantes</Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.startButtonText}>¡Iniciar!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEE1E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 16,
    color: '#333',
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  settingsIcon: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitleText: {
    fontSize: 28,
    color: '#333',
  },
  startButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  startButtonText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
});
