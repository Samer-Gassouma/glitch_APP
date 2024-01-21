import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,Button,  } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import {getFolders,UploadFile} from '../services/cs';
import { useAuth } from '../AuthContext';


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


const AddEditCourseScreen = ({ route }) => {
  const [file, setFile] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
  const [visibilityMode, setVisibilityMode] = useState('none'); 
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { course } = route?.params || {};
  const { user } = useAuth();
  

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


  const listFile = async () => {
    const storage = getStorage();
  
    const listRef = ref(storage, "LSI2");
  
    const listResp = await listAll(listRef);
    return listResp.items;
  };


  const uploadToFirebase = async (path, uri, name, onProgress) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(getStorage(), `${path}/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });

          const fileDetailsRef = dbRef(database, 'fileDetails');
          push(fileDetailsRef, {
            userId: user._j,
            path: path,
            visibilityMode,
            uploadDate: Date.now(),
            fileName: name,
            downloadUrl,
          });
        }
      );
    });
  };
 

  useEffect(() => {
 
    const fetchSubjects = async () => {
      try {
        const response = await getFolders();
        if (response.length === 0) {
          throw new Error('No subjects found');
        }
        if(response.length > 0){
        setSubjects(response);
        setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
      
  }, []);

  
  useEffect(() => {
    if (course) {
      setSelectedSubject(course.subject);
      setVisibilityMode(course.visibilityMode);
    }
  }, [course]);

  const handleChooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (result.assets[0].uri !== undefined) {
        setFile(result.assets[0]);
      }
    } catch (error) {
      console.error('Error choosing file:', error);
    }
  };
  

  const handleSubmit = async () => {
    setLoading(true);

    const uri = file.uri;
    const fileName = file.name;

    try {
      const uploadResp = await uploadToFirebase(selectedSubject, uri, fileName, (progressEvent) => {
        console.log(`Upload Progress: ${progressEvent}%`);
      });

      if (uploadResp) {
        alert('File uploaded successfully');
        setSelectedSubject('');
        setVisibilityMode('none');
        setFile(null);
      }

      listFile().then((listResp) => {
        const files = listResp.map((value) => ({ name: value.fullPath }));
        setFile(files);
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error appropriately (e.g., show an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course ? 'Edit Course' : 'Add Course'}</Text>

      <TouchableOpacity style={styles.chooseFileButton} onPress={handleChooseFile}>
        <Text style={styles.chooseFileButtonText}>Choose File</Text>
      </TouchableOpacity>

      {file && (
        <View style={styles.fileInfoContainer}>
          <Text style={styles.fileNameLabel}>File Name:</Text>
          <Text style={styles.fileNameText}>{file.name}</Text>
        </View>
      )}

      <Picker
        selectedValue={selectedSubject}
        onValueChange={(itemValue) => setSelectedSubject(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Subject" value="" />
        {subjects.map((subject, index) => (
          <Picker.Item key={index} label={subject.folder} value={subject.fullPath} />
        ))}
      </Picker>

      <Picker
        selectedValue={visibilityMode}
        onValueChange={(itemValue) => setVisibilityMode(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Visibility Mode" value="none" />
        <Picker.Item label="Not Visible" value="none" />
        <Picker.Item label="Read" value="read" />
        <Picker.Item label="Download" value="download" />
      </Picker>

      

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chooseFileButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  chooseFileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fileInfoContainer: {
    marginVertical: 15,
  },
  fileNameLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2c3e50',
  },
  fileNameText: {
    fontSize: 16,
    color: '#34495e',
  },
  picker: {
    height: 40,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddEditCourseScreen;
