const express = require('express')
const session = require('express-session')

const TWO_HOURS = 1000 * 60 * 60 * 2 

const { PORT = 3000, 
  NODE_ENV = 'development', 
  SESSION_SECRET = 'ssh!quiet,it\'asecret!', 
  SESSION_NAME = 'sid', 
  SESSION_LIFETIME = TWO_HOURS 
} = process.env

const IN_PROD = NODE_ENV === 'production' 

const SESSION_CONFIG = {
  name: SESSION_NAME,
  resave: false,
  rolling: false,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: SESSION_LIFETIME,
    sameSite: true, // strict
    secure: IN_PROD,
  },
} 
const app = express() 
app.use(session(SESSION_CONFIG))


app.get('/', () => {})
app.get('/login', () => {})
app.post('/login', ()=> {})
app.get('/register', () => {})
app.post('/register', ()=>{})
app.post('/logout', ()=>{})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))