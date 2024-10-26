import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, Animated, Image } from 'react-native';
import { Audio } from 'expo-av';

// Define las formas disponibles en el juego
const shapes = [
  { id: 'circle', label: 'Círculo', color: '#FF5733' },
  { id: 'square', label: 'Cuadrado', color: '#33FF57' },
  { id: 'rectangle', label: 'Rectángulo', color: '#3357FF' },
  { id: 'triangle', label: 'Triángulo', color: '#FF33A1' },
  { id: 'star', label: 'Estrella', color: '#FFD700' },
  { id: 'hexagon', label: 'Hexágono', color: '#8A2BE2' },
];

const ShapeSortingGame = ({ navigation, route }) => {
  const { age } = route.params;
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [shuffledShapes, setShuffledShapes] = useState([]);
  const [tutorialVisible, setTutorialVisible] = useState(true);
  const [maxShapes, setMaxShapes] = useState(age === '4-5' ? 3 : 5);
  const [timer, setTimer] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [soundCorrect, setSoundCorrect] = useState(null);
  const [soundIncorrect, setSoundIncorrect] = useState(null);

  useEffect(() => {
    shuffleShapes();
    loadSounds();
    startTimer();
    return () => {
      if (soundCorrect) {
        soundCorrect.unloadAsync();
      }
      if (soundIncorrect) {
        soundIncorrect.unloadAsync();
      }
    };
  }, []);

  const loadSounds = async () => {
    const { sound: correctSound } = await Audio.Sound.createAsync(require('../assets/correct.mp3'));
    const { sound: incorrectSound } = await Audio.Sound.createAsync(require('../assets/incorrect.mp3'));
    setSoundCorrect(correctSound);
    setSoundIncorrect(incorrectSound);
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const shuffleShapes = () => {
    const shuffled = [...shapes].sort(() => Math.random() - 0.5).slice(0, maxShapes);
    setShuffledShapes(shuffled);
  };

  const handleDrop = async (shapeId) => {
    const isCorrect = shapeId === shuffledShapes[0].id; // Se coloca la figura correcta primero
    if (isCorrect) {
      setScore((prevScore) => prevScore + 10); // Incrementa la puntuación
      await soundCorrect.playAsync();
      Alert.alert('¡Bien hecho!', `Has colocado el ${shapes.find(s => s.id === shapeId).label} correctamente.`);
      if (score >= 50) {
        setLevel(level + 1);
        setMaxShapes(maxShapes + 1); // Incrementa la dificultad
        Alert.alert('¡Nivel Siguiente!', `Pasaste al nivel ${level + 1}!`);
      }
      shuffleShapes();
    } else {
      await soundIncorrect.playAsync();
      Alert.alert('Incorrecto', 'Intenta de nuevo.');
    }
  };

  const handleFinish = () => {
    setIsGameOver(true);
    Alert.alert('Juego Terminado', `Tu puntaje: ${score}`);
    navigation.navigate('MainGameScreen');
  };

  const handleCloseTutorial = () => {
    setTutorialVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clasifica las Figuras Geométricas</Text>
      <Text style={styles.score}>Puntuación: {score}</Text>
      <Text style={styles.level}>Nivel: {level}</Text>
      <Text style={styles.timer}>Tiempo Restante: {timer}s</Text>
      <View style={styles.shapeContainer}>
        {shuffledShapes.map((shape) => (
          <TouchableOpacity
            key={shape.id}
            style={[styles.shape, { backgroundColor: shape.color }]}
            onPress={() => handleDrop(shape.id)}
          >
            <Text style={styles.shapeText}>{shape.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <Text style={styles.buttonText}>Terminar Juego</Text>
      </TouchableOpacity>

      {/* Tutorial Modal */}
      <Modal
        transparent={true}
        visible={tutorialVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Instrucciones</Text>
            <Text style={styles.modalText}>
              Toca las figuras geométricas que aparecen y colócalas en el lugar correcto.
              Gana 10 puntos por cada figura correcta. ¡Buena suerte!
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseTutorial}>
              <Text style={styles.buttonText}>Comenzar Juego</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Game Over Modal */}
      <Modal
        transparent={true}
        visible={isGameOver}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Juego Terminado</Text>
            <Text style={styles.modalText}>Tu puntaje: {score}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate('MainGameScreen')}>
              <Text style={styles.buttonText}>Volver a la Pantalla Principal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: 28,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  score: {
    fontSize: 20,
    color: '#333',
  },
  level: {
    fontSize: 20,
    color: '#333',
  },
  timer: {
    fontSize: 18,
    marginBottom: 10,
    color: '#FF0000',
  },
  shapeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  shape: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  shapeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  finishButton: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#6a5acd',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default ShapeSortingGame;
