const express = require('express');
const router = express.Router();

const filteredResponse = require('../controllers/filtered-response');

router.post('/', filteredResponse.send);

router.route('*').all((req, res) => {
  return res.status(404).json({ message: 'This API route does not exist.' });
});

module.exports = router;
