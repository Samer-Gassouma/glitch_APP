import React, { useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddEditCourseScreen from './AddEditCourseScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const AdminScreen = () => {
  const navigation = useNavigation();
  const handleAddCourse = () => {
    navigation.navigate('AddEditCourseScreen');
  };

  const [systemHealth, setSystemHealth] = useState(fakeSystemHealth);




  return (
    <View style={styles.container}>
         <Stack.Navigator  screenOptions={{
              headerShown: false,
              gestureEnabled: false,
              cardStyle: { backgroundColor: '#ffffff' },
              

            }}>
                <Stack.Screen name="AdminScreen">
                {() => (
    <View style={styles.container}>
        <Text style={styles.sectionTitle}>Content Management</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
        <Text style={styles.addButtonLabel}>+ Add Course</Text>
      </TouchableOpacity>
       
        
      

<Text style={styles.sectionTitle}>System Health</Text>
      <Text>Server Status: {systemHealth.serverStatus}</Text>
      <Text>Database Status: {systemHealth.databaseStatus}</Text>
      
     </View>
  )}
</Stack.Screen>
      <Stack.Screen name="AddEditCourseScreen" >
        {() => <AddEditCourseScreen />}
      </Stack.Screen>
      </Stack.Navigator>
      
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f8ff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  addButton: {
    backgroundColor: '#ff5722',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

const fakeCourses = [
  { id: 1, name: 'Course 1', approved: false },
  { id: 2, name: 'Course 2', approved: true },
  { id: 3, name: 'Course 3', approved: false },
];

const fakeSystemHealth = {
  serverStatus: 'Running',
  databaseStatus: 'Connected',
};

export default AdminScreen;
