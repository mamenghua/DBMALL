import * as API from './index';

export const getAddress = (params,token)=>{
    return API.TOKENPARAMSGET('/api/v1/addresses',params,token);
}

export const delAddress = (id,token)=>{
    return API.TOKENDEL('/api/v1/addresses/'+id,token);
}

export const addAddress = (params,token)=>{
    return API.TOKENPOST('/api/v1/addresses',params,token);
}

export const searchAddress = (id,token)=>{
    return API.TOKENGET('/api/v1/addresses/'+id,token);
}

export const modAddress = (id,params,token)=>{
    return API.TOKENPARAMSPUT('/api/v1/addresses/'+id,params,token);
}