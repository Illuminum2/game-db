const express = require('express')
const app = express()
const port = 3000

app.use(express.static('frontend'))

// curl http://localhost:3000/
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// curl -X POST --json "{"firstName": "John"}" http://localhost:3000/
app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})

app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})