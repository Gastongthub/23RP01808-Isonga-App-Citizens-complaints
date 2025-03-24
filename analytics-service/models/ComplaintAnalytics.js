const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ComplaintAnalytics = sequelize.define('ComplaintAnalytics', {
    complaintId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    responseTime: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    resolutionTime: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    commentCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    resolved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = ComplaintAnalytics;