import React, { useState } from 'react';

export default function Calculator(props) {

  const handleClick = (e) => {
    console.log(e.target.id);
  }

  const handleKey = (e) => {
    console.log(e.key);

  }

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

  return (
    <div className="calc-box">
      <input type="text" placeholder="0" onKeyPress={handleKey} />
      <div className="keypad" onClick={handleClick}>
        {inputs.map((input, i) => (
          <button
          className={"btn"}
          id={input}
          key={i}
          >
            {input}
            </button>
        ))}
      </div>
    </div>
  )
}

