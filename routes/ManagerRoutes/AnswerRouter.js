const {
	addAnswer,
	editAnswer,
	deleteManyAnswer,
} = require('../../controllers/ManagerControllers/AnswerController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

router.post('/', addAnswer);

router.put('/:id', editAnswer);

router.delete('/', deleteManyAnswer);

module.exports = router; 