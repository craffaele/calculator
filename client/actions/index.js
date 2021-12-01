export function updateInput(input) {
  return {
    type: 'UPDATE_INPUT',
    payload: input
  }
}

export function setPressedKey(key) {
  return {
    type: 'SET_PRESSED_KEY',
    payload: key
  }
}

export function setDecimalAllowed(allowed) {
  return {
    type: 'SET_DECIMAL_ALLOWED',
    payload: allowed
  }
}