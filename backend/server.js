const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const templateRoutes = require('./templates');
require('dotenv').config();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/templates', templateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
