const express = require('express');
const router = express.Router();

const filteredResponse = require('../controllers/filtered-response');

// Routes available
router.post('/', filteredResponse.send);

// Catch all non-existing routes
router.route('*').all((req, res) => {
  return res.status(404).json({ error: 'This route does not exist.' });
});

module.exports = router;
