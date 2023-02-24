import React, { useCallback, useEffect, useReducer, useRef, useContext } from 'react'
import { CardType } from '../components/Cards'
// import { useMemoryGameDispatch } from '../../Reducers/MemoryGameReducer'
import { GameReducer, initial_state } from '../helpers/gameReducer'
import useRandomCards, { CARDS_NUMBER } from '../helpers/useRandomCards'
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../App';
import api from '../api/api';

const useGame = (cardsRef) => {
  const [state, dispatch] = useReducer(GameReducer, initial_state)

  const { currentUser, setCurrentUser } = useContext(UserContext)

  const { flipped_cards, playing_cards, rounds, is_waiting, successModal } = state

  //   const rootDispatch = useMemoryGameDispatch()

  const random_cards = useRandomCards()

  const isWaitingRef = useRef(false)

  const is_game_finished = playing_cards.length === 0 && flipped_cards.length === (CARDS_NUMBER * 2)

  useEffect(() => {
    if (!is_game_finished) return

    console.log('game doneee, yeaaa')
    // firestore()
    //   .collection('Users')
    //   .doc(currentUser)
    //   .update({
    //     highscore: rounds,
    //   })
    //   .then(() => {
    //     console.log('User updated!');
    //   });
    api.post('update_highscore', {
      highscore: rounds,
      id: currentUser,
    }, { headers: { "content-type": "application/json" } })
      .then(res => {
        if (res.data?.error) {
          console.log('error updating highscore')
          return
        }

        console.log('HIGHSCORE UPDATED')
      })
      .catch(err => console.log(err))
    setTimeout(() => {
      console.log('doneee')
      dispatch({ type: 'show_modal' })

    }, 500)
  }, [is_game_finished])

  useEffect(() => {
    isWaitingRef.current = is_waiting

    if (!is_waiting) return

    const timeout = setTimeout(() => {
      cardsRef.current[playing_cards[0]?.key]?.flip()
      cardsRef.current[playing_cards[1]?.key]?.flip()

      dispatch({ type: 'stop_waiting' })
    }, 1000)

    return () => clearTimeout(timeout)
  }, [is_waiting])

  const onCardPress = useCallback((card) => {
    dispatch({ type: 'play_card', payload: { card, cardRef: cardsRef.current[card.key] } })
  }, [])

  return { onCardPress, rounds, is_game_finished, random_cards, successModal }
}

export default useGame
