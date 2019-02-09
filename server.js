
const fs = require('fs')
const path = require('path')
const express = require('express')
const compression = require('compression')
const cors = require('cors')

const { PORT = 8000 } = process.env
const html = fs.readFileSync(
  path.resolve(__dirname, './static/index.html'),
  'utf8'
)

const app = express()
app.use(compression())
app.use(express.static(path.join(__dirname, './static')))
app.use(cors({
  origin: true,
  methods: ['GET', 'POST']
}))
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(html)
  res.end()
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`) // eslint-disable-line no-console
})
