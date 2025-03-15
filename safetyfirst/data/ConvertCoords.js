import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import AddLocationScreen from './screens/AddLocationScreen';
import RouteScreen from './screens/RouteScreen';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Unrecognized WebSocket connection',
  'Failed to register background service' // Expo specific log
]);

// Create navigation stack
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f4511e',
    accent: '#f4511e',
  },
};

// Home stack that includes the main map and add location screens
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="HomeMap"
        component={HomeScreen}
        options={{ title: 'Safety First' }}
      />
      <Stack.Screen
        name="AddLocation"
        component={AddLocationScreen}
        options={{ title: 'Add Location to Avoid' }}
      />
    </Stack.Navigator>
  );
};

// Route stack for the route planning feature
const RouteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="SafeRoutes"
        component={RouteScreen}
        options={{ title: 'Plan Safe Route' }}
      />
    </Stack.Navigator>
  );
};

// App component
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="#e03e00" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#f4511e',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: {
              paddingBottom: 5,
              height: 60,
            },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarLabel: 'Safety Map',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="map-marker-alert" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Routes"
            component={RouteStack}
            options={{
              tabBarLabel: 'Safe Routes',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="routes" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
