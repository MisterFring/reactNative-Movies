import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';

const ToDoItem = props => {
    const navigation = useNavigation();
    return ( 
        <TouchableOpacity onPress={() =>
            navigation.navigate('ToDoListDetails', {title : props.item})
        }>
            <View style={styles.itemContainer}>
                <Text>{props.item}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => {props.onDelete(props.index)}}>
                    <Text>
                        DELETE
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    
    )
} 

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 50,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'gray',
        height: 50
    },
    deleteButton: {
        padding: 10,
        backgroundColor: 'red'
    }
})
export default ToDoItem