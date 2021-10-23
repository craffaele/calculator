import React, { useState, useEffect, useRef } from 'react';
import Input from './components/Input.jsx';
import Keypad from './components/Keypad.jsx';

export default function Calculator(props) {
  const [inputValue, updateInput] = useState('');
  const [selection, setSelection] = useState({start: 0, end: 0});
  const [pressedKey, setPressedKey] = useState('');

  const inputs = [
    '(',
    ')',
    '%',
    'CE',
    '7',
    '8',
    '9',
    '/',
    '4',
    '5',
    '6',
    '*',
    '1',
    '2',
    '3',
    '-',
    '0',
    '.',
    '=',
    '+'
  ];
  // store ref to our input element. two reasons for this:
  // (1) focusing the input field on page load/ re-focusing on keypress.
  // (2) retrieving the text cursor position so we can take control of it.
  const inputRef = useRef(null);

  const handleClick = (e) => {
    // store values for start and end points of current text cursor selection.
    const selectStart = inputRef.current.selectionStart;
    const selectEnd = inputRef.current.selectionEnd;

    // using selection coordinates, insert new user input to existing value at correct position.
    // allows insertion of new text at expected position with keypad clicks as well as user keyboard.
    const newInput = inputValue.slice(0, selectStart) + e.target.id + inputValue.slice(selectEnd);

    updateInput(newInput);
    setSelection({start: selectStart, end: selectEnd});
  }

  useEffect(() => {
    inputRef.current.focus();
    document.body.addEventListener("keypress", () => inputRef.current.focus());
  })

  return (
    <div className="calc-box">
      <Input
      inputRef={inputRef}
      setPressedKey={setPressedKey}
      inputValue={inputValue}
      inputs={inputs}
      updateInput={updateInput}
       />
      <Keypad
      handleClick={handleClick}
      inputs={inputs}
      pressedKey={pressedKey}
       />
    </div>
  )
}

