

const express = require('express');
const db = require('../db'); // Assuming db.js is in the parent directory
const Project = require('../models/projects');

const router = express.Router();

// Get all projects
router.get('/', async function (req, res, next) {
    try {
        const projects = await Project.syncProjects();
        return res.json({ projects });
    } catch (err) {
        return next(err);
    }
    });



router.get('/assets', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM projects');
    res.json(rows);
  } catch (error) {
    console.error('Error getting projects', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific project by name
router.get('/asset/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM projects WHERE name = $1', [name]);
    res.json(rows[0]);
  } catch (error) {
    console.error(`Error getting project with name ${name}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new project
router.post('/assets', async (req, res) => {
  const { name, product_category, /* other fields */ } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO projects (name, product_category /* other fields */) VALUES ($1, $2 /* other values */) RETURNING *',
      [name, product_category /* other values */]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Error adding project', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a project
router.put('/asset/:name', async (req, res) => {
  const { name } = req.params;
  const { product_category, /* other fields */ } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE projects SET product_category = $1 /* other fields */ WHERE name = $2 RETURNING *',
      [product_category /* other values */, name]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error(`Error updating project with name ${name}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a project
router.delete('/asset/:name', async (req, res) => {
  const { name } = req.params;
  try {
    await db.query('DELETE FROM projects WHERE name = $1', [name]);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(`Error deleting project with name ${name}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
