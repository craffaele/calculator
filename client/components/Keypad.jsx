import React, { useState, useEffect, useRef } from 'react';

export default function Keypad({inputs, inputValue, pressedKey, updateInput, filter, submit}) {

  const handleClick = (e) => {
    const { id } = e.target;
    // if '=' button is clicked, trigger submission of current input value.
    if (id === '=') {
      submit();
      e.preventDefault();
      return;
    }
    let newInput;
    switch (id) {
      case 'CE' : newInput = inputValue.slice(0, -1); break;
      case 'AC' : newInput = ''; break;
      default: newInput = inputValue + id;
    }
    filter(newInput);
  }

  return (
    <div className="keypad" onClick={handleClick}>
    {inputs.map((input, i) => (
      <button
      className={`btn ${pressedKey === input ? 'pressed' : ''} `}
      id={input}
      key={i}
      >
        {input}
        </button>
    ))}
  </div>
  )
}
