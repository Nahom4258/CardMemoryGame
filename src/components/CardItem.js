import React, { memo } from 'react'
import { CardType } from './Cards'
import { Dimensions, TouchableOpacity, Text, ImageBackground, Image } from 'react-native'
import styled, { css } from 'styled-components/native'
// import TouchableScale from '../../Components/TouchableScale'
import CardFlip from 'react-native-card-flip'
import { TouchableRipple } from 'react-native-paper'

const back_image = require('../assets/cards/back.jpg')

const CardItem = ({ item, onCardPress, cardsRef }) => {

  return (
    <StyledCardFlip ref={ref => cardsRef.current[item.key] = ref}>
      <TouchableOpacity
        onPress={() => onCardPress(item)}
      >
        <Image style={{ width: '100%', height: '100%' }} source={back_image} />
        {/* <Text>Here0</Text> */}
      </TouchableOpacity>

      <Image style={{ width: '100%', height: '100%' }} source={item.image} />
      {console.log('image: ', item.image)}
    </StyledCardFlip >
  )
}

export default memo(CardItem)

const CARDS_PER_ROW = 5

const CARD_IMAGE_RATIO = 713 / 500

// Flatlist tem 5 de padding horizontal, por isso o - 10 aqui
const SCREEN_WIDTH = Dimensions.get('window').width - 10

const StyledCardFlip = styled(CardFlip)`
  width: ${(SCREEN_WIDTH / CARDS_PER_ROW) - 10}px;
  height: ${(SCREEN_WIDTH * CARD_IMAGE_RATIO / CARDS_PER_ROW) - 10}px;
  margin: 5px;
`

// const CardImage = styled.ImageBackground < { withShadow } > `
//   width: 100%;
//   height: 100%;

//   ${p => p.withShadow && css`
//     shadow-color: #333;
//     shadow-offset: 0 2px;
//     shadow-opacity: .1;
//     shadow-radius: 6px;
//     elevation: 1;
//   `}
// `
