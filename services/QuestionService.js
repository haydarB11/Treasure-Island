const { Question, Answer, Category } = require('../models');
const httpStatus = require('../utils/httpStatus');
const { Op } = require('sequelize');

class QuestionService {

    constructor(data) {
        this.content = data.content;
        this.category_id = data.category_id;
        this.showed = data.showed;
        this.type = data.type;
    }

    static async getAllWithInfo() {
        try {
            const questions = await Question.findAll({
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                    },
                    {
                        model: Category,
                        as: 'category'
                    }
                ],
                where: {
                    category_id: null,
                    type: "turbo"
                }
            });
            return {
                data: questions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllAudienceWithInfo() {
        try {
            const questions = await Question.findAll({
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                    }
                ],
                where: {
                    category_id: null,
                    type: "audience"
                }
            });
            return {
                data: questions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.OK
            };
        }
    }

    static async getAllTurbo() {
        try {
            const questions = await Question.findAll({
                where: {
                    category_id: null,
                    type: "turbo"
                }
            });
            return {
                data: questions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllAudience() {
        try {
            const questions = await Question.findAll({
                where: {
                    category_id: null,
                    type: "audience"
                }
            });
            return {
                data: questions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllShowedTurbo() {
        try {
            const questions = await Question.findAll({
                where: {
                    category_id: null,
                    showed: true,
                    type: "turbo"
                },
            });
            return {
                data: questions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllShowedAudience() {
        try {
            const questions = await Question.findAll({
                where: {
                    category_id: null,
                    showed: true,
                    type: "audience"
                },
            });
            return {
                data: questions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllCategorize() {
        try {
            const questions = await Question.findAll({
                where: {
                    category_id: {
                        [Op.ne]: null
                    }
                }
            });
            return {
                data: questions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllShowedCategorize() {
        try {
            const questions = await Question.findAll({
                where: {
                    category_id: {
                        [Op.ne]: null
                    },
                    showed: true
                }
            });
            return {
                data: questions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllWithInfoForManager() {
        try {
            // console.log('in');
            const questions = await Question.findAll({
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                    },
                    // {
                    //     model: Category,
                    //     as: 'category'
                    // }
                ],
                where: {
                    category_id: null,
                    type: "turbo"
                }
            });
            // console.log('questions');
            // console.log(questions);
            const finalQuestions = [];
            let question = {};
            for (let i = 0; i < questions.length; i++) {
                // console.log(questions[i].category.name);
                question.id = questions[i].id;
                question.content = questions[i].content;
                question.answer1 = questions[i].answers[0].content;
                question.answer2 = questions[i].answers[1].content;
                question.answer3 = questions[i].answers[2].content;
                question.answer4 = questions[i].answers[3].content;
                question.showed = (questions[i].showed == 1) ? 'مستخدم' : 'جديد';
                finalQuestions.push(question);
                question={};
            }
            return {
                data: finalQuestions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllNormalWithInfo() {
        try {
            const questions = await Question.findAll({
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                    },
                    {
                        model: Category,
                        as: 'category',
                    }
                ],
                where: {
                    category_id: {
                        [Op.ne]: null
                    }
                }
            });
            const finalQuestions = [];
            let question = {};
            for (let i = 0; i < questions.length; i++) {
                // console.log(questions[i].category.name);
                question.id = questions[i].id;
                question.content = questions[i].content;
                question.category = questions[i].category.name;
                question.answer1 = questions[i].answers[0].content;
                question.answer2 = questions[i].answers[1].content;
                question.answer3 = questions[i].answers[2].content;
                question.answer4 = questions[i].answers[3].content;
                question.showed = (questions[i].showed == 1) ? 'مستخدم' : 'جديد';
                finalQuestions.push(question);
                question={};
            }
            // console.log(finalQuestions);
            return {
                data: finalQuestions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllAudienceWithInfoManager() {
        try {
            const questions = await Question.findAll({
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                    }
                ],
                where: {
                    category_id: null,
                    type: "audience"
                }
            });
            const finalQuestions = [];
            let question = {};
            for (let i = 0; i < questions.length; i++) {
                // console.log(questions[i].category.name);
                question.id = questions[i].id;
                question.content = questions[i].content;
                question.showed = (questions[i].showed == 1) ? 'مستخدم' : 'جديد';
                question.answer1 = questions[i].answers[0].content;
                question.answer2 = questions[i].answers[1].content;
                question.answer3 = questions[i].answers[2].content;
                question.answer4 = questions[i].answers[3].content;
                finalQuestions.push(question);
                question={};
            }
            // console.log(finalQuestions);
            return {
                data: finalQuestions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllShowedAudienceQuestions() {
        try {
            const questions = await Question.findAll({
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                    }
                ],
                where: {
                    category_id: null,
                    type: "audience",
                    showed: true
                }
            });
            const finalQuestions = [];
            let question = {};
            for (let i = 0; i < questions.length; i++) {
                // console.log(questions[i].category.name);
                question.id = questions[i].id;
                question.content = questions[i].content;
                question.answer1 = questions[i].answers[0].content;
                question.answer2 = questions[i].answers[1].content;
                question.answer3 = questions[i].answers[2].content;
                question.answer4 = questions[i].answers[3].content;
                question.category_id = questions[i].category_id;
                finalQuestions.push(question);
                question={};
            }
            // console.log(finalQuestions);
            return {
                data: finalQuestions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllShowedCategorizeAndFastRoundQuestions() {
        try {
            const questions = await Question.findAll({
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                    }
                ],
                where: {
                    [Op.or]: [
                        {
                            category_id: {
                                [Op.ne]: null
                            },
                        },
                        {
                            type: 'turbo'
                        }
                    ],
                    showed: true
                }
            });
            const finalQuestions = [];
            let question = {};
            for (let i = 0; i < questions.length; i++) {
                // console.log(questions[i].category.name);
                question.id = questions[i].id;
                question.content = questions[i].content;
                question.answer1 = questions[i].answers[0].content;
                question.answer2 = questions[i].answers[1].content;
                question.answer3 = questions[i].answers[2].content;
                question.answer4 = questions[i].answers[3].content;
                question.category_id = questions[i].category_id;
                finalQuestions.push(question);
                question={};
            }
            // console.log(finalQuestions);
            return {
                data: finalQuestions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllShowedCategorizeQuestions() {
        try {
            const questions = await Question.findAll({
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                    }
                ],
                where: {
                    category_id: {
                        [Op.ne]: null
                    },
                    showed: true
                }
            });
            const finalQuestions = [];
            let question = {};
            for (let i = 0; i < questions.length; i++) {
                // console.log(questions[i].category.name);
                question.id = questions[i].id;
                question.content = questions[i].content;
                question.answer1 = questions[i].answers[0].content;
                question.answer2 = questions[i].answers[1].content;
                question.answer3 = questions[i].answers[2].content;
                question.answer4 = questions[i].answers[3].content;
                question.category_id = questions[i].category_id;
                finalQuestions.push(question);
                question={};
            }
            // console.log(finalQuestions);
            return {
                data: finalQuestions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllShowedFastRoundQuestions() {
        try {
            const questions = await Question.findAll({
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                    }
                ],
                where: {
                    type: 'turbo',
                    showed: true
                }
            });
            const finalQuestions = [];
            let question = {};
            for (let i = 0; i < questions.length; i++) {
                // console.log(questions[i].category.name);
                question.id = questions[i].id;
                question.content = questions[i].content;
                question.answer1 = questions[i].answers[0].content;
                question.answer2 = questions[i].answers[1].content;
                question.answer3 = questions[i].answers[2].content;
                question.answer4 = questions[i].answers[3].content;
                question.category_id = questions[i].category_id;
                finalQuestions.push(question);
                question={};
            }
            // console.log(finalQuestions);
            return {
                data: finalQuestions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllNormalWithInfoForOneCategory(category_id) {
        try {
            const questions = await Question.findAll({
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                    },
                    {
                        required: true,
                        model: Category,
                        as: 'category',
                    }
                ],
                where: {
                    category_id: category_id
                }
            });
            const finalQuestions = [];
            let question = {};
            for (let i = 0; i < questions.length; i++) {
                // console.log(questions[i].category.name);
                question.id = questions[i].id;
                question.content = questions[i].content;
                question.category = questions[i].category.name;
                question.answer1 = questions[i].answers[0].content;
                question.answer2 = questions[i].answers[1].content;
                question.answer3 = questions[i].answers[2].content;
                question.answer4 = questions[i].answers[3].content;
                finalQuestions.push(question);
                question={};
            }
            // console.log(finalQuestions);
            return {
                data: finalQuestions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    async add() {
        try {
            const question = await Question.create(this);
            return {
                data: question,
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
            const question = await Question.destroy({
                where: {
                    id: id
                }
            });
            return {
                data: 'question deleted successfully',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async editAllShowed(ids) {
        try {
            const questions = await Question.update({
                showed: true
            }, {
                where: {
                    id: {
                        [Op.in]: ids
                    }
                }
            });
            return {
                data: 'questions edited successfully',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async d() {
        try {
            const specificDate = new Date('2024-03-13');
            const questions = await Question.update({
                showed: true
            }, {
                where: {
                    created_at: {
                        [Op.lte]: specificDate
                    }
                }
            });
            return {
                data: 'questions edited successfully',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async reverseAllShowedTurbo() {
        try {
            const questions = await Question.update({
                showed: false
            }, {
                where: {
                    category_id: {
                        [Op.eq]: null
                    },
                    type: "turbo"
                }   
            });
            return {
                data: 'questions edited successfully',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async reverseAllShowedAudience() {
        try {
            const questions = await Question.update({
                showed: false
            }, {
                where: {
                    category_id: {
                        [Op.eq]: null
                    },
                    type: "audience"
                }   
            });
            return {
                data: 'questions edited successfully',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async reverseAllShowedCategorize() {
        try {
            const questions = await Question.update({
                showed: false
            }, {
                where: {
                    category_id: {
                        [Op.ne]: null
                    }
                }   
            });
            return {
                data: 'questions edited successfully',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async reverseAllShowedCategorizeForOneCategory(category_id) {
        try {
            const questions = await Question.update({
                showed: false
            }, {
                where: {
                    category_id: category_id
                }   
            });
            return {
                data: 'questions edited successfully',
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
            const question = await Question.destroy({
                where: {
                    id: {
                        [Op.in]: ids
                    }
                }
            });
            return {
                data: 'question deleted successfully',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async deleteAllShowedAudienceQuestions() {
        try {
            const question = await Question.destroy({
                where: {
                    type: 'audience',
                    showed: true
                }
            });
            return {
                data: 'question deleted successfully',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async deleteAllShowedCategorizeAndFastRoundQuestions() {
        try {
            const question = await Question.destroy({
                where: {
                    [Op.or]: [
                        {
                            category_id: {
                                [Op.ne]: null
                            },
                        },
                        {
                            type: 'turbo'
                        }
                    ],
                    showed: true
                }
            });
            return {
                data: 'question deleted successfully',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async deleteAllShowedFastRoundQuestions() {
        try {
            const question = await Question.destroy({
                where: {
                    type: 'turbo',
                    showed: true
                }
            });
            return {
                data: 'question deleted successfully',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async deleteAllShowedCategorizeQuestions() {
        try {
            const question = await Question.destroy({
                where: {
                    category_id: {
                        [Op.ne]: null
                    },
                    showed: true
                }
            });
            return {
                data: 'question deleted successfully',
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
            const question = await Question.findByPk(data.id);
            question.content = data.content || question.content;
            question.type = data.type || question.type;
            question.category_id = data.category_id || question.category_id;
            await question.save();
            return {
                data: question,
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

module.exports = { QuestionService };