import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function ProfileScreen({ navigation }) {
  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const admin = await AsyncStorage.getItem('adminData');
      if (admin) {
        const parsedData = JSON.parse(admin);
        setAdminData(parsedData);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error loading data',
        position: 'bottom'
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('adminData');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error logging out',
        position: 'bottom'
      });
    }
  };

  const DataRow = ({ label, value }) => (
    <View style={styles.dataRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <DataRow label="Name" value={adminData.name} />
          <DataRow label="Email" value={adminData.email} />
          <DataRow label="Role" value={adminData.role} />
          <DataRow label="Restaurant" value={adminData.restaurantName} />
          <DataRow label="Phone" value={adminData.phone} />
          <DataRow 
            label="Created" 
            value={formatDate(adminData.timestamp)} 
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#DC2626" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: 
  {
    flex: 1,
    padding: 16,
  },

  card: 
  {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  dataRow: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },

  label: 
  {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },

  value: 
  {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '400',
  },

  logoutButton: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FEE2E2',
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },

  logoutText: 
  {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
  },
});