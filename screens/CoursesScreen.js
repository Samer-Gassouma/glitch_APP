import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import coursesParMaterial from './coursesParMaterial';
import { getSubjects,getSubjectCourse,getAllFiles,getFolders } from '../services/cs';

const Stack = createNativeStackNavigator();

const CoursesScreen = () => {
    const { width } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
 
    const [folders, setFolders] = useState([]);


  
    useEffect(() => {
      const fetchFolders = async () => {
        setIsLoading(true);
        const folders = await getFolders();
        setFolders(folders);
        setIsLoading(false);
      };
      fetchFolders();
    } , []);
  


    const handleMaterialPress = async (folder,fullPath) => {
      const subjects = await getSubjects(folder);
      navigation.navigate('CoursesParMaterial', { courses: subjects,fullPath :fullPath });
    };

    if (!isLoading && !folders.length) {
      return (
        <View style={
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }
        }>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#777',
            }}

          >No Subejct List found.</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" style={styles.loadingIndicator} />
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
                <FlatList
                  data={folders}
                  numColumns={width > 400 ? 2 : 1}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleMaterialPress(item.folder,item.fullPath)}
                      style={styles.materialCard}
                    >
                      <View style={styles.materialInfo}>
                        <Text style={styles.materialName}>
                          {item.folder }  
                          
                        </Text>
                        <Text style={styles.materialCof}>Cofficient: {item.Cof}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.fullPath}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="CoursesParMaterial" component={coursesParMaterial} />
          </Stack.Navigator>
        )}
      </View>
    );
  };



    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'linear-gradient(to right, #f0f8ff, #e6f0ff)',
          },
          scrollContainer: {
            flexGrow: 1,
            justifyContent: 'flex-start',
            paddingTop: 50,
            contentContainerStyle: {
              paddingHorizontal: 15, 
            },
          },
      centeredBox: {
        alignItems: 'center',
      },
      materialCard: {
        flex : 1,
        backgroundColor: '#fff',
        borderRadius: 25,
        elevation: 10, 
        padding: 40,
        margin: 5,
        marginTop: 25,
        flexBasis: '45%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
      },
    
      materialName: {
        fontSize: 15, // Increased font size
        fontWeight: 'bold',
        color: '#3366ff', 
      },
    
      materialInfo: {
        flex: 1,
        justifyContent: 'space-between',
      },
    
      materialCof: {
        fontSize: 14,
        color: '#777',
      },
      loadingIndicator: {
        marginTop: 100,
      },
    });
    
    export default CoursesScreen;