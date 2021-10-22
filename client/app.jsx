import React, { useState, useEffect, useRef } from 'react';

export default function Calculator(props) {

  const [inputValue, updateInput] = useState('');
  const [selection, setSelection] = useState({start: 0, end: 0});

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
    console.log(e.target.id);
    const selectStart = inputRef.current.selectionStart;
    const selectEnd = inputRef.current.selectionEnd;
    const newInput = inputValue.slice(0, selectStart) + e.target.id + inputValue.slice(selectEnd);

    updateInput(newInput);
    setSelection({start: selectStart, end: selectEnd});
  }

  const handleChange = (e) => {
    updateInput(e.target.value);
  }

  const restrictKeys = (e) => {
    console.log(e.key)

    if (!inputs.includes(e.key)) {
      e.preventDefault();
    }

  }

  useEffect(() => {
    inputRef.current.focus();
    document.body.addEventListener("keypress", () => inputRef.current.focus());
    //handle update to selection coords
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

