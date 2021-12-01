import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ToDoItem from './ToDoItem';
import { NavigationContainer } from '@react-navigation/native';


import {
    TextInput,
    View,
    StyleSheet,
    FlatList,
    SafeAreaView
} from 'react-native';

const ToDoList = () => {
    const [search, setSearch] = useState('');
    const [itemTitle, setItemTitle] = useState('');
    const [data, setData] = useState(['faire les courses', 'marathon de NY', 'croquettes', 'apéro']);
    const [dataFiltered, setDataFiltered] = useState([...data]);

    const createItem = useCallback (() => {
        if (itemTitle.length > 0) setData([...data, itemTitle])
    }, [itemTitle, data])

    // Update todo list according to search bar and data values
    useMemo( () => {
        // Change all elements to lower case for better UX
        const arrayLower = data.map(e => e.toLowerCase())
        setDataFiltered(arrayLower.filter(todo => todo.includes(search.toLowerCase())))
    }, [data, search])

    const pressDelete = useCallback ((indexToRemove) => {
        console.log('indexToRemove : ' + indexToRemove)
        const copyArray = [...data];
        copyArray.splice(indexToRemove, 1)
        setData(copyArray)
    }, [data])
    
    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                value={search}
                onChangeText={setSearch}
                style={styles.search} 
                placeholder='Rechercher...'>
            </TextInput>
            <FlatList 
                style={styles.list}
                data={dataFiltered}
                renderItem={({item, index}) => {
                    return <ToDoItem item={item} index={index} onDelete={pressDelete}/>
                }}
            />
            
            <TextInput value={itemTitle} onEndEditing={createItem} onChangeText={setItemTitle} style={[styles.search, styles.addBox]} placeholder='A faire...'></TextInput>
        </SafeAreaView>
        
    )
    
    
    // <FlatList
    //         data={['Eliott', 'Pierre', 'Alex', 'Eliott', 'Pierre', 'Alex', 'Eliott', 'Pierre', 'Alex']}
    //         renderItem={({item}) => {
    //           return <TouchableOpacity onPress={() => {alert(item)}} style={styles.firstNameButton}><Text style={styles.firstname}>{item}</Text></TouchableOpacity>;
    //         }}
    //     />
} 

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    search:{
        marginTop: 20,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: 'green',
        height: 50,
        borderColor: 'black',
        marginHorizontal: 20,
    },
    addBox:{
        bottom: 0
    },
    list:{
    }
})

export default ToDoList