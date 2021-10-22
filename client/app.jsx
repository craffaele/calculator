import React, { useState, useEffect, useRef } from 'react';

export default function Calculator(props) {

  const [inputValue, updateInput] = useState('');
  const [selection, setSelection] = useState({start: 0, end: 0});

  const inputRef = useRef(null);

  const handleClick = (e) => {
    const cursorPosition = inputRef.current.selectionStart;
    const selectStart = inputRef.current.selectionStart;
    const selectEnd = inputRef.current.selectionEnd;
    const newInput =
    inputValue.slice(0, cursorPosition) + e.target.id + inputValue.slice(cursorPosition);

    updateInput(newInput);
    setSelection({start: selectStart, end: selectEnd});
  }

  const handleKey = (e) => {
    console.log(e.key);
    inputRef.current.focus();
  }

  const handleChange = (e) => {
    updateInput(e.target.value);
  }

  useEffect(() => {
    console.log('use effect called!')
    console.log('selection log:', selection);
    inputRef.current.focus();
    document.body.addEventListener("keypress", handleKey);
    //handle seletion coords
    const {start, end} = selection;
    inputRef.current.setSelectionRange(start + 1, end + 1);
  }, [selection])

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
      <input
      type="text"
      placeholder="0"
      ref={inputRef}
      onChange={handleChange}
      value={inputValue}
      />
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

