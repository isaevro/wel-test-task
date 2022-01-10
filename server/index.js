const express = require('express')
const recordRouter = require('./routes/record.routes')
const PORT = process.env.PORT || '8080';
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())
app.use('/', recordRouter)


app.listen(PORT, () => {console.log(`Server started on ${PORT}`)});