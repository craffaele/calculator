import React, { useState, useEffect, useRef } from 'react';
import Input from './components/Input.jsx';
import Keypad from './components/Keypad.jsx';

export default function Calculator(props) {
  const [inputValue, updateInput] = useState('');
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
  // store ref to our input element.
  // we need this to focus the input field on page load/ re-focusing on keypress.
  const inputRef = useRef(null);
  // we need this ref to our container to prevent user from un-focusing input field.
  const containerRef = useRef(null);

  const handleClick = (e) => {
    const newInput = e.target.id;
    updateInput(inputValue + newInput);
  }

  const preventUnfocus = (e) => {
    console.log(e.target.classList)
    if (e.target.id === "app" || e.target.classList.contains("calc-container")) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    inputRef.current.focus();
    document.body.addEventListener("mousedown", (e) => preventUnfocus(e));
    // when inputValue is updated, move text cursor to starting position.
    inputRef.current.selectionStart = inputValue.length;
  }, [inputValue])

  return (
    <div className="calc-container" ref={containerRef}>
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

