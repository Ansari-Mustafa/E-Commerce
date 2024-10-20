const Product = require('./product.model');

const addProduct = async (req, res) => {
    try {
        const newProduct = await Product({...req.body});
    await newProduct.save();
    res.status(200).send({ message: 'Product Added!', product: newProduct })
    } catch (error) {
        console.error("Error adding Product!", error)
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send(products)
    } catch (error) {
        console.error("Error getting Products!", error)
    }
}

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
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedProduct) {
            return res.status(404).send({ message: 'Product not found!' });
        }
        
        return res.status(200).send({message: "Upadted Product!", product: updatedProduct});
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
        
        return res.status(200).send({message: "Product deleted!", product: deletedProduct});
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
    deleteProduct
}