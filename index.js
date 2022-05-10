import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import posts from './routers/posts.js'
import auth from './routers/auth.js'
import category from './routers/category.js'
import search from './routers/search.js'
import comments from './routers/comments.js'
import { connect } from './config/db.js'
import {errorHandler} from './middlewares/errorHandler.js'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
dotenv.config()
const app = express();
const PORT = process.env.APP_PORT;
cloudinary.config({ 
  cloud_name: 'trumblogapp', 
  api_key: '228477458325852',
  api_secret: 'Fp5C-5r0nBs120YcwkiLCDkiphU'
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
connect()
app.use(bodyParser.json({extended: true, limit: '30mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit:'30mb' }))

app.use(cors())
app.use('/api/v1/posts',posts)
app.use('/api/v1/auth',auth )
app.use('/api/v1/category', category)
app.use('/api/v1/search/', search)
app.use('/api/v1/comment/', comments)
app.set("view engine", "pug");
app.get('/', (req, res) => {
  res.render('index', { title: "Home" })
})

app.all('*',(req, res, next) => {
  const err = new Error ('404 NOT FOUND')
  err.statusCode = 404
  next(err)
})
app.use(errorHandler)
