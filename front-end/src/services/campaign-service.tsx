import axios from 'axios'

const baseApiUrl = 'http://localhost:3001/api/campaign';


function getAllCampaigns() {
    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });
};


function addCampaign(id: string, name: string, data = {}){
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseApiUrl}`, { 
                'id': id,
                'name': name,
                'data': data })
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};


function updateCampaign(id: string, name: string, data = {}){
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseApiUrl}/${id}`, { 
                'id': id,
                'name': name,
                'data': data })
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};

function removeCampaign(id: string) {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${baseApiUrl}/${id}`)
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};

module.exports.getAllCampaigns = getAllCampaigns;
module.exports.addCampaign = addCampaign;
module.exports.updateCampaign = updateCampaign;
module.exports.removeCampaign = removeCampaign;