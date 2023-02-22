require('dotenv').config()
const express = require('express')
const sequelize = require('./database')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

async function start() {
    try {
        await sequelize.authenticate()
        app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })
    } catch (e) {
        console.log(e)
    }
}

start()

// Синхронизация с моделями
// удаляет все таблицы в базе и создает заново
// sequelize.sync({ force: true }).then(result => {
//     console.log("result done");
// })
//     .catch(err => console.log(err));