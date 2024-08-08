const { AdvertisementService } = require('../../services/AdvertisementService');

module.exports = {

    getAllAdvertisements: async (req, res) => {
        const advertisements = await AdvertisementService.getAll();
        res.status(advertisements.status).send({
            data: advertisements.data
        });
    },

    addAdvertisement: async (req, res) => {
        const data = req.body;
        data.path = req.file.path;
        const category = await new AdvertisementService(data).add();
        res.status(category.status).send({
            data: category.data
        });
    },

    editAdvertisement: async (req, res) => {
        const data = req.body;
        data.path = req.file?.path;
        data.id = req.params.id;
        const advertisement = await AdvertisementService.edit(data);
        res.status(advertisement.status).send({
            data: advertisement.data
        });
    },

    deleteAdvertisement: async (req, res) => {
        const advertisement = await AdvertisementService.delete(req.params.id);
        res.status(advertisement.status).send({
            data: advertisement.data
        });
    },

}