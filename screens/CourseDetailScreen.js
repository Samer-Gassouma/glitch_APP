import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddEditCourseScreen from './AddEditCourseScreen';
import { getSubjects,getSubjectCourse,getAllFiles,getFolders,getFileByDownloadURL } from '../services/cs';
import { Linking } from 'react-native';
import PdfView from '../Components/PdfView';

const Stack = createNativeStackNavigator();

const CourseDetailScreen = ({ route }) => {


  const { user } = useAuth();
  
  const userData = user._j;

  const is_admin = true;
  
  const { course } = route.params;

  
  const navigation = useNavigation();

  
  

  const handleReadPress = () => {
    navigation.navigate('PdfView', { downloadURL: course.downloadURL });
  };


  
  const handleDownloadPress = async (downloadURL) => {
    try {
      const supported = await Linking.canOpenURL(downloadURL);

      if (supported) {
        await Linking.openURL(downloadURL);
      } else {
        console.error('Cannot open the download link');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  const handleEditPress = () => {
    navigation.navigate('AddEditCourseScreen',  { course: course });
  };
  return (
    <View style={styles.container}>
        <Stack.Navigator  screenOptions={{
              headerShown: false,
              gestureEnabled: false,
              cardStyle: { backgroundColor: '#ffffff' },
              

            }}>

    <Stack.Screen name="CourseDetailScreen" >
  {() => (
    <View style={styles.container}>
      
      <Text style={styles.title}>Course Detail</Text>
      <Text style={styles.courseName}>{course.file ? course.file : course.filename}</Text>
      <Text style={styles.description}>Upload Data : {course.updatedAt}</Text>
      <TouchableOpacity style={styles.readButton} onPress={handleReadPress}>
        <Text style={styles.buttonText}>Read</Text>
      </TouchableOpacity>
    
      {course.Visibility == "download" && (

      <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadPress(course.downloadURL )}>
        <Text style={styles.buttonText}>Download</Text>
      </TouchableOpacity>
      )}
      {is_admin &&(
      <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      )}
     </View>
  )}
</Stack.Screen>
<Stack.Screen name="AddEditCourseScreen" component={AddEditCourseScreen} />
<Stack.Screen name="PdfView" component={PdfView} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courseName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  readButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  downloadButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#722F37',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CourseDetailScreen;
