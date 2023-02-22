const Router = require('express')
const router = new Router()
const CategoryController = require('../controllers/categoryController')

router.get('/:userId', CategoryController.getAll)
router.post('/', CategoryController.add)
router.delete('/:id', CategoryController.delete)
router.patch('/:id', CategoryController.update)

module.exports = router