import React from 'react';
import { useNavigation } from '@react-navigation/native';


import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const TodoListDetails = props => {
    const navigation = useNavigation()
    const goBack = () => {
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack}>
                <Text>RETOUR</Text>
            </TouchableOpacity>
            <Text style={styles.toDo}>{props.route.params.title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        top: 100,
        flex: 1
    },
    toDo: {
        fontSize : 50
    }
})
export default TodoListDetails