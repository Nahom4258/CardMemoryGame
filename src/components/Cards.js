export const Cards = {
    ['child']: require('../assets/cards/child.jpg'),
    ['die']: require('../assets/cards/die.jpg'),
    ['fish']: require('../assets/cards/fish.jpg'),
    ['foot']: require('../assets/cards/foot.jpg'),
    ['goose']: require('../assets/cards/goose.jpg'),
    ['knife']: require('../assets/cards/knife.jpg'),
    ['leaf']: require('../assets/cards/leaf.jpg'),
    ['loaf']: require('../assets/cards/loaf.jpg'),
    ['man']: require('../assets/cards/man.jpg'),
    ['moose']: require('../assets/cards/moose.jpg'),
    ['mouse']: require('../assets/cards/mouse.jpg'),
    ['people']: require('../assets/cards/people.jpg'),
    ['thief']: require('../assets/cards/thief.jpg'),
    ['wolf']: require('../assets/cards/wolf.jpg'),
    ['woman']: require('../assets/cards/woman.jpg'),
  }
  
  export const CardsList = Object.entries(Cards).map(([key, value]) => ({
    key,
    name: key,
    image: value,
  }))
  