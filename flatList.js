import React from 'react';
import {
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet
  } from 'react-native';

const FlatListPrenom = () => {
    return <FlatList
            data={['Eliott', 'Pierre', 'Alex', 'Eliott', 'Pierre', 'Alex', 'Eliott', 'Pierre', 'Alex']}
            renderItem={({item}) => {
              return <TouchableOpacity onPress={() => {alert(item)}} style={styles.firstNameButton}><Text style={styles.firstname}>{item}</Text></TouchableOpacity>;
            }}
        />
} 

const styles = StyleSheet.create({   
  firstNameButton: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor: 'gray',
    height: 50,
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
    fontSize: 20,
    justifyContent: 'center'
  },
  firstname : {
    fontSize: 20
  },
});

export default FlatListPrenom