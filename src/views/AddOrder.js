import React, { Component } from 'react';
import '../css/reset.css'
import '../css/common.css'
import { Dropdown,Icon} from 'antd';
import cart from '../css/Cart.module.css'
import mymall from '../css/Mymall.module.css'
import addorder from '../css/AddOrder.module.css'
import { NavLink } from 'react-router-dom';
import * as API from "../api/user.js";

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            
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
							<span></span>
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
							<span>不需要发票</span>
					   </div>
                    </div>
                </div>
            </div>
        )
    }
}