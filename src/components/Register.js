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

const Register = () => {
    const [mail, setMail] = useState('')
    const [isMailValid, setIsMailValid] = useState(true)
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [pwdsEqual, setPwdsEqual] = useState(true);
    const navigation = useNavigation()

    // const pwdsEqual = useMemo( () => {
    //     return (pwd === confirmPwd) ? true : false
    // }, [pwd, confirmPwd])


    const checkMail = useCallback( ()=> {
        (mail.includes('@') && mail.length > 5) ? setIsMailValid(true) : setIsMailValid(false)
        return isMailValid
    })    
    const checkPwd = useCallback( () => {
        const valid = pwd.length > 3
        setIsValid(valid) 
        return valid
    }, [pwd])

    const checkConfPwd = useCallback( () => {
        const isEqual = pwd === confirmPwd;
        setPwdsEqual(isEqual);
        return isEqual;
    }, [pwd, confirmPwd])

    const pressButton = useCallback( () => {
        if (!checkPwd() | !checkConfPwd()){
            alert('error');
            return
        }
        storeUser()
        
    }, [pwd, checkPwd, checkConfPwd]);

    const storeUser = async () => {
        // await AsyncStorage.setItem('@users', ''); //pour vider la 'bdd'
        const myUser = {
            mail : mail,
            password : pwd
        }

        AsyncStorage.getItem('@users', (err, result) => {
            console.log('in storage : ' + result)
            console.log('myUser : ' + myUser)
            let bool = true;

            const myArrayOfUsers = JSON.parse(result)

            if (myArrayOfUsers) {
                for (let i = 0; i < myArrayOfUsers.length; i++) {
                    const element = myArrayOfUsers[i];
                    if (element.mail == myUser.mail) {
                        alert('vous êtes déjà enregistré')
                        bool = false
                        break
                    } else {
                        bool = true
                    }
                }
            }
            
            if (bool) {
                result = (result === null) ? [] : myArrayOfUsers;
                result.push(myUser);
                AsyncStorage.setItem('@users', JSON.stringify(result));
                alert('Bien enregistré !')
                navigation.navigate('Login')
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
          <TextInput style={[styles.inputBox, {borderColor: isMailValid ? 'black' : 'red'}]} placeholder={'Adresse mail'} value={mail} onChangeText={setMail} onEndEditing={checkMail}/>
          <TextInput onChangeText={setPwd} onEndEditing={checkPwd} value={pwd} style={[styles.inputBox, {borderColor: isValid ? 'black' : 'red'}]} placeholder={'Mot de passe'} />
          <TextInput
            onEndEditing={checkConfPwd}
            onChangeText={setConfirmPwd}
            value={confirmPwd}
            style={[styles.inputBox, {borderColor: pwdsEqual ? 'black' : 'red'}]}
            placeholder={'Confirmer mot de passe'}
          />
        </View>
        <View style={styles.center}>
          <TouchableOpacity style={styles.button} onPress={pressButton}>
            <Text>S'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text>Login</Text>
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
export default Register