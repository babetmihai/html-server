
const fs = require('fs')
const util = require('util')
const path = require('path')
const express = require('express')
const compression = require('compression')
const cors = require('cors')

const readFile = util.promisify(fs.readFile)

const app = express()
app.use(compression())
app.use(express.static(path.join(__dirname, './build')))
app.use(cors({
  origin: true,
  methods: ['GET', 'POST']
}))
app.get('/', async (_, res) => {
  const html = await readFile(path.resolve(__dirname, './build/index.html'), 'utf8')
  res.set('Content-Type', 'text/html')
  res.send(html)
  res.end()
})

const { PORT = 8000 } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`) // eslint-disable-line no-console
})
