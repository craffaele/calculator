import React, { useState, useEffect, useRef } from 'react';

export default function Input({inputRef, inputs, setPressedKey, inputValue, updateInput, filter}) {

  const handleChange = (e) => {
    filter(e.target.value);
    // updateInput(e.target.value);
  }

  const handlePressedKey = (e) => {
    const pressedKey = e.key === 'Backspace' ? 'CE' : e.key;

    // if input is not on our keypad, prevent entry.
    if (!inputs.includes(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
    // do not allow left and right arrow keys.
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
    }
    // disallow more than one consecutive operator
    // disallow unbalanced paren
    setPressedKey(pressedKey)
  }

  const restrictMouseDown = (e) => {
    // prevents user from moving text cursor by clicking within input field.
    // the input field is otherwise re-focused on click, with no other action taken.
    e.preventDefault();
    inputRef.current.focus();
  }

  return (
    <input
    type="text"
    placeholder="0"
    ref={inputRef}
    onChange={handleChange}
    onKeyDown={handlePressedKey}
    onKeyUp={() => setPressedKey('')}
    value={inputValue}
    onMouseDown={restrictMouseDown}
    />
  )

}