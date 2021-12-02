import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet
  } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const Login = () => {
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [pwdsEqual, setPwdsEqual] = useState(true);

    console.log('mdp : ' + pwd);
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
            return
        }
        alert('Bonjour, votre mot de passe est : ' + pwd);
    }, [pwd, checkPwd, checkConfPwd]);

    return (
    <ScrollView>
        <View style={styles.center}>
          <Text style={styles.title}>Inscription</Text>
          <Image
            source={{
                uri: 'https://lh3.googleusercontent.com/proxy/nuggHz1hsPEiIL0ndXZvypUAlYRSxJ0FX_aitoQ5TrLPmhxe1mG2KxE5WCheD1H1zLIyaBznSRcB-d5j0RNNfuke6BeE-CPJRuGGlvZfnuN5dGo8Dg'
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputBox} placeholder={'Prénom'} />
          <TextInput style={styles.inputBox} placeholder={'Nom'} />
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
            <Text>Envoyer</Text>
          </TouchableOpacity>
        </View>
        <KeyboardSpacer/>
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