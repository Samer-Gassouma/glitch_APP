import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '../AuthContext';
import MainStack from '../screens/MainStack';
import CoursesScreen from '../screens/CoursesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminScreen from '../screens/AdminSceen';
const Tab = createBottomTabNavigator();

function TabBarIcon(props) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  }
  
  const Navbar = () => {
    const { user } = useAuth();
    
    if (!user) {
      return null;
    }
    //const is_admin = user._j.is_admin;
const is_admin = true;
       return (
      <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ff5722',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
        },
        headerShown: false,
        gestureEnabled: false,
        cardStyle: { backgroundColor: '#ffffff' },
      }}
      >
        <Tab.Screen
          name="Main"
          component={MainStack}
          options={{
            title: 'Main',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tab.Screen
          name="Courses"
          component={CoursesScreen}
          options={{
            title: 'Courses',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        {is_admin &&(
         <Tab.Screen
          name="Admin"
          component={AdminScreen}
          options={{
            title: 'Admin',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        )}
      </Tab.Navigator>
    );
  };
  

export default Navbar;