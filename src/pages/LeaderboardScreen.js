import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { DataTable } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../App';

function Leaderboard() {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    console.log('leaderboard useeffect: ', currentUser)
    // const usersCollection = firestore().collection('Users');
    firestore().collection('Users').orderBy('highscore', 'asc').get()
      .then((data) => {
        console.log('data: ', data._docs[0])
        setLeaderboard(data._docs)
        // leaderboard.sort((a, b) => (a.last_nom < b.last_nom) ? 1 : ((b.last_nom < a.last_nom) ? -1 : 0))
      })
      .catch((err) => console.log(err))
  }, [])


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <DataTable>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title >Username</DataTable.Title>
          <DataTable.Title numeric>Score</DataTable.Title>
        </DataTable.Header>


        {/* {leaderboard.map((row, i) =>
          <DataTable.Row key={i}>
            <DataTable.Cell>{row._data.username}</DataTable.Cell>
            <DataTable.Cell numeric>{row._data.highscore}</DataTable.Cell>
          </DataTable.Row>
        )} */}
        {leaderboard.map((item, i) =>
          item._data.highscore == 0 ? '' :
            (
              <DataTable.Row key={i} style={{ backgroundColor: item._data.user_id == currentUser ? '#ca5cdd' : 'white' }}>
                <DataTable.Cell>{item._data.username}</DataTable.Cell>
                <DataTable.Cell numeric >{item._data.highscore}</DataTable.Cell>
              </DataTable.Row>
            ))}

      </DataTable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black'
  }
})

export default Leaderboard