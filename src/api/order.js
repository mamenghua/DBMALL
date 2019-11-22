import * as API from './index';

export const getOrder = (params,token)=>{
    return API.TOKENGETORDER('/api/v1/orders',params,token);
}

export const delOrder = (id,token)=>{
    return API.TOKENDEL('/api/v1/orders/'+id,token);
}

export const searchOrder = (id,token)=>{
    return API.TOKENGET('/api/v1/orders/'+id,token);
}