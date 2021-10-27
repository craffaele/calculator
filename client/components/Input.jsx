import React, { useState, useEffect, useRef } from 'react';

export default function Input({inputRef, inputs, setPressedKey, inputValue, updateInput, filter, submit}) {

  const handleChange = (e) => {
    filter(e.target.value);
  }

  const handlePressedKey = (e) => {
    // if enter or equals key is pressed, trigger submission of current input value.
    if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      submit();
      return;
    }

    const pressedKey = e.key === 'Backspace' ? 'CE' : e.key;
    // if input is not on our keypad, prevent entry.
    if (!inputs.includes(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
    // do not allow left and right arrow keys.
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
    }
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
    maxLength="20"
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