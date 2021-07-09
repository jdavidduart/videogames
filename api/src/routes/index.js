const { Router } = require('express');
const genresRoutes=require('./genres')
const videogamesRoutes=require('./videogames')
const platformRoutes=require('./platforms')
const homeRoute=require('./home')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', homeRoute);
router.use('/genres', genresRoutes);
router.use('/videogames', videogamesRoutes);
router.use('/platforms', platformRoutes);
module.exports = router;
