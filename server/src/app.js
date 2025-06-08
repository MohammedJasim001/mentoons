import globalErrorHandler from './middleware/globalErrorHandler.js'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import messageRoutes from './routes/messageRoutes.js'

const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())


app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',messageRoutes)

 
app.use(globalErrorHandler)


export default app