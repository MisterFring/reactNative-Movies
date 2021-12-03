import React from "react";
import axios from "axios";
import KeyboardSpacer from "react-native-keyboard-spacer";
import FlatListPrenom from "./flatList";
import ToDoList from "./src/components/ToDoList";
import TodoListDetails from "./src/components/ToDoListDetails";
import Movies from "./src/components/Movies";
import Login from "./src/components/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./src/components/TabNavigator";
import Register from "./src/components/Register";

const Stack = createNativeStackNavigator();

import { StyleSheet } from "react-native";
import ToDoItem from "./src/components/ToDoItem";
import MovieDetails from "./src/components/MovieDetails";
import likedMovies from "./src/components/LikedMovies";

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Movies"
        // screenOptions={{
        //   headerShown: false
        // }}
      >
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="TabNav" component={TabNavigator} />

        {/* <Stack.Screen name="LikedMovies" component={likedMovies} />
        <Stack.Screen name="ToDoList" component={ToDoList} />
        <Stack.Screen name="ToDoListDetails" component={TodoListDetails} />*/}
        <Stack.Screen name="Movies" component={Movies} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    // <SafeAreaView style={styles.container}>
    //     {/* <Movies/> */}
    //     {/*<FlatListPrenom/>*/}
    //     {/* <Login/> */}
    //     <ToDoList/>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    alignItems: "center",
  },

  redBox: {
    backgroundColor: "red",
    flex: 1 / 5,
  },
  greenBox: {
    backgroundColor: "green",
    flex: 1 / 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  blueBox: {
    backgroundColor: "blue",
    flex: 3 / 5,
  },
  yellowSquare: {
    backgroundColor: "yellow",
    height: 30,
    width: 30,
    borderWidth: 4,
    borderColor: "black",
    borderRadius: 4,
  },
});

export default App;
