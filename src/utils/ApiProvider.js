/**
 * Created by Marvin on 2017/6/19.
 */


import {post} from './FetchTools';

// API list
let API_GET_VERSION = '/public_api/app/getVersion';

let num = "0";


class ApiEveironment {
    constructor() {
        this.enviroment = '线上';
        this.HOST = 'http://www.1chacha.com/random_cms'; // 线上API HOST
    }
}

const apiEnvironment = new ApiEveironment();

export default class ApiProvider {


    static async getVersion() {
        let device = __ANDROID__ ? "android" : "ios";
        const body = {
            "device": device
        };
        return post(apiEnvironment.HOST + API_GET_VERSION, body);
    }



}

