/**
 * Created by Marvin on 2017/6/19.
 * fetch request
 */

import {AsyncStorage, NetInfo} from 'react-native';


// custom request function
export async function request(url, originalOptions = {}) {
    let result = {
        success: false,
        message: '',
        data: null,
        code: ''
    };

    let options = deepCopy(originalOptions);
    options.method = options.method || 'GET';
    options.headers = options.headers || {};
    if (options.method === 'GET' || options.method === 'HEAD') {
        //拼接get head请求参数
    } else if (options.method === 'POST') {
        options.body = options.body || {};
    }

    let obj = options.body;

    options.body = JSON.stringify(obj);//重置请求参数options


    //等待 fetch进行网络请求，将服务器的信息返回
    let resp = null;
    try {
        resp = await fetch(url, options);
    } catch (error) {
        console.warn('fetch内部throw错误：\n' + JSON.stringify(error) + '\n' + url + '\n ' + JSON.stringify(options));
        result.code = '-678';
        result.message = '请求出错，请检查网络';
        return result;
    }

    if (!resp.ok) {
        //这里的错误信息一般都是http 400 ，500 等的错误
        console.warn(`http错误码:${resp.status}${resp.statusText || ''}${'\n' + url + '\n'}${'请求参数：' + JSON.stringify(options)}`);

        if (!resp.status === 401) {
            let httpErrorResult = {};
            httpErrorResult.resultCode = resp.status;
            httpErrorResult.resultDesc = resp.statusText || '请求出错，请检查配置项';
            httpErrorResult.resultData = "";
            return httpErrorResult;
        }

    }

    //对fetch后的数据进行json()
    //但并不一定会有正确数据。例如,即使http状态200,但是resp.status的内容却是非json格式数据
    //再比如，http 200，但是返回的却是后台服务器数据库的错误信息 或html页面信息等等
    try {
        const json = await resp.json();

        return json;
    } catch (error) {
        console.warn(error);
        console.warn(url + JSON.stringify(originalOptions, null, 4));
        result.code = error.code || -679;
        result.message = '不能被解析的数据类型' || error.message;

        return result;
    }


}

//对象深拷贝
function deepCopy(p, b) {
    let c = b || {};
    for (const i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
}


//get请求
export function get(url, options) {
    return request(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        ...options
    });
}

//post请求
export function post(url, body = {}) {
    return request(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    });
}



















