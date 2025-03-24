const Complaint = require('../models/Complaint');

// Get all complaints
exports.getComplaints = async (req, res) => {
    try {
        let query = Complaint.find().populate('user', 'name email');

        // Add filtering
        if (req.user.role !== 'admin') {
            query = query.find({ user: req.user.id });
        }

        const complaints = await query;

        res.json({
            success: true,
            count: complaints.length,
            data: complaints
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get single complaint
exports.getComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id).populate('user', 'name email');

        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found' });
        }

        // Make sure user is complaint owner or admin
        if (complaint.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to access this complaint' });
        }

        res.json({
            success: true,
            data: complaint
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Create new complaint
exports.createComplaint = async (req, res) => {
    try {
        req.body.user = req.user.id;

        const complaint = await Complaint.create(req.body);

        res.status(201).json({
            success: true,
            data: complaint
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update complaint
exports.updateComplaint = async (req, res) => {
    try {
        let complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found' });
        }

        // Make sure user is complaint owner or admin
        if (complaint.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to update this complaint' });
        }

        complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json({
            success: true,
            data: complaint
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete complaint
exports.deleteComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found' });
        }

        // Make sure user is complaint owner or admin
        if (complaint.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this complaint' });
        }

        await complaint.remove();

        res.json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Add comment to complaint
exports.addComment = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found' });
        }

        const comment = {
            text: req.body.text,
            user: req.user.id
        };

        complaint.comments.push(comment);
        await complaint.save();

        res.json({
            success: true,
            data: complaint
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};