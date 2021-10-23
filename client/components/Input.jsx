import React, { useState, useEffect, useRef } from 'react';

export default function Input({inputRef, inputs, setPressedKey, inputValue, updateInput}) {

  const handleChange = (e) => {
    updateInput(e.target.value);
    // disallow left and right arrow keys
    // disallow more than one consecutive operator
    // disallow unbalanced paren
  }

  const handlePressedKey = (e) => {
    console.log(e.key)
    // if input is not on our keypad, prevent entry.
    if (!inputs.includes(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
    // do not allow left and right arrow keys
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
    }
    setPressedKey(e.key)
  }

  const restrictMouseDown = (e) => {
    // prevents user from moving text cursor by clicking within input field.
    // the input field is re-focused on click.
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