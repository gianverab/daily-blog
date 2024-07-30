import express from 'express';
import { connect } from 'mongoose';
import { json } from 'body-parser';
import { initialize } from 'passport';
require('dotenv').config();

// App setup
const app = express();
app.use(json());
app.use(initialize());

// DB setup
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes setup
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
