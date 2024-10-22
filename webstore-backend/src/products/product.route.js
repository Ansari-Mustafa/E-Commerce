const express = require('express');
const multer = require('multer');
const router = express.Router();
const controller = require('./product.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create-product', upload.fields([{ name: 'coverImage' }, { name: 'images' }]), controller.addProduct);
router.get('/', controller.getAllProducts);
router.get('/:id', controller.getSingleProduct);
router.put('/edit/:id', controller.updateProduct);
router.delete('/delete/:id', controller.deleteProduct);

module.exports = router;
