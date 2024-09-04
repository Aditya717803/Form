const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://adityakumarlsaids122:Form%40123@cluster0.spilp.mongodb.net/feedbackDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Define a schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  gender: String,
});

// Create a model
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Route to handle form submission
app.post('/api/feedback', async (req, res) => {
  const { name, address, phone, gender } = req.body;

  const newFeedback = new Feedback({
    name,
    address,
    phone,
    gender,
  });

  try {
    await newFeedback.save();
    res.status(200).send('Feedback submitted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to submit feedback');
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
