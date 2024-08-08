const { PlayerService } = require('../../services/PlayerService');
const { TeamService } = require('../../services/TeamService');
const { WinnerService } = require('../../services/WinnerService');
const { QuestionService } = require('../../services/QuestionService');
const { CategoryService } = require('../../services/CategoryService');
const { FactoryHelper } = require('../../utils/helper/FactoryHelper');
const httpStatus = require('../../utils/httpStatus');


module.exports = {

    addTeam: async (req, res) => {
        const team = await new TeamService(req.body).add();
        const { question_ids } = req.body;
        const factoredData = FactoryHelper.relateTeamWithPlayers(team.data.id, req.body.players);
        const players = await PlayerService.addAll(factoredData);
        const teams = await TeamService.getAll();
        await QuestionService.editAllShowed(question_ids);
        const turboNum = await QuestionService.getAllTurbo();
        const audienceNum = await QuestionService.getAllAudience();
        const showedTurboNum = await QuestionService.getAllShowedTurbo();
        const showedAudienceNum = await QuestionService.getAllShowedAudience();
        if ( turboNum.data.length === showedTurboNum.data.length ) {
            await QuestionService.reverseAllShowedTurbo();
        }
        if ( audienceNum.data.length === showedAudienceNum.data.length ) {
            await QuestionService.reverseAllShowedAudience();
        }
        const oldCategories = await CategoryService.getAllWithInfo();
        for (let i = 0; i < oldCategories.data.length; i++) {
            if ( oldCategories.data[i].questions.length == 0 ) {
                await QuestionService.reverseAllShowedCategorizeForOneCategory(oldCategories.data[i].id);
            }
        }
        res.status(players.status).send({
            data: {
                team: team.data,
                players: players.data,
                completed: (teams.data.length == 32) ? true : false,
                num_of_teams: teams.data.length,
            },
        });
    },

    getAllTeams: async (req, res) => {
        const teams = await TeamService.getAll();
        const checkFinal = await TeamService.checkFinal(teams.data); 
        res.status(teams.status).send({
            data: teams.data,
            isFinal: checkFinal.data.isFinal,
            isFinalRound: checkFinal.data.isFinalRound
        });
    },

    deleteAllTeams: async (req, res) => {
        const teams = await TeamService.deleteAll();
        res.status(teams.status).send({
            data: teams.data
        });
    },

    finishOneGame: async (req, res) => {
        const {
            player_ids,
            winner_id,
            question_ids
        } = req.body;
        let looser_id = player_ids[0];
        if (req.body?.isFinal) {
            const winner = await TeamService.getById(winner_id);
            await new WinnerService(winner.data).add();
            await TeamService.deleteAll();
            return res.status(httpStatus.OK).send({
                data: {
                    msg: "the competition is finished",
                }
            });
        } else {    
            if (player_ids[0] == winner_id) {
                looser_id = player_ids[1];
            }
            await QuestionService.editAllShowed(question_ids);
            const turboNum = await QuestionService.getAllTurbo();
            const audienceNum = await QuestionService.getAllAudience();
            const showedTurboNum = await QuestionService.getAllShowedTurbo();
            const showedAudienceNum = await QuestionService.getAllShowedAudience();
            if ( turboNum.data.length === showedTurboNum.data.length ) {
                await QuestionService.reverseAllShowedTurbo();
            }
            if ( audienceNum.data.length === showedAudienceNum.data.length ) {
                await QuestionService.reverseAllShowedAudience();
            }
            const oldCategories = await CategoryService.getAllWithInfo();
            for (let i = 0; i < oldCategories.data.length; i++) {
                if ( oldCategories.data[i].questions.length == 0 ) {
                    await QuestionService.reverseAllShowedCategorizeForOneCategory(oldCategories.data[i].id);
                }
            }
            await TeamService.edit(winner_id, looser_id);
            let teams = await TeamService.getAll();
            const checkFinal = await TeamService.checkFinal(teams.data); 

            if (checkFinal.data.numOfWinners == 1 && checkFinal.data.numOfPending == 0) {
                const winner = await TeamService.getById(winner_id);
                await new WinnerService(winner.data).add();
                await TeamService.deleteAll();
                return res.status(httpStatus.OK).send({
                    data: "the competition is finished",
                });
            }
            else if (checkFinal.data.numOfPending == 0) {
                await TeamService.editAll();
                teams = await TeamService.getAll();
            }
            res.status(teams.status).send({
                data: {
                    teams: teams.data,
                    isFinal: checkFinal.data.isFinal,
                    isFinalRound: checkFinal.data.isFinalRound
                }
            });
        }
    },
    

}