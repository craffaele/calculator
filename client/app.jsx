import React, { useState, useEffect, useRef } from 'react';
import Input from './components/Input.jsx';
import Keypad from './components/Keypad.jsx';
import axios from 'axios';

export default function Calculator(props) {
  const [inputValue, updateInput] = useState('');
  const [pressedKey, setPressedKey] = useState('');
  const [evaluation, setEval] = useState();

  const inputs = [
    '(',
    ')',
    'AC',
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

  // store refs to our input and calculator-container elements.
  // we need the input ref to focus the input field on page load.
  // we need the container ref to prevent user from un-focusing input field.
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // receives proposed changes to inputValue state from each of our components and sanitizes them.
  const filterOperatorInput = (input) => {
    const operators = [
      '-',
      '+',
      '*',
      '/',
      '.',
      '='
    ]
    let newInput = input;
    const previousInputChar = inputValue.slice(-1);
    // if input value is empty and first char is operator other than minus '-'...
    if (inputValue === '' && operators.slice(1).includes(input)) {
      newInput = '0' + input;
    }
    // prevent sucessive operators.
    if (operators.includes(previousInputChar) && operators.includes(input.slice(-1))) {
      newInput = inputValue;
      console.log('should prevent operator')
    }
      updateInput(newInput);
      inputRef.current.focus();
    }

  const restrictInputUnfocus = (e) => {
    if (e.target.id === "app" || e.target.classList.contains("calc-container")) {
      e.preventDefault();
    }
  }
  // submit current expression (inputValue) to server for evaluation.
  const submitExpression = () => {
    const expression = encodeURIComponent(inputValue);
    axios.get(`/calculate?expression=${expression}`)
      .then((response) => console.log('received response'))
  }

  useEffect(() => {
    inputRef.current.focus();
    document.body.addEventListener("mousedown", (e) => restrictInputUnfocus(e));
    // when inputValue is updated, move text cursor to starting position.
    inputRef.current.selectionStart = inputValue.length;
  }, [inputValue])

  return (
    <div className="calc-container" ref={containerRef}>
      <Input
      inputRef={inputRef}
      setPressedKey={setPressedKey}
      inputValue={inputValue}
      inputs={inputs}
      updateInput={updateInput}
      filter={filterOperatorInput}
      submit={submitExpression}
       />
      <Keypad
      inputs={inputs}
      pressedKey={pressedKey}
      inputValue={inputValue}
      updateInput={updateInput}
      filter={filterOperatorInput}
      submit={submitExpression}
       />
    </div>
  )
}

