const express = require('express');
const ratify = require('./calculator/ratify');
const app = express()
const port = 3000

app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/calculate', (req, res) => {
  console.log('ping:', req.query.expression);
  const result = ratify(req.query.expression);
  if (result === Infinity) {
    res.send({result: '∞'});
  } else {
    res.send({result});
  }
  console.log('FINAL RESULT:', result);
})

app.listen(port, () => {
  console.log(`Calculator listening at http://localhost:${port}`)
})