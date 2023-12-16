const express  = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const {loginRequired} = require('../middlewares/loginRequired')

/* router.get('/',loginRequired, userController.index)
router.get('/:id', userController.show)
router.post('/', userController.store) */
router.delete('/:id',loginRequired, userController.delete)
router.put('/:id',loginRequired, userController.update)



module.exports = router