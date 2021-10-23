import React, { useState, useEffect, useRef } from 'react';
import Input from './components/Input.jsx';
import Keypad from './components/Keypad.jsx';

export default function Calculator(props) {
  const [inputValue, updateInput] = useState('');
  const [pressedKey, setPressedKey] = useState('');

  const inputs = [
    '(',
    ')',
    'AC',
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
  // store refs to our input and calculator-container elements.
  // we need the input ref to focus the input field on page load.
  // we need the ref to our container to prevent user from un-focusing input field.
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const handleClick = (e) => {
    const { id } = e.target;
    let newInput;
    switch (id) {
      case 'CE' : newInput = inputValue.slice(0, -1); break;
      case 'AC' : newInput = ''; break;
      default: newInput = inputValue + id;
    }
    updateInput(newInput);
  }

  const restrictUnfocus = (e) => {
    if (e.target.id === "app" || e.target.classList.contains("calc-container")) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    inputRef.current.focus();
    document.body.addEventListener("mousedown", (e) => restrictUnfocus(e));
    // document.body.addEventListener("keypress", (e) => inputRef.current.focus());

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

