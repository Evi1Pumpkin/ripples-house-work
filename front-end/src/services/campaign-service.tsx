import axios from 'axios'
import { Campaign } from '../models/campaign.model';

const consumerApiUrl = 'http://localhost:3001/api/campaigns';
const managerApiUrl = 'http://localhost:3001/api/manage/campaigns';

export function getAllCampaigns(userToken?: String) : Promise<{campaigns: Campaign[], userToken: string}>{
    const headers: any = {};

    if (userToken && userToken !== ""){
        headers['Campaign-Token'] = userToken;
    }

    return new Promise((resolve, reject) => {
        axios
            .get(consumerApiUrl, {headers: headers})
            .then(response => {
                resolve({"campaigns": response.data,"userToken": response.headers["campaign-token"]});
            })
            .catch(error => {
                reject(error.message);
            });
    });
};

export function getAllManagedCampaigns() : Promise<Campaign[]>{
    return new Promise((resolve, reject) => {
        axios
            .get(managerApiUrl)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.message);
            });
    });
};


export function addCampaign(id: string, name: string, capMaxCount: number, data = {}) : Promise<Campaign>{
    return new Promise((resolve, reject) => {
        axios
            .post(managerApiUrl, { 
                'id': id,
                'name': name,
                'data': data,
                'capMaxCount': capMaxCount })
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};

export function updateCampaign(id: string, name: string, capMaxCount: number, data: Object = {}) : Promise<Campaign>{
    return new Promise((resolve, reject) => {
        axios
            .post(`${managerApiUrl}/${id}`, { 
                'id': id,
                'name': name,
                'data': data,
                'capMaxCount': capMaxCount })
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};

export function removeCampaign(id: string) : Promise<String> {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${managerApiUrl}/${id}`)
            .then(() => {
                resolve();
            })
            .catch(error => {
                reject(error.message);
            });
    });

};