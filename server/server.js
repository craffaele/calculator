const express = require('express');
const format = require('./calculator/format');
const app = express()
const port = 3000
const cors = require('cors')

app.use(express.static('./public'))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/calculate', (req, res) => {
  const result = format(req.query.expression);
  if (result === Infinity) {
    res.send({result: '∞'});
  } else {
    res.send({result});
  }
})

app.listen(port, () => {
  console.log(`Calculator listening at http://localhost:${port}`)
})