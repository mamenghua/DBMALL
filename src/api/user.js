import * as API from './index';

export const login = (params)=>{
    return API.POST('/api/v1/auth/login',params);
}