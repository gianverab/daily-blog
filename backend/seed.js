const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const BlogPost = require('./models/BlogPost');
require('dotenv').config();

// Connect the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  await deleteMany({});
  await _deleteMany({});

  const salt = await genSalt(10);
  const hashedPassword = await hash('password123', salt);

  const user = new User({
    name: 'Giancarlo Vera',
    email: 'giancarlo.vera@fulltimeforce.com',
    password: hashedPassword,
    avatar: 'https://via.placeholder.com/150', // Placeholder image URL
  });

  await user.save();

  // Populate the database with dummy data
  const posts = [
    {
      title: 'First Blog Post',
      content: 'This is the content of the first blog post.',
      author: user._id,
    },
    {
      title: 'Second Blog Post',
      content: 'This is the content of the second blog post.',
      author: user._id,
    },
  ];

  await insertMany(posts);
  console.log('Data seeded successfully');
};

const runSeed = async () => {
  await connectDB();
  await seedData();
  connection.close();
};

runSeed();
