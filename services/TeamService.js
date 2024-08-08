const { Team, Player, sequelize } = require('../models');
const httpStatus = require('../utils/httpStatus');
const { Op } = require('sequelize');

class TeamService {

    constructor(data) {
        this.name = data.name;
        this.status = data.status;
        this.avatar = data.avatar;
    }

    async add() {
        try {
            const team = await Team.create(this);
            return {
                data: team,
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
            const teams = await Team.bulkCreate(data);
            return {
                data: teams,
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

    static async edit(winner_id, looser_id) {
        try {
            const winner = await Team.findByPk(+winner_id);
            winner.status = "winner";
            await winner.save();
            console.log(winner);
            const looser = await Team.findByPk(+looser_id);
            looser.status = "looser";
            await looser.save();
            console.log(looser);
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

    static async editAll() {
        try {
            await Team.update({
                status: "pending"
            }, {
                where: {
                    status: "winner"
                }
            });
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

    static async getAll() {
        try {
            const teams = await Team.findAll({
                include: [
                    {
                        model: Player,
                        as: 'players'
                    }
                ]
            });
            return {
                data: teams,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getById(id) {
        try {
            const team = await Team.findAll({
                include: [
                    {
                        model: Player,
                        as: 'players'
                    }
                ],
                where: {
                    id: id
                }
            });
            return {
                data: team,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async delete(team_id) {
        try {
            const team = await Team.destroy({
                where: {
                    id: team_id
                }
            });
            if (team == 1) {
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

    static async deleteAll() {
        try {
            await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
            const team = await Team.destroy({
                where: {},
                // truncate: true
            });
            await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
            if (team > 0) {
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

    static async checkFinal(teams) {
        try {
            let numOfWinners = 0;
            let numOfPending = 0;
            teams.map((team) => {
                if(team.status == "winner") {
                    numOfWinners++;
                } else if (team.status == "pending") {
                    numOfPending++;
                }
            });
            return {
                data: {
                    isFinal: (numOfPending + numOfWinners == 2)? true : false,
                    isFinalRound: (numOfPending == 2)? true : false,
                    numOfWinners: numOfWinners,
                    numOfPending: numOfPending
                },
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

module.exports = { TeamService };