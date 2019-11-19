import React,{Component} from 'react';
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';
import {Menu, Dropdown,Icon } from 'antd';
import '../css/Home.css'
import '../css/common.css'

export default class Home extends Component{
constructor(props){
	super(props)
}

render(){
	const menu1=(
		<Menu>
	    <Menu.Item>
	      <NavLink to="">帮助中心</NavLink>
	    </Menu.Item>
	    <Menu.Item>
	     <NavLink to="">售后服务</NavLink>
	    </Menu.Item>
	  </Menu>
	)
return(
	<div>
	<header>
		<div className="head-content">
			<span>您好, 欢迎来到</span>
			<NavLink to="/"> 地标商城 </NavLink>
			<NavLink to="/login">[登录]</NavLink>
			<NavLink to="/register">[注册]</NavLink>
			<ul>
				<li>
					<Icon type="mobile" />
					<NavLink to="https://www.dbmall.com/wap/">手机版</NavLink>
				</li>
				<li>/</li>
				<li>
					<NavLink to="">我的订单</NavLink>
				</li>	
				<li>/</li>
				<li>
					<NavLink to="">我的足迹</NavLink>
				</li>	
				<li>/</li>
				<li>
					<Dropdown overlay={menu1}>
					<NavLink to="">客户服务<Icon type="down"/></NavLink>
				  </Dropdown>
				</li>	
				<li>/</li>
				<li>
					<NavLink to="">关注我们<Icon type="down"/></NavLink>
					
				</li>	
			</ul>
		</div>
		<div className="logo">
			<div className="logo-content">
				<img src='../imgs/logo_01.png'/>
				<img src='../imgs/logo_02.png'/>
				<div className="search">
					<input placeholder="搜索商品"/>
					<a className="search-btn">搜索</a>
				</div>
				<NavLink className="mymall" to="">
				我的商城
				</NavLink>
				<NavLink className="mycart" to="">
				我的购物车
				</NavLink>
			</div>
		</div>
	</header>
	</div>
)
}
}