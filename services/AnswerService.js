const { Question, Answer } = require('../models');
const httpStatus = require('../utils/httpStatus');
const { Op } = require('sequelize');

class AnswerService {

    constructor(data) {
        this.content = data.content;
        this.is_correct = data.is_correct;
        this.question_id = data.question_id;
    }

    async add() {
        try {
            const answer = await Answer.create(this);
            return {
                data: answer,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async addMany(data) {
        try {
            const answers = await Answer.bulkCreate(data);
            return {
                data: answers,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async delete(id) {
        try {
            const answer = await Answer.destroy({
                where: {
                    id: id
                }
            });
            return {
                data: 'answer deleted successfully',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async deleteMany(ids) {
        try {
            const answer = await Answer.destroy({
                where: {
                    id: {
                        [Op.in]: ids
                    }
                }
            });
            return {
                data: 'answers deleted successfully',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async edit(data) {
        try {
            const answer = await Answer.findByPk(data.id);
            answer.content = data.content || answer.content;
            answer.is_correct = data.is_correct || answer.is_correct;
            answer.question_id = data.question_id || answer.question_id;
            await answer.save();
            return {
                data: answer,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

}

module.exports = { AnswerService };