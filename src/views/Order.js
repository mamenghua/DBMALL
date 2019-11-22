import React, { Component } from 'react';
import order from '../css/Order.module.css'
import { Icon,Table,message,Modal,Input } from 'antd';
import * as api from "../api/order.js";
const { confirm } = Modal;
const { Search } = Input;
export default class Order extends Component {
	constructor(props){
		super(props)
		this.state={
			orderlist:[],
			total:10,
			current:1,
		}
	}
	componentDidMount(){
		api.getOrder({per:10,page:this.state.current},localStorage.getItem('token')).then((data)=>{
			let newArr = data.data.orders.map((item,index) =>{
				return Object.assign(item,{key:index})
			 })
			this.setState({orderlist:newArr})
			this.setState({total:data.data.totalCount})
		})
	}
	
	showConfirm = (data) => {
	    let _this = this;
	    confirm({
	        title: '你确定要删除这个订单吗',
			okText:'确定',
			cancelText:'我再想想',
	        onOk() {
	            _this.del(data);
	        },
	        onCancel() { },
	    });
	}
	
	del(data){
		api.delOrder(data._id,localStorage.getItem('token')).then((data)=>{
			message.success('删除订单成功！');
			api.getOrder({per:10,page:1},localStorage.getItem('token')).then((data)=>{
				let newArr = data.data.orders.map((item,index) =>{
					return Object.assign(item,{key:index})
				 })
				this.setState({orderlist:newArr})
			})
		})
	}
	
	changePage=(page)=>{
		this.setState({current:page})
		api.getOrder({per:10,page:page},localStorage.getItem('token')).then((data)=>{
			let newArr = data.data.orders.map((item,index) =>{
				return Object.assign(item,{key:index})
			 })
			this.setState({orderlist:newArr})
		})
	}
	
	search=(value)=>{
		api.searchOrder(value,localStorage.getItem('token')).then((data)=>{
			let arr=[]
			let obj = Object.assign(data.data.order,{key:0});
			arr.push(obj)
			this.setState({orderlist:arr})
		})
	}
	
    render() {
		const columns = [
			{
				title: '  ',
				dataIndex: 'key',
			},
			{
				title: '订单id',
				dataIndex: '_id',
			},
		  {
			title: '收货人',
			dataIndex: 'receiver',
			render: text => <a>{text}</a>,
		  },
		  {
			title: '价格',
			dataIndex: 'price',
		  },
		  {
			title: '地址',
			dataIndex:'address',
		  },
		  {
			title: '订单状态',
			dataIndex: 'isPayed',
			render: (text, record, index) => {
				let str='未支付'
				if(text===true){
					str='已支付'
				}
			    return (
			        <a>{str}</a>
			    )
			}
		  },
		  {
			title: '操作',
			dataIndex: 'del',
			render: (text, record, index) => {
			    return (
			        <Icon type="delete" theme="twoTone" onClick={() => this.showConfirm(record)} />
			    )
			}
		  },
		];
		
	

		
        return (
            <div className={order.section}>
            	<p>
					<Icon type="bank" /> 首页<Icon type="right" />我的商城<Icon type="right" />我的订单
            	</p>
				<Search id='ipt' style={{width:'300px',margin:'0 0 20px 20px'}} placeholder="输入订单id查找" onSearch={(value)=>this.search(value)} enterButton />
				<div className={order.list}>
					<Table columns={columns} dataSource={this.state.orderlist} pagination={{  // 分页
					 current: this.state.current,
					 total: this.state.total,
					 onChange: this.changePage,
					 hideOnSinglePage:true
				   }}/>
				</div>
            </div>
        )
    }
}