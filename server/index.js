import express   from 'express' 
import  authRoute from './routes/auth-routes.js'
import  messageRoute from './routes/message-route.js'
import { setConnection } from './config/db.config.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
const app  = express()
app.use(cors())
app.use(cookieParser( ))
app.use(express.json())
const port  = process.env.PORT  || 3000


setConnection(process.env.MONGO_URL)
app.use('/api/auth',authRoute)
app.use('/api/messages',messageRoute)
app.listen(port,()=>{
    console.log(`server is runnign on port `, port)
})