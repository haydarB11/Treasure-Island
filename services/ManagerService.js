const { Manager } = require('../models');
const httpStatus = require('../utils/httpStatus');

class ManagerService {

    constructor(data) {
        this.email = data.email;
        this.password = data.password;
    }

    static async login(data) {
        try {
            const manager = await Manager.findOne({
                where: {
                    email: data.email,
                }
            });
            if (!manager) {
                return {
                    data: 'User Not Found',
                    status: httpStatus.NOT_FOUND
                };
            } else if (data.password !== manager.password) {
                return {
                    data: 'Invalid password',
                    status: httpStatus.NOT_FOUND
                };
            } else {
                return {
                    data: {
                        token: manager.generateToken(),
                        data: manager
                    },
                    status: httpStatus.OK
                };
            }
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

}

module.exports = { ManagerService };