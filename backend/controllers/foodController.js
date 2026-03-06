const Food = require('../models/Food');

// @desc    Fetch all food items
// @route   GET /api/foods
// @access  Public
const getFoods = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const category = req.query.category ? { category: req.query.category } : {};

        const query = { ...keyword, ...category };

        const foods = await Food.find(query);
        res.json(foods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Fetch single food item
// @route   GET /api/foods/:id
// @access  Public
const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (food) {
            res.json(food);
        } else {
            res.status(404).json({ message: 'Food not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create a food item
// @route   POST /api/foods
// @access  Private/Admin
const createFood = async (req, res) => {
    try {
        const { name, price, description, image, category } = req.body;

        const food = new Food({
            name,
            price,
            description,
            image: image || 'no-photo.jpg',
            category,
        });

        const createdFood = await food.save();
        res.status(201).json(createdFood);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a food item
// @route   PUT /api/foods/:id
// @access  Private/Admin
const updateFood = async (req, res) => {
    try {
        const { name, price, description, image, category } = req.body;

        const food = await Food.findById(req.params.id);

        if (food) {
            food.name = name || food.name;
            food.price = price || food.price;
            food.description = description || food.description;
            food.image = image || food.image;
            food.category = category || food.category;

            const updatedFood = await food.save();
            res.json(updatedFood);
        } else {
            res.status(404).json({ message: 'Food not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a food item
// @route   DELETE /api/foods/:id
// @access  Private/Admin
const deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);

        if (food) {
            res.json({ message: 'Food removed' });
        } else {
            res.status(404).json({ message: 'Food not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getFoods,
    getFoodById,
    createFood,
    updateFood,
    deleteFood,
};
