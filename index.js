import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import posts from './routers/posts.js'
import auth from './routers/auth.js'
import { connect } from './config/db.js'
dotenv.config()
const app = express();
const PORT = process.env.APP_PORT;
app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit:'30mb' }))
app.use(cors())
app.use('/api/v1/posts',posts)
app.use('/api/v1/auth',auth )
app.set("view engine", "pug");
console.log(PORT)
app.get('/', (req, res) => {
  res.render('index', { title: "Home" })
})
connect()
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
