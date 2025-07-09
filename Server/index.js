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
console.log(`Connecting to database on port ${PORT}`);


const loginRouter = require("./routes/loginRouter");
app.use("/login", loginRouter);

const signupRouter = require("./routes/signupRouter");
app.use("/signup", signupRouter);



app.listen(PORT, () => {
  console.log(`Server is running  http://localhost:${PORT}`);
});
