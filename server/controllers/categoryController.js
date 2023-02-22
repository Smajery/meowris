const { Category, Memory } = require('../models/models')
const errorHandler = require('../utils/errorHandler')


class CategoryController {
    async getAll(req, res) {
        try {
            const category = await Category.findAll({
                where: { userId: req.params.userId },
                attributes: ['id', 'title']
            })
            res.status(200).json(category)
        } catch (error) {
            errorHandler(res, error)
        }
    }

    async add(req, res) {
        const candidate = await Category.findOne({
            where: {
                userId: req.body.userId,
                title: req.body.title
            }
        })
        if (candidate) {
            res.status(409).json({
                message: 'Ця категорія вже існує'
            })
        } else {
            try {
                const category = await Category.create({
                    userId: req.body.userId,
                    title: req.body.title
                })
                res.status(201).json(category)
            } catch (error) {
                errorHandler(res, error)
            }
        }
    }

    async delete(req, res) {
        const categoryId = req.params.id
        const candidate = await Category.findOne({
            where: {
                id: categoryId
            }
        })
        if (candidate) {
            try {
                await Memory.destroy({
                    where: { categoryId: categoryId }
                })
                await Category.destroy({
                    where: { id: categoryId }
                })
                res.status(201).json("Категорію видалено")
            } catch (error) {
                errorHandler(res, error)
            }
        } else {
            res.status(409).json({
                message: 'Обраної категорії не існує'
            })
        }
    }

    async update(req, res) {
        try {
            await Category.update(req.body, {
                where: { id: req.params.id }
            })
            res.status(200).json(
                await Category.findOne({
                    where: { id: req.params.id }
                }))
        } catch (error) {
            errorHandler(res, error)
        }
    }
}

module.exports = new CategoryController