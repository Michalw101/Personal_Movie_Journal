const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const connectDB = require("./db"); 


const app = express();
app.use(express.json());
app.use(cookieParser()); 

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

connectDB();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello world from Node.js');
});


app.listen(PORT, () => {
  console.log(`Server is running  http://localhost:${PORT}`);
});
