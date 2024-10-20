const express = require('express');
const { ObjectId } = require('mongodb');
const clientPromise = require('./mongodb');
const router = express.Router();

// GET a template by ID
router.get('/:id', async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('website-builder');
    const collection = db.collection('templates');
    const { id } = req.params;

    const template = await collection.findOne({ _id: new ObjectId(id) });
    if (!template) {
      res.status(404).json({ error: 'Template not found' });
    } else {
      res.status(200).json(template);
    }
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// PUT to update a template by ID
router.put('/:id', async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('website-builder');
    const collection = db.collection('templates');
    const { id } = req.params;
    const { name, content } = req.body;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, content } }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ error: 'Template not found' });
    } else {
      res.status(200).json({ message: 'Template updated' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// DELETE a template by ID
router.delete('/:id', async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('website-builder');
    const collection = db.collection('templates');
    const { id } = req.params;

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Template deleted' });
    } else {
      res.status(404).json({ error: 'Template not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});


// GET all templates
router.get('/', async (req, res) => {
    try {
      const client = await clientPromise;
      const db = client.db('website-builder');
      const collection = db.collection('templates');
      const templates = await collection.find({}).toArray();
  
      res.status(200).json(templates);
    } catch (error) {
      res.status(500).json({ error: 'Database connection failed' });
    }
  });
  
  // POST to create a new template
  /*router.post('/', async (req, res) => {
    try {
      const client = await clientPromise;
      const db = client.db('website-builder');
      const { name, content } = req.body;
  
      const result = await collection.insertOne({ name, content, createdAt: new Date() });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Database connection failed' });
    }
  });*/

  // POST to create a new template
router.post('/', async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('website-builder');
    const collection = db.collection('templates'); // Define collection here

    const { name, content } = req.body;

    // Ensure both name and content are provided
    if (!name || !content) {
      return res.status(400).json({ error: 'Name and content are required' });
    }

    const result = await collection.insertOne({ name, content, createdAt: new Date() });
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating template:', error); // Log the error for debugging
    res.status(500).json({ error: 'Database connection failed or an error occurred' });
  }
});

  



module.exports = router;
