import React, { useState, useEffect, useRef } from 'react';
import Input from './components/Input.jsx';
import Keypad from './components/Keypad.jsx';
import axios from 'axios';

export default function Calculator(props) {
  const [inputValue, updateInput] = useState('');
  const [pressedKey, setPressedKey] = useState('');
  const [evaluation, setEval] = useState();
  const [decimalAllowed, setDecimalAllowed] = useState(true);

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

  // we need the input ref to focus the input field on page load.
  const inputRef = useRef(null);
  // we need the container ref to prevent user from un-focusing input field.
  const containerRef = useRef(null);

  // receives proposed changes to inputValue state from each of our components and restricts them.
  const filterOperatorInput = (input) => {
    console.log(input.slice(-1));
    // console.log('input length:', input.length);
    // console.log('inputValue length:', inputValue.length);
    // console.log(input.length < inputValue.length);


    const operators = [
      '-',
      '+',
      '*',
      '/',
      '=',
      '.'
    ];

    const parens = ['(', ')'];

    let newInput = input;
    const previousInputChar = inputValue.slice(-1);
    const previousTwoInputChars = inputValue.slice(-2);
    const currentInputChar = input.slice(-1);
    const attemptingDelete = input.length < inputValue.length;
    const newArithmeticString = inputValue === '' || parens.includes(previousInputChar);
    console.log('current input char:', currentInputChar);
    console.log('decimal allowed:', decimalAllowed);

    // console.log('previous input char:', previousInputChar);
    // console.log('current input:', input.slice(-1));
    // console.log('input value:', inputValue);
    // console.log('previous two input values:', previousTwoInputChars);
    // console.log('attempting delete', attemptingDelete);

    if (
      //...we're at the beginning of a new expression, entering just an
      // operator will stub out a new arithmetic string or float. example: 0+3 / 0.3
      (newArithmeticString ||
      (operators.slice(1).includes(previousInputChar) && currentInputChar === '.')  )
      && operators.slice(1).includes(currentInputChar)
      ) {
        //provides for decimal restriction at beginning of expression as well.
        if (currentInputChar === '.' && decimalAllowed) {
          console.log('decimal is NOW restricted')
          setDecimalAllowed(false);
          newInput = input.slice(0, -1) + '0' + currentInputChar;
        } else if (currentInputChar === '.' && !decimalAllowed) {
          console.log('DING');
          newInput = inputValue;
        } else if (currentInputChar !== '.') {
          // all other operators
          newInput = input.slice(0, -1) + '0' + currentInputChar;
        }
    } else if (
      (currentInputChar === '-' && previousTwoInputChars === '--' && !attemptingDelete)
    ) {
      console.log('trying to type more than double minus')
      newInput = inputValue;
    } else if (
      //...we're trying to enter an operator and the previous input was also an operator
      // then don't allow entry. this prevents sucessive operators.
      operators.includes(previousInputChar)
      && operators.slice(1).includes(currentInputChar)
      ) {
      console.log('blocked');
      newInput = inputValue;
    } else if (
      currentInputChar === '.'
      && !decimalAllowed
      && !attemptingDelete
      ) {
      //...we're trying to enter a decimal and we have already done as for this number, disallow.
      // the length check provides a necessary exception for deleting.
      newInput = inputValue;
      console.log('decimal is not allowed');
    } else if (
      currentInputChar === '.'
      && decimalAllowed
      ) {
      //...we're trying to enter a decimal and it's permitted, restrict for the rest this number.
      console.log('decimal is now restricted.');
        setDecimalAllowed(false);
    } else if (input.length < inputValue.length && !decimalAllowed) {
      ///...the length of our input is less than that stored in state and decimal is not allowed,
      // it means we're trying to delete a decimal. allow it.
      console.log('trying to delete');
      setDecimalAllowed(true);
    } else if (
      //...we open a set of parens, allow decimal entry again for this new number.
      (operators.slice(0, -1).includes(currentInputChar) || parens.includes(currentInputChar))
      && !decimalAllowed
    ) {
      console.log('decimal is allowed now.')
        setDecimalAllowed(true);
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
      .then((res) => {
        console.log('result on client:', res.data.result);
        let updatedDisplay;
        if (res === '∞') {
          updatedDisplay = res.data.result;
        } else if (res.data.result === 'Parens not balanced.') {
          console.log('ding');
          throw res.data.result;
        } else {
          updatedDisplay = res.data.result.toString();
        }
        updateInput(updatedDisplay);
      })
      .catch((err) => {
        if (err !== 'Parens not balanced.') {
          err = 'Invalid input.';
        }
        alert(err);
        updateInput('');
      })
  }

  useEffect(() => {
    inputRef.current.focus();
    document.body.addEventListener("mousedown", (e) => restrictInputUnfocus(e));
    // when inputValue is updated, move text cursor to starting position.
    inputRef.current.selectionStart = inputValue.length;
  }, [inputValue])

  return (
    <div
    className="calc-container"
    ref={containerRef}
    >
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

