const { AnswerService } = require('../../services/AnswerService');

module.exports = {

    addAnswer: async (req, res) => {
        const data = req.body;
        const answer = await new AnswerService(data).add();
        res.status(answer.status).send({
            data: answer.data
        });
    },

    editAnswer: async (req, res) => {
        const data = req.body;
        data.id = req.params.id;
        const answer = await AnswerService.edit(data);
        res.status(answer.status).send({
            data: answer.data
        });
    },

    deleteAnswer: async (req, res) => {
        const answer = await AnswerService.delete(req.params.id);
        res.status(answer.status).send({
            data: answer.data
        });
    },

    deleteManyAnswer: async (req, res) => {
        const answer = await AnswerService.deleteMany(req.body);
        res.status(answer.status).send({
            data: answer.data
        });
    },

}