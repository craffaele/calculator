import React, { useState, useEffect, useRef } from 'react';

export default function Keypad({handleClick, inputs, pressedKey, updateInput}) {

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
