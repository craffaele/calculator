import React, { useState, useEffect, useRef } from 'react';

export default function Input({inputRef, handleChange, restrictKeys, setPressedKey, inputValue}) {

  return (
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
  )

}