const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Set storage engine for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Middleware to serve static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Route for file uploads and price calculation
app.post('/calculate', upload.single('printFile'), (req, res) => {
    const { quantity, unitPrice, width, height } = req.body;

    // Parse to make sure we are dealing with numbers
    const qty = parseFloat(quantity);
    const price = parseFloat(unitPrice);
    const w = parseFloat(width);
    const h = parseFloat(height);

    // Calculate surface area
    const surfaceArea = w * h;

    // Calculate total cost
    const totalCost = qty * price * surfaceArea;

    // File upload details
    const file = req.file;

    res.json({
        message: 'Calculation successful!',
        totalCost: totalCost.toFixed(2), // Format to 2 decimal places
        fileName: file ? file.filename : null
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



