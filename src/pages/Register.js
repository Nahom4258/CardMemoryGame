import React, { memo, useState, useEffect, useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Background, Button, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../App';


function Register({ navigation }) {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [username, setUsername] = useState({ value: '', error: '' });
    const [uid, setUid] = useState('')

    useEffect(() => {
        // adding username with highscore = 0
        if (uid != '') {
            firestore()
                .collection('Users')
                .doc(uid)
                .set({
                    highscore: 0,
                    username: username.value,
                    user_id: uid
                })
                .then(() => {
                    console.log('User added!');
                });

            setCurrentUser(uid)

            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        }

    }, [uid])


    const registerClicked = () => {
        // firebase registger user
        auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then((data) => {
                console.log('User account created & signed in!: ', data.user.uid);
                setUid(data.user.uid)
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    };

    return (
        <View style={styles.container}>

            <Text style={styles.welcome}>Register User</Text>

            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                mode='outlined'
            />

            <TextInput
                label="Username"
                returnKeyType="next"
                value={username.value}
                onChangeText={text => setUsername({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                mode='outlined'
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
                mode='outlined'
            />

            {/* <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPasswordScreen')}
                >
                    <Text style={styles.label}>Forgot your password?</Text>
                </TouchableOpacity>
            </View> */}

            <Button mode="contained" onPress={registerClicked} style={{ marginTop: 30 }}>
                Register
            </Button>

            <View style={styles.row}>
                <Text style={styles.label}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                    <Text style={styles.link}>Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flex: 1,
        marginTop: 30,
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        color: 'purple'
    }
});

export default Register;