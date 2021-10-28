const express = require('express');
const ratify = require('./calculator/ratify');
const app = express()
const port = 3000
const cors = require('cors')

app.use(express.static('./public'))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/calculate', (req, res) => {
  console.log('ping:', req.query.expression);
  const result = ratify(req.query.expression);
  console.log('FINAL RESULT:', typeof result, result);
  if (result === Infinity) {
    res.send({result: '∞'});
  } else {
    res.send({result});
  }
})

app.listen(port, () => {
  console.log(`Calculator listening at http://localhost:${port}`)
})