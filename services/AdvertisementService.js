const { Advertisement } = require('../models');
const httpStatus = require('../utils/httpStatus');

class AdvertisementService {

    constructor(data) {
        this.path = data.path;
        this.description = data.description;
    }

    static async getAll() {
        try {
            const advertisements = await Advertisement.findAll({});
            return {
                data: advertisements,
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
            const advertisement = await Advertisement.create(this);
            return {
                data: advertisement,
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
            const advertisement = await Advertisement.destroy({
                where: {
                    id: id
                }
            });
            return {
                data: 'advertisement deleted successfully',
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
            const advertisement = await Advertisement.findByPk(data.id);
            advertisement.path = data.path || advertisement.path;
            advertisement.description = data.description || advertisement.description;
            await advertisement.save();
            return {
                data: advertisement,
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

module.exports = { AdvertisementService };