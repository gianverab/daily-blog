const express = require('express');
const connectDB = require('./config/db'); 
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
