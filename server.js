const express = require('express')
const app = express()
const port = 3000

app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/calculate', (req, res) => {
  const expression = req.query.expression;
  console.log('PING:', expression);
  res.end();
})

app.listen(port, () => {
  console.log(`Calculator listening at http://localhost:${port}`)
})