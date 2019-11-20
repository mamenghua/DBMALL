import * as API from './index';
// 获得商品列表
export const getProducts=(params)=>{
	return API.GET('/api/v1/products',params);
}

// 获得商品详情
export const getProductMsg=(id)=>{
	return API.GET('/api/v1/products/'+id);
}