import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {createContext, useRef, useState} from 'react';
import HomeScreen from './src/pages/HomeScreen';
import LeaderboardScreen from './src/pages/LeaderboardScreen';
import GameScreen from './src/pages/GameScreen';
import LogIn from './src/pages/LogIn';
import Register from './src/pages/Register';
import {Button, Menu, Divider, Provider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

export const UserContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const buttonRef = useRef(null);

  return (
    <Provider>
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LogIn">
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({navigation, route}) => ({
                headerRight: () => (
                  // <Button
                  //   ref={buttonRef}
                  //   icon="dots-vertical"
                  //   onPress={openMenu}
                  //   style={{
                  //     padding: 0,
                  //     marginHorizontal: 1,
                  //     width: 5,
                  //   }}></Button>

                  <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                      <Button onPress={openMenu} icon="dots-vertical">
                        {''}
                      </Button>
                    }>
                    <Menu.Item
                      onPress={() => {
                        // auth()
                        //   .signOut()
                        //   .then(() => console.log('User signed out!'));
                        setCurrentUser(null);
                        navigation.reset({
                          index: 0,
                          routes: [{name: 'LogIn'}],
                        });
                      }}
                      title="Sign Out"
                    />
                  </Menu>
                ),
              })}
            />
            <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </Provider>
  );
}

export default App;
