import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';

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
            <ScrollView style={styles.blockDetails}>
                <Image 
                    resizeMode='cover'
                    style={styles.posterImg}
                    source={{
                        uri: 'https://image.tmdb.org/t/p/w500' + movie.poster_path
                    }}
                />
                <Text style={styles.movieTitle}>{movie.original_title}</Text>
                <Text>Synopsis : {movie.overview}</Text>
                <Text>Note des spectateurs : {movie.vote_average} / 10</Text>
            </ScrollView>


            <View style={styles.imagesContainer}>
                <TouchableOpacity onPress={() => storeData(movie.id)}>
                    <Image
                        style={styles.likeImg}
                        source = { movieLiked ? require('../assets/images/coeur-rouge.png') : require('../assets/images/coeur.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                    source={require('../assets/images/share.png')}
                    style={styles.shareIcon}
                    />
                </TouchableOpacity>
            </View>


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
    shareIcon: {
        width: 30, 
        height: 30
    },
    imagesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 0
    },
    blockDetails: {
        maxHeight: '80%'
    }

})

export default MovieDetails