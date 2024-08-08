const {
	managerLogin,
} = require('../../controllers/ManagerControllers/ManagerController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.post('/login', managerLogin);

router.use(isAuth);

module.exports = router;