import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { UserContext } from '../../App'

function HomeScreen({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  useEffect(() => {
    console.log('inside home: ', currentUser)
  }, [])


  return (
    <View style={style.container}>
      <Text style={style.title}>Card Memory Game</Text>
      <Button style={style.button} mode="contained" onPress={() => navigation.navigate('Game')}>
        <Text style={{ fontSize: 20 }}>Play</Text>
      </Button>
      <Button style={style.button} mode="contained" onPress={() => navigation.navigate('Leaderboard')}>
        <Text style={{ fontSize: 20 }}>Leaderboard</Text>
      </Button>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1
  },
  title: {
    marginVertical: 30,
    fontSize: 40,
    fontWeight: '900',
    color: 'black',
    marginBottom: 80,
  },
  button: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    marginTop: 10,
    width: '60%'
  }
})

export default HomeScreen