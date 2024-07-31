const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// Middleware for authentication
//const auth = passport.authenticate('jwt', { session: false });

// Get all blog posts (with pagination)
router.get('/', async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const posts = await BlogPost.find()
      .populate('author', ['name', 'avatar'])
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await BlogPost.countDocuments();
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a single blog post
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', ['name', 'avatar']);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new blog post
router.post(
  '/', 
  [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;
    try {
      const newPost = new BlogPost({
        title,
        content,
        //author: req.user.id
      });
      const post = await newPost.save();
      
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Update a blog post
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    let post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    // Check user
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content, updatedAt: Date.now() } },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    // Check user
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
