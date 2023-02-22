const { Memory, Category } = require('../models/models')
const errorHandler = require('../utils/errorHandler')

class MemoryController {
    async getAllByUser(req, res) {
        try {
            const categories = await Category.findAll({
                where: { userId: req.params.userId },
                attributes: [],
                include: { model: Memory }
            })
            var memory = []
            categories.forEach(category => {
                category.memories.forEach(el => {
                    memory.push(el)
                });
            });
            res.status(200).json(memory)
        } catch (error) {
            errorHandler(res, error)
        }
    }

    async getAllByCategory(req, res) {
        try {
            const memories = await Memory.findAll({
                where: { categoryId: req.params.categoryId },
                attributes: ['id', 'title', 'img', 'rating']
            })
            res.status(200).json(memories)
        } catch (error) {
            errorHandler(res, error)
        }
    }

    async getOne(req, res) {
        try {
            const memory = await Memory.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (memory) {
                res.status(200).json(memory)
            } else {
                res.status(404).json({
                    message: 'Спогад не знайдено'
                })
            }
        } catch (error) {
            errorHandler(res, error)
        }
    }

    async add(req, res) {
        const candidate = await Memory.findOne({
            where: {
                title: req.body.title,
                categoryId: req.body.categoryId,
                img: req.body.img
            }
        })
        if (candidate) {
            res.status(409).json({
                message: 'Спогад з такими даними вже існує'
            })
        } else {
            try {
                const memory = await Memory.create({
                    title: req.body.title,
                    description: req.body.description,
                    rating: req.body.rating,
                    img: req.body.img,
                    categoryId: req.body.categoryId
                })
                res.status(201).json(memory)
            } catch (error) {
                errorHandler(res, error)
            }
        }
    }

    async delete(req, res) {
        const memoryId = req.params.id
        const candidate = await Memory.findOne({
            where: {
                id: memoryId
            }
        })
        if (candidate) {
            try {
                await Memory.destroy({
                    where: { id: memoryId }
                })
                res.status(201).json("Спогад видалено")
            } catch (error) {
                errorHandler(res, error)
            }
        } else {
            res.status(409).json({
                message: 'Обраного спогаду не існує'
            })
        }
    }

    async update(req, res) {
        try {
            await Memory.update(req.body, {
                where: { id: req.params.id }
            })
            res.status(200).json(
                await Memory.findOne({
                    where: { id: req.params.id }
                }))
        } catch (error) {
            errorHandler(res, error)
        }
    }
}

module.exports = new MemoryController
