const { Router } = require('express');
const router = Router();
const videogameController = require('../controllers/videogames')


router.get('/', videogameController.getAllVideogames)
router.get('/:id', videogameController.getById)
router.post('/', videogameController.add)

module.exports = router;    