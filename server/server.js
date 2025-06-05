import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './src/app.js'
import http from 'http'
import { initializeSocket } from './src/utils/socket.js'

dotenv.config()

const server = http.createServer(app)

initializeSocket(server)

const port = process.env.PORT

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('mongodb connected'))
    .catch((err)=>console.log('connection errror :', err))

server.listen(port,()=> {
    console.log(`server running on port ${port}`);
})  