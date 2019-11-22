import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import '../css/reset.css'
import '../css/common.css'
import cart from '../css/Cart.module.css'
import mymall from '../css/Mymall.module.css'
import home from '../css/Home.module.css'
import order from '../css/Order.module.css'
import Order from './Order'
import Address from './Address'
import { NavLink } from 'react-router-dom';
import { Button, Icon, Modal } from 'antd';
import * as api from '../api/cart';
import * as API from "../api/user.js";
const { confirm } = Modal;

export default class Mymall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
        }

    }
   
    
   
    

    componentDidMount() {
        
        // 判断用户信息
        API.usermsg(localStorage.getItem("token")).then((data)=>{
			this.setState({user:data.data.userName})
		}).catch((data)=>{
			this.setState({user:' 您暂未登录 '})
		})
		// 用户名
        if (localStorage.getItem('token')) {
            document.getElementsByClassName('user')[0].style.display = 'none';
            document.getElementsByClassName('user')[1].style.display = 'block';
        } else {
            document.getElementsByClassName('user')[0].style.display = 'block';
            document.getElementsByClassName('user')[1].style.display = 'none';
        }
		
		
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
                                <NavLink to="/order">我的订单</NavLink>
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
                <Router>
                <div className={cart.container}>
                    <div className="content">
                        <div className={mymall.sidebarbox}>
							<div className={mymall.sidebartop}>
								<p>我的商城</p>
							</div>
                            <ul>
								<li>
									<span>· 交易管理<Icon type="caret-up" /></span>
									<ul>
										<li><NavLink to="/order">我的订单</NavLink></li>
										<li><NavLink to="/cart">购物车</NavLink></li>
									</ul>
								</li>
								<li>
									<span>· 资料管理<Icon type="caret-up" /></span>
									<ul>
										<li>代言人中心</li>
										<li>账户信息</li>
										<li>账户安全</li>
										<li><NavLink to="/address">收货地址</NavLink></li>
										<li>我的消息</li>
										<li>我的积分</li>
										<li>我的卡包</li>
									</ul>
								</li>
								<li>
									<span>· 客户服务<Icon type="caret-up" /></span>
									<ul>
										<li>退款及退货</li>
										<li>帮助中心</li>
										<li>售后服务</li>
									</ul>
								</li>
                            </ul>
                        </div>
						
						
							<div>
                                <Switch>
                                    <Route path="/order" component={Order}></Route>
                                    <Route path="/address" component={Address}></Route>
								    <Redirect to="/order"/>
                                </Switch>
							</div>
						
                    </div>
                </div>
                </Router>

            </div>
        )
    }
}