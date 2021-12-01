export default function pressedKeyReducer(state = '', action) {
  switch (action.type) {
    case 'SET_PRESSED_KEY':
      return action.payload;
    default:
      return state;
  }
}