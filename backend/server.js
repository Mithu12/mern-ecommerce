import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import {errorHandler, notFound} from "./middleware/errorMiddlware.js";
import morgan from "morgan";
import path from "path";

dotenv.config()
connectDB()
const app = express()

if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))

app.use(express.json())

app.use('/api/products/', productRoutes)
app.use('/api/users/', userRoutes)
app.use('/api/orders/', orderRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('REST is active')
    })
}

app.use(express.static('backend/uploads'))
// const dirname = path.resolve()
// app.use('/uploads', express.static(path.join(dirname, '/uploads')))

// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname)))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,
    console.log(
        `server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
    ))