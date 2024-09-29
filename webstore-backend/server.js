const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../webstore-frontend/public');
    cb(null, uploadPath); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep original file name
  }
});

const upload = multer({ storage });

// Endpoint to get items from products.json
app.get('/api/items', (req, res) => {
  const filePath = path.join(__dirname, 'products.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to handle item uploads
app.post('/api/upload', upload.single('img'), (req, res) => {
  const { name, price, stock } = req.body;
  const img = req.file ? req.file.filename : null; // Get the uploaded image filename

  const newItem = {
    name,
    img,
    price: parseFloat(price),
    stock: parseInt(stock)
  };

  // Read the existing items from products.json
  const filePath = path.join(__dirname, 'products.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading products.json:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Parse existing items
    let items = [];
    if (data) {
      items = JSON.parse(data);
    }

    // Add the new item to the array
    items.push(newItem);

    // Write updated items back to products.json
    fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to products.json:', err);
        return res.status(500).send('Internal Server Error');
      }

      res.status(201).send(newItem); // Respond with the newly created item
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
