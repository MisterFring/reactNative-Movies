import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    FlatList,
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

const likedMovies = props => {
    const [movies_liked, setMovies_liked] = useState([])

    useEffect ( ()=> {
        const run = async () => {
            // await AsyncStorage.setItem('@movies_liked', ''); pour vider la 'bdd'
            let likedMovies = (await getMoviesLiked());
            const test = likedMovies.split(',')
            const allMovies = JSON.parse(await getAllMovies());

            console.log('movies liked : ' + test)
            console.log('getall movies : ' + allMovies)

            const aaaaaa = allMovies.filter(e => test.includes(e.id.toString()))

            console.log('juste les films likés : ' + aaaaaa)

            setMovies_liked(aaaaaa)

            if (likedMovies.length > 0) {    
                const likedMoviesArray = likedMovies.split(',')
            }
        }
        
        run()
        

    }, [])

    const getMoviesLiked = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@movies_liked')
          console.log('data in storage : ' + jsonValue)
          return jsonValue != null ? jsonValue : null;
        } catch(e) {
          // error reading value
        }
    }

    const getAllMovies = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@movies_trending')
          console.log('data in storage : ' + jsonValue)
          return jsonValue != null ? jsonValue : null;
        } catch(e) {
          // error reading value
        }
    }

    return (
        <FlatList
            data={movies_liked}
            numColumns={2}
            style={styles.container}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity>
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

export default likedMovies