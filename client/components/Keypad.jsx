import React, { useState, useEffect, useRef } from 'react';

export default function Keypad({inputs, inputValue, pressedKey, updateInput, filter}) {

  const handleClick = (e) => {
    const { id } = e.target;
    let newInput;
    switch (id) {
      case 'CE' : newInput = inputValue.slice(0, -1); break;
      case 'AC' : newInput = ''; break;
      default: newInput = inputValue + id;
    }
    // updateInput(newInput);
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
