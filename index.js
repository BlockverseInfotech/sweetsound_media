const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000; // You can change this to your desired port

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Create a unique filename using the current timestamp and original file extension
    const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// API endpoint for uploading pictures
app.post('/upload', upload.single('picture'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = req.file.path;
  res.status(200).send('File uploaded successfully: ' + filePath);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
