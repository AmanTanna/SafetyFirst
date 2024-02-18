import MapView from "react-native-maps";
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FAB } from 'react-native-paper';




// export default App;

// HomeScreen component
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      { <MapView
        style={stylesmap.map}
        initialRegion={{
          latitude: 43.54857207929054,
          longitude: -79.66558202872807,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> }
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AnotherScreen')}
      />
    </View>
  );
};

// AnotherScreen component
const AnotherScreen = () => {
  return (
    <View style={styles.container}>
      {/* Contents of the another screen */}
    </View>
  );
};

// Stack Navigator
const Stack = createStackNavigator();

// App component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AnotherScreen" component={AnotherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

const stylesmap = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
