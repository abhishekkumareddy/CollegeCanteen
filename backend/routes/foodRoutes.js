const express = require('express');
const router = express.Router();
const {
    getFoods,
    getFoodById,
    createFood,
    updateFood,
    deleteFood,
} = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/')
    .get(getFoods)
    .post(protect, admin, createFood);

router.route('/:id')
    .get(getFoodById)
    .put(protect, admin, updateFood)
    .delete(protect, admin, deleteFood);

module.exports = router;
