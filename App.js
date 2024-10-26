// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // Pantalla principal
import LoginScreen from './screens/LoginScreen'; // Pantalla de login
import AgeSelectionScreen from './screens/AgeSelectionScreen'; // Pantalla de selección de edad
import MainGameScreen from './screens/MainGameScreen'; // Pantalla principal de juegos
import ShapeSortingGame from './screens/ShapeSortingGame'; // Importa el nuevo juego

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="AgeSelection" component={AgeSelectionScreen} />
                <Stack.Screen name="MainGameScreen" component={MainGameScreen} />
                <Stack.Screen name="ShapeSortingGame" component={ShapeSortingGame} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
