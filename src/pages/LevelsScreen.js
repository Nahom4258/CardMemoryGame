import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'


function LevelsScreen({ navigation }) {
  var list = [1]
  return (
    <View style={style.container}>
      {list.map(l => (
        <Button key={l} mode='contained' style={style.button} onPress={() => navigation.navigate('Game', { level: l })}><Text style={{ fontSize: 20 }}>Level {l}</Text></Button>
      ))}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    marginTop: 30
  },
  button: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    marginTop: 20,
    height: 60,
    width: '90%'
  }
})

export default LevelsScreen