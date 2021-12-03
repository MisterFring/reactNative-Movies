import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet
  } from 'react-native';

const Login = () => {
    const navigation = useNavigation()
    const [mail, setMail] = useState('')
    const [pwd, setPwd] = useState('');

    const pressButton = useCallback( () => {
        loginUser()
    }, [mail, pwd]);

    const loginUser = async () => {
        // await AsyncStorage.setItem('@users', ''); //pour vider la 'bdd'
        AsyncStorage.getItem('@users', (err, result) => {
            console.log('in storage : ' + result)
            let bool = false;

            const myArrayOfUsers = JSON.parse(result)

            if (myArrayOfUsers) {
                for (let i = 0; i < myArrayOfUsers.length; i++) {
                    const element = myArrayOfUsers[i];
                    if ((element.mail == mail) && (element.password == pwd)) {
                        console.log('user retrouvé')
                        bool = true
                        break
                    }
                }
            }
            
            if (bool) {
                navigation.navigate('TabNav')
            } else {
                alert('combinaison mail / mot de passe fausse')
            }
        });
    }


    return (
    <ScrollView>
        <View style={styles.center}>
          <Image
            source={{
                uri: 'https://lh3.googleusercontent.com/proxy/nuggHz1hsPEiIL0ndXZvypUAlYRSxJ0FX_aitoQ5TrLPmhxe1mG2KxE5WCheD1H1zLIyaBznSRcB-d5j0RNNfuke6BeE-CPJRuGGlvZfnuN5dGo8Dg'
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputBox} placeholder={'Adresse mail'} value={mail} onChangeText={setMail}/>
          <TextInput onChangeText={setPwd} value={pwd} style={styles.inputBox} placeholder={'Mot de passe'} />
        </View>
        <View style={styles.center}>
          <TouchableOpacity style={styles.button} onPress={pressButton}>
            <Text>Envoyer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
    )

    
}

const styles = StyleSheet.create({ 
    title: {
        fontWeight: 'bold',
        marginTop: 20,
    },
    image: {
        width: 50,
        height: 50,
        marginTop: 20,
    },
    inputContainer: {
        margin: 10,
    },
    inputBox: {
        marginVertical: 20,
        paddingLeft: 20,
        borderWidth: 2,
        borderRadius: 30,
        backgroundColor: 'gray',
        width: '100%',
        height: 50,
        borderColor: 'black'
    },
    inputBoxError: {
        borderColor: 'red'
    },
    button: {
        margin: 20,
        paddingHorizontal: 100,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 50,
        textAlign: 'center',
    },
    center: {
        alignItems: 'center',
    },
})
export default Login