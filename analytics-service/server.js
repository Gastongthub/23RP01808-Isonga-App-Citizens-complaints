const express = require('express');
const dotenv = require('dotenv');
const { initializeDatabase } = require('./config/database');
const ComplaintAnalytics = require('./models/ComplaintAnalytics');

dotenv.config();

const app = express();
app.use(express.json());

// Initialize database
initializeDatabase();

// Routes
app.post('/analytics/complaints', async (req, res) => {
    try {
        const analytics = await ComplaintAnalytics.create(req.body);
        res.status(201).json(analytics);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/analytics/complaints', async (req, res) => {
    try {
        const analytics = await ComplaintAnalytics.findAll();
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/analytics/complaints/:complaintId', async (req, res) => {
    try {
        const analytics = await ComplaintAnalytics.findOne({
            where: { complaintId: req.params.complaintId }
        });
        if (!analytics) {
            return res.status(404).json({ message: 'Analytics not found' });
        }
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/analytics/complaints/:complaintId', async (req, res) => {
    try {
        const [updated] = await ComplaintAnalytics.update(req.body, {
            where: { complaintId: req.params.complaintId }
        });
        if (!updated) {
            return res.status(404).json({ message: 'Analytics not found' });
        }
        const analytics = await ComplaintAnalytics.findOne({
            where: { complaintId: req.params.complaintId }
        });
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Server Error'
    });
});

// Start server
const PORT = process.env.ANALYTICS_PORT || 3001;
app.listen(PORT, () => {
    console.log(`Analytics service running on port ${PORT}`);
});