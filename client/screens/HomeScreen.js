import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);

  // FETCH ADMINS
  useEffect(() => {

    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');

        if(!token){
          console.log("No token found");
        }

        const response = await axios.get(`https://acrid-street-production.up.railway.app/api/v2/users`, { headers: { Authorization : `Bearer ${token}`}});

        if (response.status === 200)
          {
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: "Admins fetched successfully",
              position: 'bottom'
            });

            setAdmins(response.data.admins);
            console.log("Admins data", response.data.admins);
          }
      } catch (error) {
        const errMessage = response?.data?.error || 'Something went wrong with fetching data ';
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

    fetchAdmins();

  }, []);
  // ENDS

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleAddAdmin = () => {
    navigation.navigate('Register');
  };

  const handleProfileNav = () => {
    navigation.navigate('Profile');
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderAdminItem = ({ item }) => (
    <Animated.View style={styles.adminItem}>
      <View style={styles.adminHeader}>
        <View style={styles.adminInfo}>
          <Text style={styles.adminName}>{item.name}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{item.role}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="pencil" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.adminDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="mail-outline" size={18} color="#718096" />
          <Text style={styles.detailText}>{item.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="restaurant-outline" size={18} color="#718096" />
          <Text style={styles.detailText}>{item.restaurantName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="call-outline" size={18} color="#718096" />
          <Text style={styles.detailText}>{item.phone}</Text>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={handleAddAdmin} style={styles.iconButton}>
            <Ionicons name="add-circle" size={28} color="#4A90E2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfileNav} style={styles.iconButton}>
            <Ionicons name="person-circle" size={28} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#A0AEC0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search admins..."
            placeholderTextColor="#A0AEC0"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {loading? 
      
      <View style={styles.loader}>
        <ActivityIndicator size={'large'}/> 
      </View>
      
      : 
      <FlatList
        data={filteredAdmins}
        renderItem={renderAdminItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.adminList}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      }
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A365D',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#1A365D',
  },
  adminList: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },
  adminItem: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  adminHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  adminInfo: {
    flex: 1,
  },
  adminName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A365D',
    marginBottom: 4,
  },
  roleBadge: {
    backgroundColor: '#EBF8FF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#2B6CB0',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  adminDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    flex: 1,
    fontSize: 15,
    color: '#2D3748',
  },

  loader:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});