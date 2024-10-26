// screens/MainGameScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const MainGameScreen = ({ navigation }) => {
const handlePlayGame = () => {
  // Lógica para seleccionar la edad
  const currentAge = '4-5'; // Aquí deberías obtener la edad actual de alguna parte de tu estado o contexto
  const selectedAge = currentAge === '4-5' ? '5-6' : '4-5'; // Alternar entre edades

  navigation.navigate('ShapeSortingGame', { age: selectedAge });
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Juegos Disponibles</Text>
      <View style={styles.card}>
        <Image
          source={require('../assets/1955964.png')} // Asegúrate de tener esta imagen en tu carpeta de assets
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.cardTitle}>Juego de Matemáticas</Text>
        <TouchableOpacity style={styles.button} onPress={handlePlayGame}>
          <Text style={styles.buttonText}>¡JUGAR!</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  card: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#6a5acd',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MainGameScreen;
