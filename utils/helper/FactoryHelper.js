
class FactoryHelper {

    static relateTeamWithPlayers (team_id, players) {
        for (let i = 0; i < players.length; i++) {
            players[i].team_id = team_id;
        }
        return players;
    }

}

module.exports = { FactoryHelper };