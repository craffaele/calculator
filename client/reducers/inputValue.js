export default function inputValueReducer (state = '', action) {
  switch (action.type) {
    case 'UPDATE_INPUT':
      return action.payload;
    default:
      return state;
  }
}