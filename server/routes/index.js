const Router = require('express')
const router = new Router()

const memoryRouter = require('./memoryRouter')
const categoryRouter = require('./categoryRouter')
const userRouter = require('./userRouter')

router.use('/memory', memoryRouter)
router.use('/category', categoryRouter)
router.use('/user', userRouter)

module.exports = router