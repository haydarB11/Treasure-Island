const { Player } = require('../models');
const httpStatus = require('../utils/httpStatus');

class PlayerService {

    constructor(data) {
        this.name = data.name;
        this.country = data.country;
    }

    async add() {
        try {
            const player = await Player.create(this);
            return {
                data: player,
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

    static async addAll(data) {
        try {
            const players = await Player.bulkCreate(data);
            return {
                data: players,
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

    static async edit(data) {
        try {
            const player = await Player.findByPk(data.id);
            player.name = data.name || player.name;
            player.country = data.country || player.country;
            await player.save();
            return {
                data: 'updated',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async delete(player_id) {
        try {
            const player = await Player.destroy({
                where: {
                    id: player_id
                }
            });
            if (player == 1) {
                return {
                    data: 'deleted',
                    status: httpStatus.OK
                };
            } else {
                return {
                    data: 'something went wrong',
                    status: httpStatus.BAD_REQUEST
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

module.exports = { PlayerService };