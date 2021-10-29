# calculator

<img src="screenshot.png" width="500">
 Deployed application here: http://3.219.168.222:3000

## Overview

Simple calculator with minimal erroring.

- Handles basic arithmetic operations (+ - / *) and nested parens.
- Controlled input significantly reduces the incidence of errors and makes for an intuitive user experience.
- Responsive keypad view highlights user keypresses. 

## Usage

- Beginning an entry with just an operator/ decimal will stub out an expression or float for you. Ex: 0+3 or 0.3
- Submit entry for evaluation with Enter or '='.

Controlled input prohibits entry of any non-numeric or non-operator characters. More than one successive operator is disallowed with the exception of '-', two of which are permitted only when entered between integers (or paren expressions that will evaluate to integers). Only one decimal is permitted per number. The only invalid inputs allowed through are (1) unbalanced parens, which are checked on the server and will return an alert for unbalanced parens, and (2) hanging operators, which will likewise return an alert for invalid input. Lastly, any expression that evaluates to infinity will return '∞' without error, but the next entry will then clear the input field as no further meaningful operations can be performed with infinity (as far as I know).

## Installation

1. Clone down repository.
2. Install dependencies: 
```npm install```
4. Build webpack bundle with watch flag: 
```npm run build ```
2. Start the server:
````npm run server````

## Technologies

- React 
- Webpack
- Babel
- Express
- AWS EC2
- Babel
- Jest
- Docker
- Node.js
- sinful-math
