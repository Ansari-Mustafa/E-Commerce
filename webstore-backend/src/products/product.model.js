const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: [String],
        required: true,
        trim: true
    },
    tags: {
        type: [String],
        trim: true
    },
    specs: {
        type: [String],
        trim: true
    },
    coverImage: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    old_price: {
        type: Number,
        min: 0,
        default: 0 // Set a default value
    },    
    images: {
        type: [String], // Array of image URLs
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0 // Set a default value
    },
    sortOrder: {
        type: Number,
        default: 0 // Default value can be set to 0 or any other desired value
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
