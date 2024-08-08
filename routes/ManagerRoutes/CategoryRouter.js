const {
	getAllCategoriesWithInfo, 
	addCategory,
	editCategory,
	deleteCategory,
	getAllCategories,
	deleteManyCategory,
} = require('../../controllers/ManagerControllers/CategoryController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');
const { upload } = require('../../utils/multer/uploadFiles')

router.use(isAuth);

router.post('/get-all', getAllCategoriesWithInfo);

router.get('/', getAllCategories);

router.post('/', upload.single('image'), addCategory);

router.put('/:id', upload.single('image'), editCategory);

router.delete('/delete-many', deleteManyCategory); 

router.delete('/:id', deleteCategory);


module.exports = router; 