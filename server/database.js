const Pool = require('sequelize')

module.exports = new Pool(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    define: {
        timestamps: false
    }
});
