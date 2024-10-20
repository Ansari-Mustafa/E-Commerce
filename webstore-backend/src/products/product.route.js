const express = require('express');
const router = express.Router();
const controller  = require('./product.controller');

router.post('/create-product', controller.addProduct)

router.get('/', controller.getAllProducts)

router.get('/:id', controller.getSingleProduct)

router.put('/edit/:id', controller.updateProduct)

router.delete('/delete/:id', controller.deleteProduct)

module.exports = router;