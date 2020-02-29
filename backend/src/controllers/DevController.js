const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// FUNCOES QUE GERALMENTE COMPOEM EM CONTROLLER:
// index: quando quer mostrar uma lista
// show: quando quer mostrar um unico registro 
// store: criar um novo registro
// update: atualizar um registro
// destroy: excluir um registro

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        return response.json( devs );
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates:[ longitude, latitude ]
            }
        
            dev = await Dev.create({
                name, 
                avatar_url, 
                bio,
                github_username,
                techs: techsArray,
                location
            });
        }
    
        // console.log(name, avatar_url, bio, github_username);
        response.json(dev);
    }
}