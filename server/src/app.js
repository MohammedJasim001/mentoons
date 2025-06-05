import globalErrorHandler from './middleware/globalErrorHandler.js'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api',authRoutes)
 
app.use(globalErrorHandler)


export default app