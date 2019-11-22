import React, { Component } from 'react';
import '../css/reset.css'
import '../css/common.css'
import { Dropdown,Icon,Button,message,Modal,Table,Divider, Tag} from 'antd';
import cart from '../css/Cart.module.css'
import mymall from '../css/Mymall.module.css'
import addorder from '../css/AddOrder.module.css'
import { NavLink } from 'react-router-dom';
import * as API from "../api/user.js";
import * as Api from "../api/products.js";
import * as api from "../api/address.js";
import * as apI from "../api/order.js";
const columns = [
	{
	  title: '收货人',
	  dataIndex: 'receiver',
	  key: 'receiver',
	},
	{
	  title: '省市区',
	  dataIndex: 'regions',
	  key: 'regions',
	},
	{
	  title: '详细地址',
	  dataIndex: 'address',
	  key: 'address',
	},
	{
	  title: '手机号',
	  key: 'mobile',
	  dataIndex: 'mobile',
	},
  ];
  
  
export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            receiver:'',
			regions:'',
			address:'',
			mobile:'',
			data:[],
			totalprice:0,
			visible: false,
			addresslist:[]
        }

	}
	
	
    componentDidMount() {
		let totalPrice=0;
		this.props.location.query.list.map((item,i)=>{
			totalPrice+=item.price*item.quantity
		})
		this.setState({
			data:this.props.location.query.list,
			totalprice:totalPrice
		})
        // 用户名
        if (localStorage.getItem('token')) {
            document.getElementsByClassName('user')[0].style.display = 'none';
            document.getElementsByClassName('user')[1].style.display = 'block';
        } else {
            document.getElementsByClassName('user')[0].style.display = 'block';
            document.getElementsByClassName('user')[1].style.display = 'none';
        }
        // 判断用户信息
        API.usermsg(localStorage.getItem("token")).then((data)=>{
            this.setState({user:data.data.userName})
        }).catch((data)=>{
            this.setState({user:' 您暂未登录 '})
        })
		
		//获取收货人信息
		api.getAddress({},localStorage.getItem('token')).then((data)=>{
			data.data.addresses.map((item,i)=>{
				if(item.isDefault===true){
					this.setState({
						receiver:item.receiver,
						regions:item.regions,
						address:item.address,
						mobile:item.mobile});
				}
			});
			
		})

		// 获取该用户的所有收货人
		api.getAddress({}, localStorage.getItem('token')).then((data) => {
			
			let arrlist = data.data.addresses;
            let list = [];
            arrlist.map((item, i) => {
                let obj = {};
                obj.key = i;
                obj.receiver = item.receiver;
                obj.regions = item.regions;
                obj.address = item.address;
                obj.mobile = item.mobile;
                list.push(obj);
            })
            this.setState({ addresslist: list });
           
            })
		
		
    }
	//提交订单
	submit=()=>{
		let productlist = [];
		this.state.data.map((item)=>{
			let obj = {};
			obj.quantity = item.quantity;
			obj.product = item.product;
			obj.price = item.price;
			productlist.push(obj)
		})
		apI.submitOrder(
			{
				receiver:this.state.receiver,
				regions:this.state.regions,
				address:this.state.address,
				orderDetails:productlist
			},localStorage.getItem('token')
		).then((data)=>{
			message.success('提交订单成功');
		})
	}
	// 弹出层
	showModal = () => {
        this.setState({
            visible: true,
        });
	};
	// 新增
    handleOk = e => {
        this.setState({
			visible: false
		});
    };

	handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    render() {
		const rowSelection = {
			type:'radio',
			onChange: (selectedRowKeys, selectedRows) => {
			//   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
			  this.setState({
				receiver : selectedRows[0].receiver,
				regions : selectedRows[0].regions,
				address : selectedRows[0].address,
				mobile : selectedRows[0].mobile
			  })
			  
			},
			getCheckboxProps: record => ({
			  disabled: record.name === 'Disabled User', // Column configuration not to be checked
			  name: record.name,
			}),
		  };
        return (
            <div>
                <header>
                    <div className={cart.head_content} id="回到顶部">
                            <div>
                                <div className="user">
                                    <span>您好,
						<span>{this.state.user}</span>
                                        欢迎来到</span>
                                    <NavLink to="/home"> 地标商城 </NavLink>
                                    <NavLink to="/login">[登录]</NavLink>
                                    <NavLink to="/register">[注册]</NavLink>
                                </div>
                                <div className="user">
                                    <span>您好,
						<span>{this.state.user}</span>
                                        欢迎来到</span>
                                    <NavLink to="/home"> 地标商城 </NavLink>
                                    <NavLink to="/home" onClick={() => { localStorage.removeItem('token'); window.location.reload() }}>[注销]</NavLink>
                                </div>
                            </div>
                        <ul>
                            <li>
                                <Icon type="mobile" />
                                <NavLink to="https://www.dbmall.com/wap/">手机版</NavLink>
                            </li>
                            <li>/</li>
                            <li>
                                <NavLink to="/mymall">我的订单</NavLink>
                            </li>
                            <li>/</li>
                            <li>
                                <NavLink to="">我的足迹</NavLink>
                            </li>
                            <li>/</li>
                            <li>
                                <NavLink to="">关注我们<Icon type="caret-down" /></NavLink>

                            </li>
                        </ul>
                    </div>
                    <div className={cart.logo}>
                        <div className={cart.logo_content}>
                            <img src='../imgs/logo_01.png' alt='' />
                            <img src='../imgs/logo_02.png' alt='' />
							<NavLink className={mymall.mycart} to="/cart">
							我的购物车
							</NavLink>
							<NavLink className={mymall.mymall} to="/mymall">
							我的商城
							</NavLink>
                        </div>
                    </div>

                </header>
                <div className={cart.container}>
                    <div className={addorder.contain}>
                       <h1>填写核对购物信息</h1>
					   <p>请仔细核对填写收货、发票等信息，以确保物流快递及时准确投递。</p>
					   <br/>
					   <div className={addorder.info}>
							<h3>
								收货人信息
							</h3>
							<Button type="primary" onClick={this.showModal}>更改收货人</Button>
							<span><strong>{this.state.receiver}</strong> &nbsp;{this.state.regions}{this.state.address}  &nbsp;<Icon type="mobile" />{this.state.mobile}</span>
					   </div>
					   <div className={addorder.info}>
							<h3>支付方式</h3>
							<span>在线支付</span>
					   </div>
					   <div className={addorder.info}>
							<h3>发票信息</h3>
							<span>不需要发票</span>
					   </div>
					   <div className={addorder.info}>
							<h3>商品清单</h3>
							<ul>
							<li>
								<span className={addorder.good}>商品</span>
								<span className={addorder.price}>单价</span>
								<span className={addorder.num}>数量</span>
								<span className={addorder.totalprice}>小计(元)</span>
							</li>
							{
								this.state.data.map((item,i)=>{
									return(
										<li key={i}>
											<img src={item.coverImg} alt=''/>
											<span className={addorder.name}>{item.name}</span>
											<span className={addorder.price}>{item.price}</span>
											<span className={addorder.num}>{item.quantity}</span>
											<span className={addorder.totalprice}>{item.price*item.quantity}</span>
										</li>
									)
								})
							}
							<h2>实付金额:<span className={addorder.hot}>{this.state.totalprice}</span>元</h2>
							</ul>
							
					   </div>
					   <div className={addorder.button}>
					   <Button type="primary" onClick={()=>this.submit()}>提交订单</Button>
					   </div>
					   
                    </div>
                </div>
				<Modal
                    title="更改收货人"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
					<Table className="tab" rowSelection={rowSelection} columns={columns} dataSource={this.state.addresslist} pagination={{ hideOnSinglePage: true }} />
                </Modal>
            </div>
        )
    }
}