import { createStore } from 'redux'

const initialState = {
  sidebarShow: 'responsive'
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':

      const xxx = { ...state, ...rest };
      console.log('rest laf: ', xxx);
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store