import React, { memo, useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Snackbar, Button, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth';
import { UserContext } from '../../App';

function LogIn({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [error, setError] = useState(false)
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const _onLoginPressed = () => {
        console.log('log in pressed')
        // firebase check
        auth()
            .signInWithEmailAndPassword('nhabtamu42@gmail.com', 'NahomHabtamu')
            .then((user) => {
                console.log('USER SIGNED INNNN!');
                console.log('user: ', user.user.uid)
                console.log('current user context', currentUser)
                setCurrentUser(user.user.uid)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            })
            .catch(error => {
                console.log('ERRRORRRR!! LOGIN ')
                setError(true)
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

            <Text style={styles.welcome}>Welcome back.</Text>

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
                style={{ marginTop: 20 }}
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

            <Button mode="contained" onPress={_onLoginPressed} style={{ marginTop: 30 }}>
                Login
            </Button>

            <View style={styles.row}>
                <Text style={styles.label}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
            <Snackbar visible={error} duration={3000} onDismiss={() => setError(false)}>
                Username/Password is incorrect.
            </Snackbar>
        </View >
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

export default LogIn;