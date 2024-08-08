const { CategoryService } = require('../../services/CategoryService');
const { QuestionService } = require('../../services/QuestionService');

module.exports = {

    getAllCategoriesWithInfo: async (req, res) => {
        const { question_ids } = req.body;
        await QuestionService.editAllShowed(question_ids);
        const turboNum = await QuestionService.getAllTurbo();
        const audienceNum = await QuestionService.getAllAudience();
        const showedTurboNum = await QuestionService.getAllShowedTurbo();
        const showedAudienceNum = await QuestionService.getAllShowedAudience();
        if ( turboNum.data.length === showedTurboNum.data.length ) {
            await QuestionService.reverseAllShowedTurbo();
        }
        if ( audienceNum.data.length === showedAudienceNum.data.length ) {
            await QuestionService.reverseAllShowedAudience();
        }
        const oldCategories = await CategoryService.getAllWithInfo();
        for (let i = 0; i < oldCategories.data.length; i++) {
            if ( oldCategories.data[i].questions.length == 0 ) {
                await QuestionService.reverseAllShowedCategorizeForOneCategory(oldCategories.data[i].id);
            }
        }
        const categories = await CategoryService.getAllWithInfo();
        const turboRounds = await QuestionService.getAllWithInfo();
        const audience = await QuestionService.getAllAudienceWithInfo();
        res.status(categories.status).send({
            data: { 
                categories: categories.data,
                turboRounds: turboRounds.data,
                audience: audience.data
            },
        });
    },

    getAllCategories: async (req, res) => {
        const categories = await CategoryService.getAllWithInfo();
        res.status(categories.status).send({
            data: categories.data
        });
    },

    addCategory: async (req, res) => {
        const data = req.body;
        data.image = req.file.path;
        const category = await new CategoryService(data).add();
        res.status(category.status).send({
            data: category.data
        });
    },

    editCategory: async (req, res) => {
        const data = req.body;
        data.image = req.file?.path;
        data.id = req.params.id;
        const category = await CategoryService.edit(data);
        res.status(category.status).send({
            data: category.data
        });
    },

    deleteCategory: async (req, res) => {
        const category = await CategoryService.delete(req.params.id);
        res.status(category.status).send({
            data: category.data
        });
    },

    deleteManyCategory: async (req, res) => {
        const category = await CategoryService.deleteMany(req.body.ids);
        res.status(category.status).send({
            data: category.data
        });
    },

}