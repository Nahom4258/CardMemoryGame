import { CardType } from './Cards'
import CardFlip from 'react-native-card-flip'

export const initial_state = {
    flipped_cards: [],
    playing_cards: [],
    rounds: 0,
    is_waiting: false,
    successModal: false,
}

const playCard = (state, {
    card,
    cardRef,
}) => {
    if (state.is_waiting) return state

    cardRef?.flip()

    if (state.playing_cards.length === 0) {
        return { ...state, playing_cards: [card], rounds: state.rounds + 1 }
    }

    if (card.name === state.playing_cards[0].name) {
        return {
            ...state,
            flipped_cards: [...state.flipped_cards, ...state.playing_cards, card],
            playing_cards: [],
            rounds: state.rounds + 1,
        }
    }

    return {
        ...state,
        is_waiting: true,
        playing_cards: [...state.playing_cards, card],
        rounds: state.rounds + 1,
    }
}

export const GameReducer = (state = initial_state, action) => {
    switch (action.type) {
        case 'play_card':
            return playCard(state, action.payload)
        case 'stop_waiting':
            return { ...state, is_waiting: false, playing_cards: [] }
        case 'show_modal':
            return { ...state, successModal: true }
        default:
            return state
    }
}
