import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    restaurantName: '',
    password: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    console.log('Register:', formData);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.registerContainer}>
          <View style={styles.header}>
            <Text style={styles.subtitle}>Welcome new member in team</Text>
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
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#718096"
                value={formData.password}
                onChangeText={(value) => updateField('password', value)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <MaterialIcons 
                  name={showPassword ? 'visibility' : 'visibility-off'} 
                  size={20} 
                  color="#2D3748" 
                />
              </TouchableOpacity>
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
              style={styles.registerButton} 
              onPress={handleRegister}
              activeOpacity={0.9}
            >
              <Text style={styles.registerButtonText}>Create Account</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  registerContainer: {
    padding: 24,
    backgroundColor: '#F7FAFC',
    width: '100%'
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#4A5568',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  form: {
    marginTop: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#2D3748',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  eyeIcon: {
    padding: 8,
  },
  registerButton: {
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
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

});