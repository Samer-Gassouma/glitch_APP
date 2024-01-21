import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSubjects,getSubjectCourse,getAllFiles,getFolders } from '../services/cs';

import {
  FIREBASE_API_KEY,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_APP_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_AUTH_DOMAIN,
} from "@env"; 

import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";

import {
  getDatabase,
  ref as dbRef,
  push,
  serverTimestamp,
} from "firebase/database";


const CoursesParMaterial = ({ route, navigation }) => {
  const { courses,fullPath } = route.params;
  const handleMaterialPress = async (fullPath) => {
    const subjects = await getSubjects(fullPath);
    navigation.navigate('CoursesParMaterial', { courses: subjects,fullPath :fullPath });
  };

  const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    appId: FIREBASE_APP_ID,
    projectId: FIREBASE_PROJECT_ID,
    authDomain: FIREBASE_AUTH_DOMAIN,
  };

  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }

  const database = getDatabase();

  

  const renderCourseItem = ({ item }) => {
    if (item.folder) {
      const fpath = fullPath+"/"+item.folder;
      const prefixToRemove = "LSI2/";

      const paaath = fpath.replace(new RegExp(`^${prefixToRemove}`), ''); 

      return (
        <TouchableOpacity style={styles.courseItem1} onPress={() => handleMaterialPress(paaath)}>
          <View style={styles.courseInfo}>
            <Text style={styles.courseName}>{item.folder}</Text>
          </View>
          <TouchableOpacity style={styles.viewMoreButton1} onPress={() => handleMaterialPress(paaath)}>
            <Text style={styles.viewMoreButtonText1}>Open Folder</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      );
    } else {

      
      return (
        <TouchableOpacity style={styles.courseItem} onPress={() => navigation.navigate('CourseDetail', { course: item })}>
          <View style={styles.courseInfo}>
            <Text style={styles.courseName}>{item.filename}</Text>
            <Text style={styles.updateDate}>Upload Date: {item.uploadDate}</Text>
          </View>
          <TouchableOpacity style={styles.viewMoreButton} onPress={() => navigation.navigate('CourseDetail', { course: item })}>
            <Text style={styles.viewMoreButtonText}>View More</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>
          Path: {fullPath}
        </Text>
      </View>
      {courses.length === 0 && (
        <Text style={{ 
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 20,
          
        }}>No courses found.</Text>
      )
      }
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => (item.folder ? item.folder : item.fullPath)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    marginLeft: 20,
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

  courseItem1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ff5722',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  updateDate: {
    fontSize: 14,
    color: '#777',
  },
  viewMoreButton: {
    backgroundColor: '#ff5722',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  viewMoreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  viewMoreButton1: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  viewMoreButtonText1: {
    color: '#ff5722',
    fontWeight: 'bold',
  },
});

export default CoursesParMaterial;
