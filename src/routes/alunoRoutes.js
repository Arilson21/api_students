const expres = require('express');
const router = expres.Router();

const alunoController = require('../controllers/alunoController')
const {loginRequired} = require('../middlewares/loginRequired')


router.get('/',loginRequired, alunoController.index);
router.post('/',loginRequired, alunoController.store);
router.get('/:id',loginRequired, alunoController.show); 
router.put('/:id',loginRequired, alunoController.update);
router.delete('/:id',loginRequired, alunoController.delete);


module.exports = router