import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Movies = () => {
    const [data, setData] = useState([]);
    // const test = new TMDB()
    const navigation = useNavigation()
    
    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=' + 'd89f44ef7b82944aedf327888bbcccab')
            .then(res => {
            const movies = res.data.results;
            setData(movies)
            try {
                AsyncStorage.setItem('@movies_trending', JSON.stringify(movies))
            } catch (error) {
                console.log('erroorororororoor : ' + error)
            }
        })
    }, [])
    
    return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data}
                    style={styles.moviesList}
                    numColumns={2}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={ () => navigation.navigate('MovieDetails', {movie : item})}>
                                <View style={styles.movieContainer}>
                                    <Image
                                        resizeMode='cover'
                                        source={{
                                            uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path
                                        }}
                                        style={styles.posterImg}
                                    />
                                    <Text>{item.original_title} - {item.release_date}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />       
            </SafeAreaView>   
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    moviesList:{
        flex: 1,
    },
    movieContainer:{
        width: "50%",
        padding: 10,
    },
    posterImg:{
        width: 150,
        height: 150
    }
})

export default Movies