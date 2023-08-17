const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname)))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/itxap-test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error))

const matrixSchema = new mongoose.Schema({
    rows: Number,
    columns: Number,
    value: [Number],
    finalValue: [Number]
})

const Matrix = mongoose.model('Matrix', matrixSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'arrayProcess.html'))
})

app.get('/api/matrix', async (req, res) => {
    try{
        const data = await Matrix.find()
        res.json({
            success: true,
            data
        })
    }catch(err) {
        return res.json({
            success: false,
            message: 'No hay matrices guardadas',
            err
        })
    }
})

app.post('/api/matrix', async (req, res) => {
    try {
        const isMatrixExist = await Matrix.find()
        if(isMatrixExist.length) {
            await Matrix.findByIdAndRemove(isMatrixExist[0].id)
        }

        const { rows, columns, value, finalValue } = req.body
        const newArray = new Matrix({
            rows, columns, value: JSON.parse(value), finalValue: JSON.parse(finalValue)
        })
        await newArray.save()
        res.json({
            success: true,
            data: newArray
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se ha podido agregar el array',
            err
        })
    }
})

app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`)
})