import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import posts from './routers/posts.js'
import auth from './routers/auth.js'
import { connect } from './config/db.js'
import {errorHandler} from './middlewares/errorHandler.js'
dotenv.config()
const app = express();
const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
connect()

app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit:'30mb' }))

app.use(cors())

app.use('/api/v1/posts',posts)
app.use('/api/v1/auth',auth )
// Unhandled Route
app.all('*',(req, res, next) => {
  const err = new Error ('The route can not be found')
  err.statusCode = 404
  next(err)
})
app.use(errorHandler)

app.set("view engine", "pug");
app.get('/', (req, res) => {
  res.render('index', { title: "Home" })
})

