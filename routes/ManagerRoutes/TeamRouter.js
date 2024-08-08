const {
	addTeam, 
	finishOneGame,
	getAllTeams,
	deleteAllTeams,
} = require('../../controllers/ManagerControllers/TeamController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

router.post('/add', addTeam);

router.delete('/delete', deleteAllTeams);

router.post('/game', finishOneGame);

router.get('/', getAllTeams);

module.exports = router;