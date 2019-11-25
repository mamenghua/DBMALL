import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu, Dropdown,Icon,InputNumber,Modal} from 'antd';
import * as api from "../api/products.js";
import * as API from "../api/user.js";
import * as Api from "../api/cart.js";
import '../css/reset.css'
import '../css/common.css'
import home from '../css/Home.module.css'

export default class Detail extends Component{
constructor(props){
	super(props)
	this.state={
		token:localStorage.getItem("token"),
		user:[],
		id:'',
		location:'',
		img:'',
		descriptions:'',
		price:'',
		created:'',
		count:1,
		totalprice:0,
		loading: false,
		visible: false,
	}
}
componentDidMount(){
	document.body.scrollTop = document.documentElement.scrollTop = 0
	API.usermsg(localStorage.getItem("token")).then((data)=>{
		this.setState({user:data.data.userName})
	}).catch((data)=>{
		this.setState({user:' 您暂未登录 '})
	})
	if(localStorage.getItem('token')){
		document.getElementsByClassName('user')[0].style.display = 'none';
		document.getElementsByClassName('user')[1].style.display = 'block';
	}else{
		document.getElementsByClassName('user')[0].style.display = 'block';
		document.getElementsByClassName('user')[1].style.display = 'none';
	}
	api.getProductMsg(this.props.match.params.id).then((data)=>{
		this.setState({location:data.data.name,img:data.data.coverImg,descriptions:data.data.descriptions,price:data.data.price,created:data.data.createdAt,totalprice:data.data.price,id:data.data._id})
	})
}
onChange=(value)=>{
	let totalprice=value*this.state.price
	totalprice=totalprice.toFixed(1)
	this.setState({count:value,totalprice:totalprice})
}
addCart=()=>{
	Api.addCart({product:this.props.match.params.id,quantity:this.state.count},localStorage.getItem('token')).then((data)=>{
		Modal.success({
			title: '成功加入'+this.state.count+'件进入购物车',
		  });
	}).catch((data)=>{
		Modal.error({
			title: '加入购物车失败，请重试',
		  });
	})
}
onClick=()=>{
	let value=document.getElementsByClassName('ipt')[0].value
	this.props.history.push('/search',value)
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
		<div className={home.head_content} id="回到顶部">
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
					<NavLink to="/home" onClick={()=>{localStorage.removeItem('token');window.location.reload()}}>[注销]</NavLink>
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
				<img src='../image/logo_01.png' alt=''/>
				<img src='../image/logo_02.png' alt=''/>
				<div className={home.search}>
					<input placeholder="搜索商品" className='ipt'/>
					<a className={home.search_btn} onClick={this.onClick}>搜索</a>
				</div>
				<NavLink className={home.mycart} to="/cart">
				我的购物车
				</NavLink>
				<NavLink className={home.mymall} to="/mymall">
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
						<NavLink to="/book">网络文学</NavLink>
					</li>
					<li>
						<NavLink to="/phone">手机专卖</NavLink>
					</li>
					<li>
						<NavLink to="/flower">往后余生</NavLink>
					</li>
					<li>
						<NavLink to="/eat">吃货专区</NavLink>
					</li>
					<li>
						<NavLink to="/dress">运动服饰</NavLink>
					</li>
					<li>
						<NavLink to="/jewelry">名表饰品</NavLink>
					</li>
				</ul>
			</div>
		</div>
	</header>
	
	<div className="products">
	<div className="products_content">
		<div className='btnbox'>
			<span><Icon type="environment" />首页<Icon type="right" />{this.state.location}</span>
		</div>
		<div className="imgbox">
			<img src={this.state.img} alt=''/>
		</div>
		<div className="detailbox">
			<h2>{this.state.location}</h2>
			<p>{this.state.descriptions}</p>
			<div className='detail'>
				<span>
					售价 <span> &nbsp;¥{this.state.price}</span>
				</span>
				<span>
					<p>上架时间: <span> {this.state.created}</span></p>
					<p>运费: <span> 免运费</span></p>
				</span>
			</div>
			<div className='num'>
			 数量:  <InputNumber min={1}  defaultValue={1} onChange={this.onChange} />
			 <span className='totalpricebox'>总价:  <span className='totalprice'>¥{this.state.totalprice}</span></span>
			</div>
			<NavLink to={{pathname:'/addorder',query:{list:[
				{
					product : this.state.id,
					name : this.state.location,
					coverImg : this.state.img,
					quantity : this.state.count,
					price : this.state.totalprice
				}
			]}}} className='buy'>立即购买</NavLink>
			<a className='addcart' onClick={this.addCart}>加入购物车</a>
		</div>
	</div>
	</div>
	
	</div>
)
}
}