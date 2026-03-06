const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a food name'],
        trim: true,
        maxlength: [100, 'Name can not be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Specials']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Food', foodSchema);
