const { User } = require('../models/models')
const errorHandler = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateJwt = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' })
}

class UserController {
    async register(req, res) {
        const candidate = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (candidate) {
            res.status(409).json({
                message: 'Такий користувач вже існує, спробуйте увійти'
            })
        } else {
            try {
                const hashPassword = await bcrypt.hash(req.body.password, 5)
                await User.create({
                    email: req.body.email,
                    password: hashPassword
                })
                res.status(201).json({ message: "Зарєстровано" })
            } catch (error) {
                errorHandler(res, error)
            }
        }
    }

    async login(req, res) {
        const candidate = await User.findOne({
            where:
                { email: req.body.email }
        })
        if (candidate) {
            const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
            if (passwordResult) {
                const token = generateJwt(candidate.id, candidate.email)
                return res.json({
                    id: candidate.id,
                    email: candidate.email,
                    img: candidate.img,
                    token
                })

            } else {
                res.status(401).json({
                    message: 'Невірно вказаний пароль'
                })
            }
        } else {
            res.status(404).json({
                message: 'Користувача з цією поштою не знайдено :('
            })
        }
    }

    async addavatar(req, res) {
        const candidate = await User.findOne({
            where:
                { id: req.params.id }
        })
        if (candidate) {
            try {
                await User.update({ img: req.body.img }, {
                    where: { id: req.params.id }
                })
                res.status(200).json({
                    message: 'Аватар успішно змінено'
                })
            } catch (error) {
                errorHandler(res, error)
            }
        } else {
            res.status(404).json({
                message: 'Невірно вказано id користувача'
            })
        }
    }
}

module.exports = new UserController
