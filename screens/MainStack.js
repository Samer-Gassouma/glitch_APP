import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CourseDetailScreen from './CourseDetailScreen';
import {getAllFiles} from '../services/cs';

import { useAuth } from '../AuthContext';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();


const MainStack = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth();
  
  const name = "Guest"
  
  const [files, setFiles] = useState([]);


  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      const files = await getAllFiles();
      setFiles(files);
      setIsLoading(false);
    };
    fetchFiles();
  } , []);




  
  const sortedFiles = Object.values(files)
  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  .slice(0, 5);

 
  // Simulating data fetching
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      // Simulate fetching courses
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsLoading(false);
    };
    fetchCourses();
  }, []);

  const handleCoursePress = (course) => {
    navigation.navigate('CourseDetail', { course });
  };

  const handleViewMorePress = () => {
    navigation.navigate('Courses');
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.preUsername}>Welcome Back,</Text>
        <Text style={styles.username}>{name} </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loadingIndicator} />
      ) : (
          <Stack.Navigator 
               screenOptions={{
                 headerShown: false,
                 gestureEnabled: false,
                 cardStyle: { backgroundColor: '#ffffff' },
               }}
             >
              <Stack.Screen name="CourseList">
  {() => (
    <View>
          {sortedFiles.length === 0 && (
            <Text style={{ textAlign: 'center' }}>No courses found.</Text>
          )}
          <FlatList
            data={sortedFiles}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCoursePress(item)}>
                <View style={styles.courseItem}>
                  <Text style={styles.courseName}>{item.file}</Text>
                  <Text style={styles.courseDate}>Uploaded: {item.updatedAt
                    .toString()
                    .substring(0, 31)}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.downloadURL}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity onPress={handleViewMorePress} style={styles.viewMoreButton}>
            <Text style={styles.viewMoreButtonText}>View More</Text>
          </TouchableOpacity>
          <View style={styles.updatesContainer}>
            <Text style={styles.updatesTitle}>Recent Updates / Logs</Text>
            <Text style={styles.updateText}>- Fixed a bug in the login screen</Text>
            <Text style={styles.updateText}>- Added new courses to the catalog</Text>
          </View>
          <TouchableOpacity  style={styles.fab}>
        <Ionicons name="add-outline" size={30} color={'#fff'} />
      </TouchableOpacity>
          </View>
  )}
</Stack.Screen>
       <Stack.Screen name="CourseDetail" >
          {props => <CourseDetailScreen {...props} />}
       </Stack.Screen>
              
          </Stack.Navigator>
      )}
    </View>


  );
};

const styles = StyleSheet.create({
  fab: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 70,
    backgroundColor: '#1b222e',
    borderRadius: 100,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  loginButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  header: {
    marginTop: 20,
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  preUsername: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 5,
    marginLeft: 20,
    color: '#fff',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  courseItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  courseDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  viewMoreButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  viewMoreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  updatesContainer: {
    marginTop: 20,
  },
  updatesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  updateText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MainStack;
