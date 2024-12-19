import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

// STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

// ICONS
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // HANDLE LOGIN
    const handleLogin = async () => {

        setLoading(true);
        try {
            const response = await axios.post(
                'https://acrid-street-production.up.railway.app/api/v2/login',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const { token, email: userEmail, role: userRole } = response.data;
            console.log(response.data);

            if (token && userRole === 'super-admin') {
                Toast.show({
                    type: 'success',
                    text1: `Welcome back, ${userEmail}!`,
                    text2: 'You have successfully logged in.',
                    position: 'bottom',
                });

                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('userEmail', userEmail);
                navigation.navigate('home');

                return true;
            } else {
                Toast.show({
                    type: 'error',
                    text1: `Error`,
                    text2: 'Login failed. Not super admin',
                    position: 'bottom',
                });
                return false;
            }
        } catch (error) {
            console.error("Login error:", {
                message: error.message,
                response: error.response ? error.response.data : "No response data",
                status: error.response ? error.response.status : "No status",
                request: error.request,
            });

            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";

            Toast.show({
                type: 'error',
                text1: `Error`,
                text2: `${errorMessage}`,
                position: 'bottom',
            });

            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Welcome back! 👋</Text>
                    <Text style={styles.title}>Login to admin portal</Text>
                    <Text style={styles.subtitle}>Good to see you again</Text>
                </View>

                <View style={styles.form}>
                    {/* Email Input */}
                    <View style={styles.inputWrapper}>
                        <MaterialIcons name="email" size={22} color="#2D3748" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#718096"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputWrapper}>
                        <MaterialIcons name="lock" size={22} color="#2D3748" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor="#718096"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <Pressable
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <MaterialIcons
                                name={showPassword ? 'visibility' : 'visibility-off'}
                                size={22}
                                color="#2D3748"
                            />
                        </Pressable>
                    </View>

                    <Pressable
                        style={styles.loginButton}
                        onPress={handleLogin}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.loginButtonText}>{loading? <ActivityIndicator size={'small'} color={'#333'}/> : 'Sign In'}</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  loginContainer: 
  {
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  header: 
  {
    alignItems: 'center',
    marginBottom: 40,
  },

  welcomeText: 
  {
    fontSize: 24,
    fontWeight: '600',
    color: '#2B6CB0',
    marginBottom: 12,
  },

  title: 
  {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: 
  {
    fontSize: 16,
    color: '#4A5568',
    letterSpacing: 0.3,
    textAlign: 'center',
  },

  form: 
  {
    width: '100%',
    maxWidth: 400,
  },

  inputWrapper: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 60,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  inputIcon: 
  {
    marginRight: 12,
  },

  input:
   {
    flex: 1,
    color: '#2D3748',
    fontSize: 16,
    letterSpacing: 0.3,
  },

  eyeIcon: 
  {
    padding: 8,
  },

  forgotPassword: 
  {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: 4,
  },

  forgotPasswordText: 
  {
    color: '#2B6CB0',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  loginButton: 
  {
    backgroundColor: '#2B6CB0',
    borderRadius: 16,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#2B6CB0',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  
});