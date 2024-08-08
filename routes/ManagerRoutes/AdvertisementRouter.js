const {
	getAllAdvertisements, 
	addAdvertisement, 
	editAdvertisement, 
	deleteAdvertisement,
} = require('../../controllers/ManagerControllers/AdvertisementController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');
const { upload } = require('../../utils/multer/uploadFiles');

router.use(isAuth);

router.get('/', getAllAdvertisements);

router.post('/', upload.single('video'), addAdvertisement);

router.put('/:id', upload.single('video'), editAdvertisement);

router.delete('/:id', deleteAdvertisement);

module.exports = router;