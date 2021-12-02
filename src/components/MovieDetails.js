import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { json } from 'body-parser';
import { co } from 'co';
import { BackgroundColor } from 'chalk';
import set from 'set-value';

const MovieDetails = props => {
    const movie = props.route.params.movie
    const [movieLiked, setMovieLiked] = useState(false);

    useEffect ( ()=> {

        const run = async () => {
            // await AsyncStorage.setItem('@movies_liked', ''); pour vider la 'bdd'
            const myOldData = await getData();
            if (!myOldData) {
                setMovieLiked(false)
            } else {
                const favArray = myOldData.split(',')
                if (favArray.indexOf(movie.id.toString()) != -1) {
                    setMovieLiked(true)
                } else {
                    setMovieLiked(false)
                }
            }
        }
        
        run()
        

    }, [])

    const storeData = async (movieId) => {
        const myOldData = await getData();
        let myOldArray = myOldData ? myOldData.split(',') : [];
        const id = movieId.toString();
        console.log('etat du coeur : ' + movieLiked)

        if (myOldArray.indexOf(id) != -1) {
            console.log('déja dans les likes')
            myOldArray.splice(myOldArray.indexOf(id),1)
            setMovieLiked(false)
            try {
                await AsyncStorage.setItem('@movies_liked', myOldArray.toString())
            } catch (error) {
                console.log('erroorororororoor : ' + error)
            }
        } else {
            setMovieLiked(true)
            const tab = [...myOldArray, id];
            try {
              await AsyncStorage.setItem('@movies_liked', tab.toString())
            } catch (e) {
              // saving error
            }
        }
        
    }

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@movies_liked')
          console.log('data in storage : ' + jsonValue)
          return jsonValue != null ? jsonValue : null;
        } catch(e) {
          // error reading value
        }
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.posterImg}
                source={{
                    uri: 'https://image.tmdb.org/t/p/w500' + movie.poster_path
                }}
            />
            <Text style={styles.movieTitle}>{movie.original_title}</Text>
            <Text>{movie.id}</Text>
            <Text>Synopsis : {movie.overview}</Text>
            <Text>Note des spectateurs : {movie.vote_average} / 10</Text>
            <TouchableOpacity onPress={() => storeData(movie.id)}>
                <Image
                    style={movieLiked ? styles.likeImgRed : styles.likeImg}
                    source={require('../assets/images/coeur.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={getData}>
                <Text>test get data</Text>
            </TouchableOpacity>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 20 
    },
    posterImg:{
        width: 350,
        height: 350,
        borderRadius: 5
    },
    movieDescription: {
        textAlign: 'justify'
    },
    movieTitle: {
        fontSize: 50,
        color: '#E74D2C'
    },
    likeImg: {
        width: 100,
        height: 100,
    },
    likeImgRed: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
    }
})

export default MovieDetails