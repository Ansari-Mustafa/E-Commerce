require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const Product = require('./product.model');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    url: process.env.CLOUDINARY_URL,
});

// Set up multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage }).fields([{ name: 'coverImage' }, { name: 'images' }]);

const addProduct = async (req, res) => {
    try {
        const { 
            name, 
            description, 
            category, 
            tags, 
            specs, 
            stock, 
            price, 
            old_price, 
            rating, 
            sortOrder 
        } = req.body;

        // Set default values if not provided
        const coverImage = req.files['coverImage'] ? req.files['coverImage'][0] : null;
        const images = req.files['images'] || [];
        
        const coverImageUrl = coverImage ? await uploadToCloudinary(coverImage) : null;
        const imageUrls = await Promise.all(images.map(img => uploadToCloudinary(img)));

        const newProduct = new Product({
            name,
            description,
            category,
            tags,
            specs,
            coverImage: coverImageUrl,
            stock,
            price,
            old_price: old_price !== undefined && old_price !== null && !isNaN(old_price) ? old_price : 0, // Default to 0 if invalid
            images: imageUrls,
            rating: rating !== undefined && rating !== null && !isNaN(rating) ? rating : 0, // Default to 0 if invalid
            sortOrder: sortOrder !== undefined ? sortOrder : 0 // Use provided sortOrder or default to 0
        });

        await newProduct.save();
        res.status(201).send({ message: 'Product Added!', product: newProduct });
    } catch (error) {
        console.error("Error adding Product!", error);
        res.status(500).send({ message: "Error adding product!", error: error.message });
    }
};


async function uploadToCloudinary(file) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream((error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
        }).end(file.buffer);
    });
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        console.error("Error getting Products!", error);
        res.status(500).send({ message: "Error getting products!", error: error.message });
    }
};

const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send({ message: 'Product not found!' });
        }

        return res.status(200).send(product);
    } catch (error) {
        console.error("Error getting Product!", error);
        return res.status(500).send({ message: "Error getting Product!", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).send({ message: 'Product not found!' });
        }

        return res.status(200).send({ message: "Updated Product!", product: updatedProduct });
    } catch (error) {
        console.error("Error updating Product!", error);
        return res.status(500).send({ message: "Error updating Product!", error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).send({ message: 'Product not found!' });
        }

        return res.status(200).send({ message: "Product deleted!", product: deletedProduct });
    } catch (error) {
        console.error("Error deleting Product!", error);
        return res.status(500).send({ message: "Error deleting Product!", error: error.message });
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
