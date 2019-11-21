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
		pruducts:[],
		targetOffset: undefined,
		token:localStorage.getItem("token"),
		user:[],
		total:0,
		current:1,
		flag:1
	}
}
onChange = page => {
    this.setState({
      current: page,
    });
	api.getProducts({per:8,page:page,name:this.props.location.state}).then((data)=>{
		this.setState({pruducts:data.data.products})
		this.setState({total:data.data.totalCount})
	})
  };


componentDidMount(){
	api.getProducts({per:8,page:this.state.current,name:this.props.location.state}).then((data)=>{
		this.setState({pruducts:data.data.products})
		this.setState({total:data.data.totalCount})
		this.setState({flag:data.data.products.length})
		if(data.data.products.length==0){
			document.getElementsByClassName('prod')[0].style.display = 'none';
			document.getElementsByClassName('prod')[1].style.display = 'block';
		}else{
			document.getElementsByClassName('prod')[0].style.display = 'block';
			document.getElementsByClassName('prod')[1].style.display = 'none';
		}
	}).catch((data)=>{
		console.log(data)
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
		window.location.reload()
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
				<img src='../imgs/logo_01.png' alt=''/>
				<img src='../imgs/logo_02.png' alt=''/>
				<div className={home.search}>
					<input placeholder="搜索商品" className='ipt'/>
					<a className={home.search_btn} onClick={this.onClick}>搜索</a>
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
			<span className='active dianji'>{this.props.location.state}</span>
		</div>
		
		<div className="products">
		<div className="products_content">
			
			<div>
			<div className={home.floweritem}>
			<div className='prod'>
				{
					this.state.pruducts.map((item,i)=>{
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
			<div className='prod'>
				<div className='prod_img'>
				<img src='../imgs/none.png' alt='' className='none'/>
				</div>
			</div>
				
			</div>
			</div>
			<Pagination current={this.state.current} onChange={this.onChange} total={this.state.total}/>
		</div>
		</div>
			
			
			
		
		<footer>
			<div className={home.foot}>
				<div className={home.foot_top}>
					<img src='../imgs/foot_top.png' alt=''/>
				</div>
				<div className={home.foot_nav}>
					<NavLink to="">首页</NavLink> /
					<NavLink to="">网站地图</NavLink> /
					<NavLink to="">招聘英才</NavLink> /
					<NavLink to="">联系我们</NavLink> /
					<NavLink to="">关于我们</NavLink>
				</div>
				<div className={home.foot_img}>
					<NavLink to=""><img src='../imgs/public_infomation.png' alt=''/></NavLink>
					<NavLink to=""><img src='../imgs/online_110.png' alt=''/></NavLink>
					<NavLink to=""><img src='../imgs/alipay_logo.png' alt=''/></NavLink>
					<NavLink to=""><img src='../imgs/wxpay_logo.png' alt=''/></NavLink>
					<NavLink to=""><img src='../imgs/dbmall_118.jpg' alt=''/></NavLink>
					<NavLink to=""><img src='../imgs/gswj.png' alt=''/></NavLink>
				</div>
				<p>Copyright&copy;2019 dbmall.com, All Rights Reserved粤ICP备15109472号深公网安备4403300900603</p>
				<p>食品流通许可证SP4403052015027332使用本网站即表示接受地标商城用户协议。版权所有深圳华夏地标电子商务有限公司</p>
			</div>
		</footer>
		
		
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