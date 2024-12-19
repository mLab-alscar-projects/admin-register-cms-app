import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function SplashScreen  ({ navigation }) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
    ]).start(() => {
      navigation.replace('Login');
    });
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Text style={styles.logo}>Your App Logo</Text>
        <Text style={styles.subtitle}>Welcome to Our App</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
    // Splash Screen Styles
    splashContainer: {
      flex: 1,
      backgroundColor: '#3498db',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
    },
    logo: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      color: 'white',
      opacity: 0.8,
    },
  
    // Common Styles
    container: {
      flex: 1,
      backgroundColor: '#f4f7fa',
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: '#7f8c8d',
      marginBottom: 30,
    },
    inputContainer: {
      width: '100%',
      marginBottom: 20,
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 10,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
  });