import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useMemo, useState, Linking, Share } from 'react';
import axios from 'axios';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { openInbox } from "react-native-email-link";
import { result } from 'lodash';


// import {DB_KEY} from 'react-native-dotenv'
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
    // const [movieData, setMovieData] = ueseState([]);
    const movieId = props.route.params.movie.id
    

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/370172/videos?api_key=` +  'd89f44ef7b82944aedf327888bbcccab')
            .then(res => {
                // const video = res.data.results;
                console.log(res.data.results[0])
            })
    }, [])


    const SendEmail = () => {
        if(Platform.OS==='android') {
            check(PERMISSIONS.ANDROID.READ_CONTACTS)
                .then((result) => {
                    switch(result) {
                        case RESULTS.DENIED:
                        request(PERMISSIONS.ANDROID.READ_CONTACTS)
                        console.log('denied')
                        break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            onSharePress = () => Share.share(shareOptions)
                            break;
                        case RESULTS.BLOCKED:
                            request(PERMISSIONS.ANDROID.READ_CONTACTS)
                            console.log('The permission is denied and not requestable anymore');
                            alert('Vous avez précédemment refusé l accès aux contacts, allez dans vos paramètres pour changer la permission')

                            break;
                }

            })

    } else if(Platform.OS === 'ios') {
        request(PERMISSIONS.IOS.CONTACTS)
            .then((result) => {
                if(result == 'granted') {
                    setIsPermitted(true)
                }else {
                    setIsPermitted(false)
                }
        })

    }


}

    const email = () => {
        Share.share(shareOptions)
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
