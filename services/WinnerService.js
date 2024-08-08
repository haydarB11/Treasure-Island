const { Winner } = require('../models');
const httpStatus = require('../utils/httpStatus');

class WinnerService {

    constructor(data) {
        this.name = data.name;
    }

    async add() {
        try {
            const winner = await Winner.create(this);
            return {
                data: winner,
                status: httpStatus.OK
            };
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                return {
                    data: error.errors.map((err) => {
                        return {
                            name: err.path,
                            message: err.message
                        }
                    }),
                    status: httpStatus.BAD_REQUEST
                }
            } else {
                return {
                    data: error,
                    status: httpStatus.BAD_REQUEST
                };
            }
        }
    }

    static async getAll() {
        try {
            const winners = await Winner.findAll({});
            return {
                data: winners,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

}

module.exports = { WinnerService };