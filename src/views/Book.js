import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu, Dropdown,Icon,Carousel,Pagination } from 'antd';
import * as api from "../api/products.js";
import * as API from "../api/user.js";
import '../css/reset.css'
import '../css/common.css'
import home from '../css/Home.module.css'
export default class Book extends Component{

constructor(props){
	super(props)
	this.state={
		booklist:[],
		book2list:[],
		targetOffset: undefined,
		token:localStorage.getItem("token"),
		user:[],
		total:0,
		current:1,
		classify:'科幻时空'
	}
}
onChange = page => {
    this.setState({
      current: page,
    });
	api.getProducts({per:8,page:page,name:this.state.classify}).then((data)=>{
		this.setState({booklist:data.data.products})
		this.setState({total:data.data.totalCount})
	})
  };


componentDidMount(){
	api.getProducts({per:8,page:this.state.current,name:this.state.classify}).then((data)=>{
		this.setState({booklist:data.data.products})
		this.setState({total:data.data.totalCount})
	})
	
	API.usermsg(localStorage.getItem("token")).then((data)=>{
		this.setState({user:data.data.userName})
	}).catch((data)=>{
		this.setState({user:' 您暂未登录 '})
	})
	window.addEventListener('scroll', this.onScroll)
	
	if(localStorage.getItem('token')){
		document.getElementsByClassName('user')[0].style.display = 'none';
		document.getElementsByClassName('user')[1].style.display = 'block';
	}else{
		document.getElementsByClassName('user')[0].style.display = 'block';
		document.getElementsByClassName('user')[1].style.display = 'none';
	}
}
onClick=()=>{
	let value=document.getElementsByClassName('ipt')[0].value
	this.props.history.push('/search',value)
}
checkout(e,index){
	this.setState({
	  classify: e,
	  current:1
	});
	api.getProducts({per:8,page:1,name:e}).then((data)=>{
		this.setState({classify: e,booklist:data.data.products,total:data.data.totalCount})
		// this.setState({total:data.data.totalCount})
		for(let i = 0;i<document.getElementsByClassName('dianji').length;i++){
			document.getElementsByClassName('dianji')[i].classList.remove("active");
		}
		document.getElementsByClassName('dianji')[index-1].classList.add("active");
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
				<img src='../imgs/logo_01.png' alt=''/>
				<span>网络文学</span>
				<div className={home.search}>
					<input placeholder="搜索商品" className='ipt'/>
					<a className={home.search_btn} onClick={this.onClick}>搜索</a>
				</div>
				<NavLink className={home.mycart} to="/mymall">
				我的购物车
				</NavLink>
				<NavLink className={home.mymall} to="/cart">
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
						<NavLink to="/home">首页</NavLink>
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
		<div className={home.banner}>
		<Carousel autoplay effect="fade">
			<div>
			  <img src='../imgs/banner9.jpg' alt=''/>
			</div>
			<div>
			  <img src='../imgs/banner2.jpg' alt=''/>
			</div>
			<div>
			  <img src='../imgs/banner8.jpg' alt=''/>
			</div>
		  </Carousel>
		</div>
		
		<div className='btnbox'>
			<span className='active dianji' onClick={()=>this.checkout("科幻时空",1)}>科幻时空</span>
			<span className='dianji' onClick={()=>this.checkout("都市逸闻",2)}>都市逸闻</span>
			<span className='dianji' onClick={()=>this.checkout("游戏异界",3)}>游戏异界</span>
			<span className='dianji' onClick={()=>this.checkout("新九州",4)}>新九州</span>
		</div>
		
		<div className="products">
		<div className="products_content">
			
			<div>
			<div className={home.floweritem}>
				{
					this.state.booklist.map((item,i)=>{
						return(
							<div key={i} className={home.bitem}>
								<NavLink to={'/detail/'+item._id}>
								<img src={item.coverImg} className={home.bimg} alt=''/>
								<p>{item.descriptions}<span className={home.hot}>抢购价:{item.price}¥</span></p>
								
								</NavLink>
							</div>
						)
					})
				}
				
			</div>
			</div>
			<Pagination current={this.state.current} onChange={this.onChange} total={this.state.total}/>
		</div>
		</div>
		
		<div className={home.fixed}>
		<div className={home.phone}>
		</div>
		<div className={home.wx}>
		</div>
		</div>
	
	</div>
)
}
}