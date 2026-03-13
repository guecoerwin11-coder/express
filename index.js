require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
    serverSelectionTimeoutMS: 10000

})
.then(() => console.log('Mongo is running Connnected'))
.catch((err) => console.log('Server running Error', err))

const authRoute = require('./routes/auth')
const noteRoute = require('./routes/notes')
app.use('/auth', authRoute)
app.use('/note', noteRoute)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})