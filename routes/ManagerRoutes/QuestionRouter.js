const {
	getAllQuestionsWithInfo,
	getAllTurboRoundQuestionsWithInfo,
	getAllTurboRoundQuestionsWithInfoForManager,
	addQuestion,
	editQuestion,
	deleteManyQuestion,
	addQuestionWithAnswers,
	addQuestionWithAnswersFromExcelFile,
	getAllQuestionsWithInfoForOneCategory,
	dd,
	addQuestionWithAnswersAudienceTypeFromExcelFile,
	getAllAudienceQuestionsWithInfo,
	getAllAudienceQuestionsWithInfoForManager,
	exportAudienceQuestions,
	exportCategorizeQuestions,
	exportCategorizeAndTurboRoundQuestions,
	exportTurboQuestions,
} = require('../../controllers/ManagerControllers/QuestionController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');
const { upload } = require('../../utils/multer/uploadFiles');

router.use(isAuth);

router.get('/', getAllQuestionsWithInfo);

router.get('/audience', getAllAudienceQuestionsWithInfo);

router.put('/d/d', dd);

router.get('/turbo-rounds', getAllTurboRoundQuestionsWithInfoForManager);

router.get('/turbo-round', getAllTurboRoundQuestionsWithInfo);

router.get('/:category_id', getAllQuestionsWithInfoForOneCategory);

router.post('/', addQuestion);

router.post('/excel', upload.single('file'), addQuestionWithAnswersFromExcelFile);

router.post('/excel/export', exportCategorizeQuestions);

router.post('/audience/excel', upload.single('file'), addQuestionWithAnswersAudienceTypeFromExcelFile);

router.post('/audience/excel/export', exportAudienceQuestions);

router.post('/turbo/excel/export', exportTurboQuestions);

router.post('/with-answers', addQuestionWithAnswers);

router.put('/:id', editQuestion);

router.put('/audience/:id', editQuestion);

router.delete('/', deleteManyQuestion);

router.delete('/audience', deleteManyQuestion);

module.exports = router;