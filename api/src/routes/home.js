const { Router } = require('express');
const router = Router();

router.get('/', (req,res)=>{
    res.send('bienvenidos')
})

module.exports = router;