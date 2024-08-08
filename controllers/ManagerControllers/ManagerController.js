const { ManagerService } = require('../../services/ManagerService');


module.exports = {

    managerLogin: async (req, res) => {
        console.log('ok');
        const manager = await ManagerService.login(req.body);
        res.status(manager.status).send({
            data: manager.data,
        });
    },

    
    

}