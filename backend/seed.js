const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const posts = [
  {
    title: 'First Post',
    content: 'This is the content of the first post.',
    author: 'Giancarlo Vera',
  },
  {
    title: 'Second Post',
    content: 'This is the content of the second post.',
    author: 'Giancarlo Vera',
  },
];

console.log('MONGO_URI:', process.env.MONGO_URI); // Debugging line

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await BlogPost.deleteMany({});
  await BlogPost.insertMany(posts);
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB();
