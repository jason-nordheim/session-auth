const express = require('express')
const session = require('express-session')

const TWO_HOURS = 1000 * 60 * 60 * 2 

const { PORT = 3000, SESSION_LIFETIME = TWO_HOURS } = process.env

const app = express() 
app.use(session({
  cookie:{
    maxAge: SESSION_LIFETIME
  }
}))

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))