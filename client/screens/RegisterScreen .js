import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation, route }) {

  const { item } = route.params || {};
  const isEditing = item && Object.keys(item).length > 0;

  const [formData, setFormData] = useState({
    name: item?.name || '',
    role: item?.role || '',
    email: item?.email || '',
    restaurantName: item?.restaurantName || '',
    password: item?.password || '',
    phone: item?.phone ? String(item.phone) : '',
  });

  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // VALIDATE 
  const validateInputs = () => {
    const { email, password, name } = formData;

    if (!email || !name || (!isEditing && !password)) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Name, email, and password are required!',
        position: 'bottom',
      });
      return false;
    }

    return true;
  };

 
// REGISTER
 const registerUsers = async () => {

      if (!validateInputs()) return;
      setLoading(true);

      try {

        const token = await AsyncStorage.getItem('token');

        if(!token){
          Toast.show({
            type: 'error',
            text1: 'Authorization Error',
            text2: 'No valid token found',
            position: 'bottom',
          });
          console.log('Token', token)
          setLoading(false);
          return;
        }

        const { email, password, role, name, phone, restaurantName } = formData;

        const response = await axios.post("https://acrid-street-production.up.railway.app/api/v2/register",
          {
            email, 
            password, 
            role, 
            name, 
            phone, 
            restaurantName
          },

          { headers: 
            { 
              'Content-Type': 'application/json' ,
              Authorization : `Bearer ${token}`
            } 
          });

        if(response.status === 201)
          {
            const {email} = response.data
            Toast.show({
              type: 'success',
              tetx1: 'Success',
              text2: `User ${email} created successfully`,
              position: 'bottom'
            });
            navigation.navigate("home");
          }
        
      } catch (error) {
        const errMessage = error.response?.data?.error || 'Something went wrong with adding the admin ';
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errMessage,
          position: 'bottom'
        });
      } finally
      {
        setLoading(false);
      }
    }
    // ENDS

    // UPDATE THE USER
    const updateAdmin = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if(!token){
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'No valid token found',
            position: 'bottom'
          });
          setLoading(false);
          return;
        };

        // EXTRACT DATA
        const 
        { email, 
          role, 
          name, 
          phone, 
          restaurantName 
        } = formData

        
        const updatedUser = 
        {
          email, 
          role, 
          name, 
          phone, 
          restaurantName
        }

        const response = await axios.put(`https://acrid-street-production.up.railway.app/api/v2/update/${item.id}`, 
          {updatedUser}, 
          {headers: 
            {
              "Content-Type": "application/json", 
              Authorization: `Bearer ${token}`
            }});

        if (response.status === 200)
          {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Admin updated successfully',
            position: 'bottom'
          });
          navigation.navigate('home');
        }

      } catch (error) {
        const errMessage = error.response?.data?.error || 'Error updating admin';
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errMessage,
          position: 'bottom'
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    // ENDS


    const updateField = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.registerContainer}>
          <View style={styles.header}>
            <Text style={styles.subtitle}>{isEditing ? 'Update the user details' : 'Welcome new member in the team'}</Text>
          </View>

          <View style={styles.form}>
            {/* Full Name Input */}
            <View style={styles.inputWrapper}>
              <MaterialIcons name="person" size={20} color="#2D3748" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#718096"
                value={formData.name}
                onChangeText={(value) => updateField('name', value)}
                autoCapitalize="none"
              />
            </View>

            {/* Role Input */}
            <View style={styles.inputWrapper}>
              <MaterialIcons name="work" size={20} color="#2D3748" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Role"
                placeholderTextColor="#718096"
                value={formData.role}
                onChangeText={(value) => updateField('role', value)}
                autoCapitalize="none"
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <MaterialIcons name="email" size={20} color="#2D3748" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#718096"
                value={formData.email}
                onChangeText={(value) => updateField('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Restaurant Name Input */}
            <View style={styles.inputWrapper}>
              <MaterialIcons name="store" size={20} color="#2D3748" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Restaurant Name"
                placeholderTextColor="#718096"
                value={formData.restaurantName}
                onChangeText={(value) => updateField('restaurantName', value)}
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
            <MaterialIcons name="lock" size={20} color="#2D3748" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, isEditing && styles.disabledInput]}
                placeholder="Password"
                placeholderTextColor="#718096"
                value={formData.password}
                onChangeText={(value) => updateField('password', value)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!isEditing}
              />
                {isEditing ?

                '' 
                : 

                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>

                  <MaterialIcons 
                    name={showPassword ? 'visibility' : 'visibility-off'} 
                    size={20} 
                    color="#2D3748" 
                  />

                </TouchableOpacity>
                }
            </View>

            {/* Phone Number Input */}
            <View style={styles.inputWrapper}>
              <MaterialIcons name="phone" size={20} color="#2D3748" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#718096"
                value={formData.phone}
                onChangeText={(value) => updateField('phone', value)}
                keyboardType="phone-pad"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity 
              style={[styles.registerButton, loading && styles.disabledButton]}
              onPress={isEditing ? updateAdmin : registerUsers}
              activeOpacity={0.9}
              disabled={loading}
            >
              <Text style={styles.registerButtonText}>
                {loading ? <ActivityIndicator size="small" color="#333" /> : (isEditing ? 'Update Account' : 'Create Account')}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  scrollContent: 
  {
    flexGrow: 1,
    justifyContent: 'center',
  },

  registerContainer: 
  {
    paddingVertical: 24,
    backgroundColor: '#F7FAFC',
    flex: 1,
  },

  header: 
  {
    marginBottom: 32,
  },

  title: 
  {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: 
  {
    fontSize: 18,
    color: '#4A5568',
    letterSpacing: 0.3,
    textAlign: 'center',
  },

  form: 
  {
    marginTop: 8,
  },

  inputWrapper: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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

  registerButton: 
  {
    backgroundColor: '#2B6CB0',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
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

  registerButtonText: 
  {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  disabledInput: 
  {
    backgroundColor: '#E2E8F0', 
    color: '#A0AEC0', 
  },

  disabledButton: 
  { 
    backgroundColor: '#A0AEC0' 
  },

});