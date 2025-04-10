import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';

// SCREENS
import SplashScreen from './screens/SplashScreen ';
import LoginScreen from './screens/LoginScreen ';
import RegisterScreen from './screens/RegisterScreen ';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Profile" component={ProfileScreen} 
         options={{
          headerShown: true,
          headerTitle: 'Profile', 
          headerStyle: {
            backgroundColor: '#3498db', 
          },
          headerTitleStyle: {
            color: 'white', 
            fontSize: 18,
            fontWeight: 'bold',
            letterSpacing: 1
          },
          headerTintColor:  'white', 
        }}
        />

        <Stack.Screen name="Register" component={RegisterScreen} 
         options={{
          headerShown: true,
          headerTitle: 'User Form', 
          headerStyle: {
            backgroundColor: '#3498db', 
          },
          headerTitleStyle: {
            color: 'white', 
            fontSize: 18,
            fontWeight: 'bold',
            letterSpacing: 1
          },
          headerTintColor:  'white', 
        }}
        />
        <Stack.Screen name="home" component={HomeScreen} />

      </Stack.Navigator>

      <View style={styles.toastParent}>
        <Toast /> 
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // TOAST
  toastParent:
  {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    zIndex: 1
  }

});

export default App;