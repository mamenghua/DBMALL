import React,{Component} from 'react';
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';
import {Menu, Dropdown,Icon } from 'antd';
import { Carousel } from 'antd';
import home from '../css/Home.module.css'
import '../css/reset.css'
import * as api from "../api/products.js";
export default class Home extends Component{
constructor(props){
	super(props)
	this.state={
		productslist:[]
	}
}
componentDidMount(){
	api.getProducts({per:5}).then((data)=>{
		console.log(data.data.products)
		this.setState({productslist:data.data.products})
	})
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
		<div className={home.head_content}>
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
					<NavLink to="">客户服务<Icon type="caret-down" /></NavLink>
				  </Dropdown>
				</li>	
				<li>/</li>
				<li>
					<NavLink to="">关注我们<Icon type="caret-down" /></NavLink>
					
				</li>	
			</ul>
		</div>
		<div className={home.logo}>
			<div className={home.logo_content}>
				<img src='../imgs/logo_01.png'/>
				<img src='../imgs/logo_02.png'/>
				<div className={home.search}>
					<input placeholder="搜索商品"/>
					<a className={home.search_btn}>搜索</a>
				</div>
				<NavLink className={home.mycart} to="">
				我的购物车
				</NavLink>
				<NavLink className={home.mymall} to="">
				我的商城
				</NavLink>
				
			</div>
		</div>
		<div className={home.menu}>
			<div className={home.menu_content}>
				<ul>
					<li>
						<NavLink to="">全部地标展馆<Icon type="caret-down" /></NavLink>
					</li>
					<li>
						<NavLink to="">地标珍品</NavLink>
					</li>
					<li>
						<NavLink to="">粮油副食</NavLink>
					</li>
					<li>
						<NavLink to="">酒水茶饮</NavLink>
					</li>
					<li>
						<NavLink to="">山珍海味</NavLink>
					</li>
					<li>
						<NavLink to="">生鲜果蔬</NavLink>
					</li>
					<li>
						<NavLink to="">休闲零食</NavLink>
					</li>
				</ul>
			</div>
		</div>
		<div className={home.banner}>
		<Carousel autoplay effect="fade">
			<div>
			  <img src='../imgs/banner1.jpg'/>
			</div>
			<div>
			  <img src='../imgs/banner2.jpg'/>
			</div>
			<div>
			<img src='../imgs/banner3.jpg'/>
			</div>
			<div>
			<img src='../imgs/banner4.jpg'/>
			</div>
			<div>
			<img src='../imgs/banner5.jpg'/>
			</div>
			<div>
			<img src='../imgs/banner6.jpg'/>
			</div>
		  </Carousel>
		</div>
		
		<div className={home.jingxuan}>
		<div className={home.jingxuan_content}>
			<div className={home.timg}>
			<img src='../imgs/logo_03.png'/>
			</div>
			<div className={home.pditem}>
			{
				this.state.productslist.map((item,i)=>{
					return(
						<div key={i}>
							<NavLink to="detail"><img src={item.coverImg} className={home.jxitem}/></NavLink>
						</div>
					)
				})
			}
			</div>
		</div>
		</div>
	</header>
	</div>
)
}
}