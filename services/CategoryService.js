const { Category, Question, Answer } = require('../models');
const httpStatus = require('../utils/httpStatus');
const { Op } = require('sequelize');

class CategoryService {

    constructor(data) {
        this.name = data.name;
        this.image = data.image;
    }

    static async getAllWithInfo() {
        try {
            const categories = await Category.findAll({
                include: [
                    {
                        model: Question,
                        as: 'questions',
                        include: [
                            {
                                model: Answer,
                                as: 'answers',
                            }
                        ]
                    }
                ]
            });
            return {
                data: categories,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAll() {
        try {
            const categories = await Category.findAll({});
            return {
                data: categories,
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
            const category = await Category.create(this);
            return {
                data: category,
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
            const category = await Category.destroy({
                where: {
                    id: id
                }
            });
            return {
                data: 'category deleted successfully',
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
            const category = await Category.destroy({
                where: {
                    id: {
                        [Op.in]: ids
                    }
                }
            });
            return {
                data: 'category deleted successfully',
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
            const category = await Category.findByPk(data.id);
            category.name = data.name || category.name;
            category.image = data.image || category.image;
            await category.save();
            return {
                data: category,
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

module.exports = { CategoryService };