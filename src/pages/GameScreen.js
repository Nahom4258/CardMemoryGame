import React, { useRef, useState, useEffect, useCallback, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import CardFlip from 'react-native-card-flip'
import { UserContext } from '../../App'
import api from '../api/api'
import CardItem from '../components/CardItem.js'
import SuccessModal from '../components/Modal.js'
import useGame from '../helpers/useGame'

const CARDS_PER_ROW = 5

function GameScreen({ route, navigation }) {
    const [is_game_loaded, setIsGameLoaded] = useState(false)
    const { currentUser, setCurrentUser } = useContext(UserContext)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsGameLoaded(true)
        }, 500)

        return () => clearTimeout(timeout)
    }, [])

    // useEffect(() => {
    //     if (is_game_finished) {
    //         console.log('game doneee, yeaaa')
    //         firestore()
    //             .collection('Users')
    //             .doc(currentUser)
    //             .update({
    //                 highscore: rounds,
    //             })
    //             .then(() => {
    //                 console.log('User updated!');
    //             });
    //         api.post('update_highscore', {
    //             highscore: rounds,
    //             id: currentUser,
    //         }, { headers: { "content-type": "application/json" } })
    //             .then(res => {
    //                 if (res.data?.error) {
    //                     console.log('error updating highscore')
    //                     return
    //                 }

    //                 console.log('HIGHSCORE UPDATED')
    //             })
    //             .catch(err => console.log(err))
    //     }

    // }, [is_game_finished])


    // const insets = useSafeAreaInsets()

    const cardsRef = useRef({})

    const { onCardPress, rounds, is_game_finished, random_cards, successModal } = useGame(cardsRef)

    // useAvoidLeavingScreen({ is_playing: rounds > 0 && !is_game_finished })

    const renderItem = useCallback(({ item }) => (
        <CardItem
            item={item}
            onCardPress={onCardPress}
            cardsRef={cardsRef}
        />
    ), [])

    return (
        <View style={style.container}>
            {is_game_finished ? <SuccessModal navigation={navigation} rounds={rounds} /> : ''}
            <FlatList
                bounces={false}
                showsVerticalScrollIndicator={false}
                data={is_game_loaded ? random_cards : []}
                numColumns={CARDS_PER_ROW}
                keyExtractor={useCallback((_, index) => index.toString(), [])}
                renderItem={renderItem}
                ListHeaderComponent={
                    <Text style={style.triesText} alignCenter pBottom={25} pTop={15}>
                        Tries: {rounds}
                    </Text>
                }
            />
        </View>
    )
}

const style = StyleSheet.create({
    triesText: {
        fontSize: 26,
        color: 'black',
        textAlign: 'center'
    },
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },
    levelText: {
        fontSize: 45,
        marginTop: 0,
        fontWeight: 'bold',
        color: 'black'
    },
    playingField: {
        backgroundColor: 'red',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10

    },
    cardFlip: {
        minWidth: 90,
        height: 100,
        backgroundColor: 'white',
        marginVertical: 10
    }
})

export default GameScreen