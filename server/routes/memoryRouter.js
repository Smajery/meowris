const Router = require('express')
const router = new Router()
const MemoryController = require('../controllers/memoryController')

router.get('/:userId', MemoryController.getAllByUser)
router.get('/all/:categoryId', MemoryController.getAllByCategory)
router.get('/one/:id', MemoryController.getOne)
router.post('/', MemoryController.add)
router.delete('/:id', MemoryController.delete)
router.patch('/:id', MemoryController.update)

module.exports = router