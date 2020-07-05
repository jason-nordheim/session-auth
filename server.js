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

const users = [
  { id: 1, name: 'Jason', email: 'jason@gmail.com', password: 'secretPassword' },
  { id: 2, name: 'Sam', email: 'sam@gmail.com', password: 'secretPassword' },
  { id: 3, name: 'Susan', email: 'susan@gmail.com', password: 'secretPassword' },
  { id: 4, name: 'Larry', email: 'larry@gmail.com', password: 'secretPassword' },
]

const app = express() 
app.use(session(SESSION_CONFIG))


app.get('/', (req, res) => {
  const userId  = 1 // req.session  
  res.send(`
    <h1>Welcome</h1>
    ${ userId
        ? `    
        <a href='/home'>Home</a> 
        <form method="post" action="/logout">
        <button>Logout</button>`
        : `
        <a href='/login'>Login</a> 
        <a href='/register'>Register</a>`
    }
    </form> 
  `);
})
app.get('/home', (req, res) => {
  res.send(`
    <h1>Home</h1> 
    <a href="/">Main</a> 
    <ul>
      <li>Name: </li>
      <li>Email: </li> 
    </ul>
  `)
})
app.get('/login', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form method="post" action"/login">
      <input type="email" name="email" placeholder="email" require /> 
      <input type="password" name="email" placeholder="email" require /> 
    </form>
  `)

})
app.post('/login', (req, res)=> {})
app.get('/register', (req, res) => {})
app.post('/register', (req, res)=>{})
app.post('/logout', (req, res)=>{})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))