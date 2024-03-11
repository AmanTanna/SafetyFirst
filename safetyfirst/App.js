
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import { useForm } from 'react-hook-form';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FAB } from 'react-native-paper';
//import {AddressToCoords} from './data/ConvertCoords.js'







const HomeScreen = () => {
  const navigation = useNavigation(); // Access navigation hook


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.54857207929054,
          longitude: -79.66558202872807,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      </MapView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Add a Location to avoid')}
      />
    </View>
  );
};

const AnotherScreen = ({AddressToCoords}) => {
  const { control, handleSubmit, register, getValues } = useForm();
  const navigation = useNavigation(); // Access navigation hook
  const [helper, sethelper] = useState();
  const [helper2, sethelper2] = useState();
  const [helper3, sethelper3] = useState();
  const [helper4, sethelper4] = useState();
  const [helper_new, sethelper_new] = useState();

  const onSubmit = ({AddressToCoords}) => {
    console.log(helper, helper2, helper3, helper4, helper_new);
    // Here you can perform further actions with the form data, like sending it to a server
    navigation.navigate('Home'); // Navigate back to the Home screen
    //console.log(AddressToCoords(helper2, "65d174a784a72523862703trh8e62ef")[0].lat, AddressToCoords(helper2, "65d174a784a72523862703trh8e62ef")[0].lng)
     //Test the code now
     function AddressToCoords(address, api_key) {
       /**
        * Take as input an address, then return a promise that can be resolved datawise, holding the lat and lon values
        * data[0].lat
        * data[0].lon
        */
       var addr = address.replace(/ /g, "+");


       try {
         const response =  fetch(
           'https://geocode.maps.co/search?q=University+of+Waterloo&api_key=65e16d75c022f644333604ikhb986a9'
         );


         if (!response.ok) {
           throw new Error("Could not fetch resource");
         }

         const data =   response.json();
         return data;
       } catch (error) {
         console.error("Error, could not attempt fetch of maps");
       }
     }
     var key = "65d174a784a72523862703trh8e62ef";
     var cds = AddressToCoords("University of Waterloo", "65d174a784a72523862703trh8e62ef");
     //var addr = CoordsToAddress(43.71697314176533, -79.33889076504421, key);
     console.log("Getting Coordinates for University of Waterloo");
     cds.then((data) => {
       console.log(data);
     });
//     console.log("Getting Address for Ontario Science Center");
//     addr.then((data) => {
//       console.log(data);
//     });
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={sethelper}
        value={helper}
      />
      <Text style={styles.title}>Location to avoid</Text>
      <TextInput
        style={styles.input}
        onChangeText={sethelper2}
        value={helper2}
      />
      <Text style={styles.title}>Last Incident</Text>
      <TextInput
        style={styles.input}
        onChangeText={sethelper3}
        value={helper3}
      />
      <Text style={styles.title}>Frequency</Text>
      <TextInput
        style={styles.input}
        onChangeText={sethelper4}
        value={helper4}
      />
      <Text style={styles.title}>Other Comments and Advice</Text>
      <TextInput
        style={styles.input}
        onChangeText={sethelper_new}
        value={helper_new}
      />
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add a Location to avoid" component={AnotherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;


