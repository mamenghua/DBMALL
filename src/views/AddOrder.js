import React, { Component } from 'react';
import '../css/reset.css'
import '../css/common.css'
import { Dropdown,Icon,Button} from 'antd';
import cart from '../css/Cart.module.css'
import mymall from '../css/Mymall.module.css'
import addorder from '../css/AddOrder.module.css'
import { NavLink } from 'react-router-dom';
import * as API from "../api/user.js";
import * as Api from "../api/products.js";
import * as api from "../api/address.js";
import * as apI from "../api/order.js";

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            receiver:'',
			regions:'',
			address:'',
			mobile:'',
			count:0,
			quantity:0,
			price:0,
			product:'',
			productlist:[],
			data:[]
        }

    }
    componentDidMount() {
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
			this.setState({receiver:data.data.addresses[0].receiver,regions:data.data.addresses[0].regions,address:data.data.addresses[0].address,mobile:data.data.addresses[0].mobile})
		})
		if(this.props.location.query.id){
			Api.getProductMsg(this.props.location.query.id).then((data)=>{
				let arr=[]
				arr.push(data.data)
				this.setState({data:arr,count:this.props.location.query.count,id:this.props.location.query.id})
				console.log(this.state.data)
			})
		}
		//提交订单
		
    }
	
	submit=()=>{
		console.log(1)
		let orderDetails=[]
		apI.submitOrder(
			localStorage.getItem('token'),
			{
				receiver:this.state.receiver,
				regions:this.state.regions,
				address:this.state.address,
				orderDetails:this.state.productlist
			}
		).then((data)=>{
			console.log(data)
		})
	}
	
    render() {
        return (
            <div>
                <header>
                    <div className={cart.head_content} id="回到顶部">
                        {
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
                        }
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
							<h3>收货人信息</h3>
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
									this.setState({quantity:this.state.count,price:item.price})
									// let obj={}
									// obj.quantity=this.state.count
									// obj.product=this.state.id
									// obj.price=item.price
									// let arr=[]
									// arr.push(obj)
									//this.setState({productlist:arr})
									return(
										<li key={i}>
											<img src={item.coverImg} alt=''/>
											<span className={addorder.name}>{item.name}</span>
											<span className={addorder.price}>{item.price}</span>
											<span className={addorder.num}>{this.state.count}</span>
											<span className={addorder.totalprice}>{item.price*this.state.count}</span>
										</li>
									)
								})
							}
							{
								this.state.data.map((item,i)=>{
									let totalPrice=0
									totalPrice+=item.price*this.state.count
									
									return(
										<h2 key={i}>实付金额:<span className={addorder.hot}>{totalPrice}</span>元</h2>
									)
								})
							}
							</ul>
							
					   </div>
					   <div className={addorder.button}>
					   <Button type="primary" onClick={()=>this.submit()}>提交订单</Button>
					   </div>
					   
                    </div>
                </div>
            </div>
        )
    }
}