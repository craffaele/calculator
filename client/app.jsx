import React, { useState, useEffect, useRef } from 'react';
import Input from './components/Input.jsx';
import Keypad from './components/Keypad.jsx';
import axios from 'axios';

export default function Calculator(props) {
  const [inputValue, updateInput] = useState('');
  const [pressedKey, setPressedKey] = useState('');
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

  // receives proposed changes to inputValue state from each of our components and filters/restricts them.
  // serves the purpose of significantly restricting operator input to reduce the potential for errors.
  const filterOperatorInput = (input) => {
    let newInput = input;
    const operators = ['-', '+', '*', '/', '=','.'];
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const parens = ['(', ')'];
    const previousInputChar = inputValue.slice(-1);
    const previousTwoInputChars = inputValue.slice(-2);;
    const currentInputChar = input.slice(-1);

    // store reference to boolean conditions within variables.
    const attemptingDelete = input.length < inputValue.length;
    const newArithmeticString = inputValue === '' || parens.includes(previousInputChar);
    const negativeAfterOp = operators.slice(1).includes(previousInputChar) && currentInputChar === '-';
    const secondMinusAllowed =
    (digits.includes(previousTwoInputChars[0]) || previousTwoInputChars[0] === ')')
    && previousTwoInputChars[1] === '-';

    if (
      //...we're at the beginning of a new string, entering just an
      // operator will stub out a new arithmetic string or float. ex: 0+3 or 0.3
      (newArithmeticString ||
      (operators.slice(1).includes(previousInputChar) && currentInputChar === '.')  )
      && operators.slice(1).includes(currentInputChar)
      ) {
        //provides for decimal restriction at beginning of expression as well.
        if (currentInputChar === '.' && decimalAllowed) {
          setDecimalAllowed(false);
          newInput = input.slice(0, -1) + '0' + currentInputChar;
        } else if (currentInputChar === '.' && !decimalAllowed) {
          newInput = inputValue;
        } else if (currentInputChar !== '.' && previousInputChar !== ')') {
          // all other operators or after paren context.
          newInput = input.slice(0, -1) + '0' + currentInputChar;
        }
    } else if (
      //...we're trying to enter more than two consecutive minus operators, don't allow it.
      currentInputChar === '-'
      && previousTwoInputChars === '--'
      && !attemptingDelete
    ) {
      newInput = inputValue;
    } else if (
      //...we're trying to enter an operator and the previous input was also an operator
      // don't allow entry. this prevents input of sucessive operators generally.
      operators.includes(previousInputChar)
      && operators.includes(currentInputChar)
      && !negativeAfterOp
      && !secondMinusAllowed
      && !attemptingDelete
      ) {
      newInput = inputValue;
    } else if (
      currentInputChar === '.'
      && !decimalAllowed
      && !attemptingDelete
      ) {
      newInput = inputValue;
    } else if (
      //...we're trying to enter a decimal and we have already done so for this number string, disallow.
      currentInputChar === '.'
      && decimalAllowed
      ) {
      //...we're trying to enter a decimal and it's permitted, restrict for the rest of this number.
        setDecimalAllowed(false);
    } else if (attemptingDelete && !decimalAllowed) {
      //...make sure we don't block deletion after entering decimal.
        setDecimalAllowed(true);
    } else if (
      //...we open a set of parens, allow decimal entry again for this new number string.
      (operators.slice(0, -1).includes(currentInputChar) || parens.includes(currentInputChar))
      && !decimalAllowed
    ) {
        setDecimalAllowed(true);
    } else if (inputValue === '∞') {
      newInput = input.slice(1);
    }
    // finally, submit new input to state.
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
        let updatedDisplay;
        if (res === '∞') {
          updatedDisplay = res.data.result;
        } else if (res.data.result === 'Parens not balanced.') {
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

    // clean up event listener
    return () => {
      document.body.removeEventListener("mousedown", restrictInputUnfocus);
    }
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

