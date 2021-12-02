import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from './Movies';
import LikedMovies from './LikedMovies';
import { View, Image } from 'react-native';


const Tab = createBottomTabNavigator();



// import {DB_KEY} from 'react-native-dotenv'

const TabNavigator = () => {
    const [nbMoviesLiked, setNbMoviesLiked] = useState(0)
    useEffect( () => {
        getNumberOfMoviesLiked()
    }, [nbMoviesLiked])
    const getNumberOfMoviesLiked = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@movies_liked')
          console.log('@movies_liked : ' + jsonValue)
          const test = jsonValue.split(',')
          setNbMoviesLiked(test.length)
        } catch(e) {
          // error reading value
        }
    }
    return (
        <Tab.Navigator>
            <Tab.Screen name='Movies' component={Movies} options={{
                tabBarIcon: () => (
                    <Image
                        source={require('../assets/images/coeur.png')}
                        style={{ width: 26, height: 26}}
                    />
                )
            }}/>
            <Tab.Screen name='LikedMovies' component={LikedMovies} options={{ tabBarBadge: nbMoviesLiked }}/>
        </Tab.Navigator>
    )

}
export default TabNavigator