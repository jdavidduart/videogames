const { Router } = require('express');
const router = Router();
const platformController = require('../controllers/platforms')


router.get('/', platformController.getAll)

module.exports = router;