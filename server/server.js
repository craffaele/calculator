const express = require('express');
const prepare = require('./calculator/prepare');
const app = express()
const port = 3000

app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/calculate', (req, res) => {
  const expression = req.query.expression;
  const result = prepare(expression);
  console.log('FINAL RESULT:', result);
  res.send({result});
})

app.listen(port, () => {
  console.log(`Calculator listening at http://localhost:${port}`)
})