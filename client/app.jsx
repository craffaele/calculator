import React, { useState, useEffect, useRef } from 'react';

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

  const inputRef = useRef(null);

  const handleClick = (e) => {
    // store values for start and end points of current cursor selection.
    const selectStart = inputRef.current.selectionStart;
    const selectEnd = inputRef.current.selectionEnd;

    // using selection coordinates, insert new input to existing value at correct position.
    // allows insertion of new text at expected position with keypad button elements as well as your keyboard.
    const newInput = inputValue.slice(0, selectStart) + e.target.id + inputValue.slice(selectEnd);

    updateInput(newInput);
    setSelection({start: selectStart, end: selectEnd});
  }

  const handleChange = (e) => {
    updateInput(e.target.value);
  }

  const restrictKeys = (e) => {
    if (!inputs.includes(e.key)) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    inputRef.current.focus();
    document.body.addEventListener("keypress", () => inputRef.current.focus());

    // if cursor selection start/end has changed, set cursor to expected position on new render (rather than 0).
    const {start, end} = selection;
    inputRef.current.setSelectionRange(start + 1, start + 1);
  }, [selection])

  return (
    <div className="calc-box">
      <input
      type="text"
      placeholder="0"
      ref={inputRef}
      onChange={handleChange}
      onKeyPress={restrictKeys}
      onKeyDown={(e) => setPressedKey(e.key)}
      onKeyUp={() => setPressedKey('')}
      value={inputValue}
      />
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
    </div>
  )
}

