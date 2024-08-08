const {
	userRegister,
	managerLogin,
	editUser,
	editOwnAccount,
	deleteUser,
	// addWinner,
} = require('../../controllers/ManagerControllers/UserController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.post('/login', managerLogin);

router.use(isAuth);

router.post('/add', userRegister);

router.post('/add-winner', addWinner);

router.put('/edit', editOwnAccount);

router.put('/edit/:user_id', editUser);

router.delete('/delete/:user_id', deleteUser);

module.exports = router;