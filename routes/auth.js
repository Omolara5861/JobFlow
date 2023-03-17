const {Router} = require('express');
const router = Router();
const {login, register} = require('../controllers/auth')

router.route('/login').get(login);
router.route('/register').post(register);