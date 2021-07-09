const { Router } = require('express');
const router = Router();
const genreController = require('../controllers/genres')


router.get('/', genreController.getAll)

module.exports = router;