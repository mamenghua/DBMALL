import * as API from './index';
// 获得商品列表
export const getProducts=(params)=>{
	return API.GET('/api/v1/products',params);
}