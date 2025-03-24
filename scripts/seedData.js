const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Complaint = require('../models/Complaint');
const { Sequelize } = require('sequelize');
const ComplaintAnalytics = require('../analytics-service/models/ComplaintAnalytics');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Connect to SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './analytics-service/analytics.sqlite',
    logging: false
});

// Sample data
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user'
    }
];

const complaints = [
    {
        title: 'Road Maintenance Required',
        description: 'The main road in our sector needs urgent repairs due to potholes',
        location: {
            district: 'Gasabo',
            sector: 'Kimironko',
            cell: 'Kibagabaga'
        },
        status: 'pending',
        priority: 'high'
    },
    {
        title: 'Water Supply Issues',
        description: 'Intermittent water supply in our area for the past week',
        location: {
            district: 'Nyarugenge',
            sector: 'Nyamirambo',
            cell: 'Mumena'
        },
        status: 'in-progress',
        priority: 'medium'
    },
    {
        title: 'Street Lighting Problem',
        description: 'Several street lights are not working in our cell',
        location: {
            district: 'Kicukiro',
            sector: 'Niboye',
            cell: 'Gatare'
        },
        status: 'resolved',
        priority: 'low'
    }
];

// Seed function
async function seedData() {
    try {
        // Clear existing data
        await User.deleteMany();
        await Complaint.deleteMany();
        await ComplaintAnalytics.destroy({ where: {} });

        // Create users
        const createdUsers = await User.create(users);

        // Create complaints with user references
        const complaintPromises = complaints.map(async (complaint, index) => {
            const complaintData = {
                ...complaint,
                user: createdUsers[index % createdUsers.length]._id
            };
            const createdComplaint = await Complaint.create(complaintData);

            // Create corresponding analytics
            await ComplaintAnalytics.create({
                complaintId: createdComplaint._id.toString(),
                category: complaint.priority,
                status: complaint.status,
                responseTime: Math.floor(Math.random() * 48) + 1,
                resolutionTime: complaint.status === 'resolved' ? Math.floor(Math.random() * 168) + 48 : null,
                commentCount: Math.floor(Math.random() * 5),
                resolved: complaint.status === 'resolved'
            });

            return createdComplaint;
        });

        await Promise.all(complaintPromises);

        console.log('Data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seedData();