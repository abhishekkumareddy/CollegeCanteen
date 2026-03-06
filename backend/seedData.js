const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Food = require('./models/Food');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const foods = [
    {
        name: "Dosa",
        description: "Classic fine crispy dosa served hot with chutney.",
        price: 35,
        image: "https://res.cloudinary.com/drrspbwwh/image/upload/v1757603328/items/bumjbpjrgkewiam5j31h.jpg",
        category: "Main Course"
    },
    {
        name: "Ghee Dosa",
        description: "Special rich dosa roasted in pure ghee for an authentic aroma and taste.",
        price: 45,
        image: "https://res.cloudinary.com/drrspbwwh/image/upload/v1760158852/items/bluvcfpeqxih2bnu5py7.jpg",
        category: "Specials"
    },
    {
        name: "Samosa",
        description: "Crispy pastry filled with a spiced savory mixture.",
        price: 15,
        image: "https://res.cloudinary.com/drrspbwwh/image/upload/v1760158900/items/ejki2tlofvzrbzrg1cz5.webp",
        category: "Appetizers"
    },
    {
        name: "Mountain Dew",
        description: "Chilled Mountain Dew (Glass Bottle).",
        price: 10,
        image: "https://res.cloudinary.com/drrspbwwh/image/upload/v1760158992/items/jv1hezk3z5lvoum6jb2t.jpg",
        category: "Beverages"
    },
    {
        name: "Poori",
        description: "Soft and fluffy deep-fried wheat bread served with curries.",
        price: 30,
        image: "https://res.cloudinary.com/drrspbwwh/image/upload/v1760159030/items/sgtcj574lzesm5q0w14v.jpg",
        category: "Main Course"
    },
    {
        name: "4 Idly",
        description: "Plate of 4 soft steamed rice and lentil cakes.",
        price: 30,
        image: "https://res.cloudinary.com/drrspbwwh/image/upload/v1760159147/items/zuwprcya35qcb9lto8rc.jpg",
        category: "Appetizers"
    },
    {
        name: "Rava Dosa",
        description: "Crispy crepe made from semolina and rice batter.",
        price: 45,
        image: "https://res.cloudinary.com/drrspbwwh/image/upload/v1760159309/items/zs8vtaabyci7obxwod1b.jpg",
        category: "Specials"
    },
    {
        name: "Pepsi",
        description: "Chilled Pepsi (Glass Bottle).",
        price: 10,
        image: "https://res.cloudinary.com/drrspbwwh/image/upload/v1760159386/items/efm9qo1kf2izozicxpov.jpg",
        category: "Beverages"
    },
    {
        name: "Vada",
        description: "Crispy deep-fried savory rings of lentil batter.",
        price: 20,
        image: "https://res.cloudinary.com/drrspbwwh/image/upload/v1760159525/items/emnioivvv5fbajnvbqkz.jpg",
        category: "Appetizers"
    }
];

const importData = async () => {
    try {
        // Clear existing foods
        await Food.deleteMany();

        // Insert new dummy foods
        await Food.insertMany(foods);

        console.log('Dummy Food Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error.message}`);
        process.exit(1);
    }
};

importData();
