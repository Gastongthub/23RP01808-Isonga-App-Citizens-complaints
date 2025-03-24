const express = require('express');
const router = express.Router();
const {
    getComplaints,
    getComplaint,
    createComplaint,
    updateComplaint,
    deleteComplaint,
    addComment
} = require('../controllers/complaints');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router
    .route('/')
    .get(getComplaints)
    .post(createComplaint);

router
    .route('/:id')
    .get(getComplaint)
    .put(updateComplaint)
    .delete(deleteComplaint);

router.post('/:id/comments', addComment);

module.exports = router;