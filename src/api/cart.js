import * as API from './index';

export const addCart = (params,token)=>{
    return API.TOKENPOST('/api/v1/shop_carts',params,token);
}
