import * as API from './index';

export const addCart = (params,token)=>{
    return API.TOKENPOST('/api/v1/shop_carts',params,token);
}

export const getCarts = (token)=>{
    return API.TOKENGET('/api/v1/shop_carts',token);
}

export const delCart = (id,token)=>{
    return API.TOKENDEL('/api/v1/shop_carts/'+id,token);
}
