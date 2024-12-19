import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [admins, setAdmins] = useState([
    {
      name: 'John Doe',
      role: 'Admin',
      email: 'john@example.com',
      restaurantName: 'Munchies',
      phone: '123-456-7890',
    },
    {
      name: 'Jane Smith',
      role: 'Manager',
      email: 'jane@example.com',
      restaurantName: 'Food Palace',
      phone: '987-654-3210',
    },
  ]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleAddAdmin = () => {
    navigation.navigate('Register');
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderAdminItem = ({ item }) => (
    <View style={styles.adminItem}>
      <Text style={styles.adminText}>Name: {item.name}</Text>
      <Text style={styles.adminText}>Role: {item.role}</Text>
      <Text style={styles.adminText}>Email: {item.email}</Text>
      <Text style={styles.adminText}>Restaurant: {item.restaurantName}</Text>
      <Text style={styles.adminText}>Phone: {item.phone}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Home Screen</Text>
        <TouchableOpacity onPress={handleAddAdmin} style={styles.addAdminButton}>
          <Text style={styles.addAdminButtonText}>Add Admin</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name, email, or restaurant"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredAdmins}
        renderItem={renderAdminItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.adminList}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
  },

  addAdminButton: {
    backgroundColor: '#2B6CB0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  addAdminButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  searchInput: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  adminList: {
    marginTop: 10,
  },

  adminItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  adminText: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 4,
  },
});
