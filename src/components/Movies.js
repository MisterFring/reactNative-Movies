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
    TouchableOpacity,
    TextInput
} from 'react-native';

const Movies = () => {
    const [search, setSearch] = useState('');
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

    // Update movies list according to search bar and data values
    const dataFiltered = useMemo( () => {

        console.log('search : ' + search)
        
        // Change all elements to lower case for better UX
        return data.filter(movie => movie.original_title.toLowerCase().includes(search.toLowerCase()))
    }, [data, search])
    
    return (
            <SafeAreaView style={styles.container}>
                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    style={styles.search} 
                    placeholder='Rechercher...'>
                </TextInput>
                <FlatList
                    data={search ? dataFiltered : data}
                    style={styles.moviesList}
                    numColumns={2}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={ () => navigation.navigate('MovieDetails', {movie : item})}>
                                <View style={styles.movieContainer}>
                                    <Image
                                        source={{
                                            uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path
                                        }}
                                        style={styles.posterImg}
                                    />
                                    <Text style={styles.movieTitle}>{item.original_title}</Text>
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
        alignItems: 'center',
    },
    moviesList:{
        flex: 1,
        
    },
    movieContainer:{
        padding: 10,
    },
    posterImg:{
        width: 150,
        height: 150,
        borderRadius: 5
    },
    search:{
        marginTop: 20,
        borderWidth: 2,
        borderRadius: 5,
        height: 50,
        borderColor: 'black',
        marginHorizontal: 20,
        width: '90%'
    },
    movieTitle: {
        maxWidth: '50%'
    }
})

export default Movies