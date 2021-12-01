import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
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

const MovieDetails = props => {
    const movie = props.route.params.movie
    return (
        <View style={styles.container}>
            <Image
            source={require('../assets/images/share.png')}
            style={styles.shareIcon}
          />
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
            <TouchableOpacity>
                <Image
                    style={styles.likeImg}
                    source={require('../assets/images/coeur.png')}
                />
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
    likeImg: {
        width: 100,
        height: 100
    },
    movieTitle: {
        fontSize: 50,
        color: '#E74D2C'
    }, 
    shareIcon: {
        width: 30, 
        height: 30,
        marginLeft: 300,
        marginBottom: 20
    }
})

export default MovieDetails