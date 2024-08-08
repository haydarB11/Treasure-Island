const {
	getAllWinnerTeams,
} = require('../../controllers/ManagerControllers/WinnerTeamController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

router.get('/', getAllWinnerTeams);

module.exports = router;