const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './analytics.sqlite',
    logging: false
});

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('SQLite database connection established successfully.');
        await sequelize.sync();
        console.log('Database models synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, initializeDatabase };