const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const multer = require("multer");



const app = express()
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())

// app.use(require("morgan")("dev"));

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage }).single('image')

app.post('/upload', (req, res) => {

    upload(req, res, err => {
        if (err) res.json({ message: `Error Uploading Files` })
        res.json({ message: 'Image upload success' })
    })

})


app.use(express.static('public'))

app.listen(4000, () => {
    console.log(`Server is running on port 4000`)
})