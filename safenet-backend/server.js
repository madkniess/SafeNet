// Import libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize the app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.log(err));

// Define the URL schema
const UrlSchema = new mongoose.Schema({
  url: String,
  isMalicious: Boolean
});

const URL = mongoose.model('URL', UrlSchema);

// Route to handle URL submission
app.post('/submit', async (req, res) => {
  const { url } = req.body;

  // Here you would add actual threat analysis (e.g., API lookup, regex checks)
  // For now, we'll assume the URL is safe (false) or dangerous (true) randomly.
  const isMalicious = Math.random() > 0.5;

  const newUrl = new URL({ url, isMalicious });
  await newUrl.save();

  res.json({ success: true, isMalicious });
});

// Route to list all URLs
app.get('/urls', async (req, res) => {
  const urls = await URL.find();
  res.json(urls);
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
