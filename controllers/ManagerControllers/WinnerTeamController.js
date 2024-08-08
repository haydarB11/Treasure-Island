const { WinnerService } = require('../../services/WinnerService');
const httpStatus = require('../../utils/httpStatus');


module.exports = {

    getAllWinnerTeams: async (req, res) => {
        const winners = await WinnerService.getAll();
        res.status(winners.status).send({
            data: winners.data,
        });
    },
    

}