export default function decimalAllowedReducer (state = true, action) {
  switch (action.type) {
    case 'SET_DECIMAL_ALLOWED':
      return action.payload;
    default:
      return state;
  }
}