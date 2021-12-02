import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from './Movies';
import LikedMovies from './LikedMovies';


const Tab = createBottomTabNavigator();


// import {DB_KEY} from 'react-native-dotenv'
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Movies' component={Movies}/>
            <Tab.Screen name='LikedMovies' component={LikedMovies}/>
        </Tab.Navigator>
    )

}
export default TabNavigator