import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu, Dropdown,Icon } from 'antd';
import { Carousel } from 'antd';
import { Anchor } from 'antd';
import home from '../css/Home.module.css'
import * as api from "../api/products.js";
import * as API from "../api/user.js";
import '../css/reset.css'
import '../css/common.css'
export default class Home extends Component{

constructor(props){
	super(props)
	this.onScroll = this.handleScroll.bind(this)
	this.state={
		productslist:[],
		youdianlist:[],
		flowerlist:[],
		dresslist:[],
		shipinlist:[],
		shoelist:[],
		mobilelist:[],
		booklist:[],
		targetOffset: undefined,
		token:localStorage.getItem("token"),
		user:[],
	}
}

componentDidMount(){
	this.setState({
      targetOffset: window.innerHeight / 2,
    });
	api.getProducts({per:5}).then((data)=>{
		this.setState({productslist:data.data.products})
	})
	api.getProducts({per:4,name:"商务活动小礼品"}).then((data)=>{
		this.setState({youdianlist:data.data.products})
	})
	api.getProducts({per:8,name:"开业花篮"}).then((data)=>{
		this.setState({flowerlist:data.data.products})
	})
	api.getProducts({per:8,name:"服装"}).then((data)=>{
		this.setState({dresslist:data.data.products})
	})
	api.getProducts({per:8,name:"饰品"}).then((data)=>{
		this.setState({shipinlist:data.data.products})
	})
	api.getProducts({per:8,name:"运动鞋"}).then((data)=>{
		this.setState({shoelist:data.data.products})
	})
	api.getProducts({per:8,name:"手机"}).then((data)=>{
		this.setState({mobilelist:data.data.products})
	})
	api.getProducts({per:8,name:"新九州"}).then((data)=>{
		this.setState({booklist:data.data.products})
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
handleScroll = e => {
	if(e.srcElement.scrollingElement.scrollTop>600){
		document.getElementsByClassName("ant-anchor")[0].style.display='block'
	}else{
		document.getElementsByClassName("ant-anchor")[0].style.display='none'
	}
}
componentWillUnmount() {
	//移除监听器，以防多个组件之间导致this的指向紊乱
    window.removeEventListener('scroll', this.onScroll) 
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
	const { Link } = Anchor;
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
				<img src='../imgs/logo_02.png' alt=''/>
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
		<div className={home.banner}>
		<Carousel autoplay effect="fade">
			<div>
			  <img src='../imgs/banner1.jpg' alt=''/>
			</div>
			<div>
			  <img src='../imgs/banner2.jpg' alt=''/>
			</div>
			<div>
			<img src='../imgs/banner3.jpg' alt=''/>
			</div>
			<div>
			<img src='../imgs/banner4.jpg' alt=''/>
			</div>
			<div>
			<img src='../imgs/banner5.jpg' alt=''/>
			</div>
			<div>
			<img src='../imgs/banner6.jpg' alt=''/>
			</div>
		  </Carousel>
		</div>
		
		<div className={home.jingxuan}>
		<div className={home.jingxuan_content}>
			<div className={home.timg}>
			<img src='../imgs/logo_03.png' alt=''/>
			</div>
			<div className={home.pditem}>
			{
				this.state.productslist.map((item,i)=>{
					return(
						<div key={i} className={home.jxit}>
							<NavLink to={'/detail/'+item._id}>
							<img src={item.coverImg} className={home.jxitem} alt=''/>
							<p>{item.name}</p>
							<p className={home.hot}>活动价:{item.price}¥</p>
							</NavLink>
						</div>
					)
				})
			}
			</div>
		</div>
		</div>
		
		<div className={home.products}>
		<div className={home.products_content}>
				<img src='../imgs/before.png' className={home.before} alt=''/>
				<h2 id="活动礼品">活动礼品</h2>
				<div>
					<div className={home.youdianitem}>
						{
							this.state.youdianlist.map((item,i)=>{
								return(
									<div key={i} className={home.yditem}>
										<NavLink to={'/detail/'+item._id}>
										<img src={item.coverImg} className={home.ydimg} alt=''/>
										<p>{item.name}</p>
										<span className={home.hot}>尝鲜价:{item.price}¥</span>
										</NavLink>
									</div>
								)
							})
						}
					</div>
				</div>
			
			
			
			<img src='../imgs/before.png' className={home.before} alt=''/>
			<h2 id="开业花篮">开业花篮</h2>
			<div>
			<div className={home.floweritem}>
				{
					this.state.flowerlist.map((item,i)=>{
						return(
							<div key={i} className={home.fitem}>
								<NavLink to={'/detail/'+item._id}>
								<img src={item.coverImg} className={home.fimg} alt=''/>
								<p>{item.name}</p>
								<p>{item.descriptions}<span className={home.hot}>尝鲜价:{item.price}¥</span></p>
								
								</NavLink>
							</div>
						)
					})
				}
			</div>
			</div>
			
			<img src='../imgs/before.png' className={home.before} alt=''/>
			<h2 id="精品服饰">精品服饰</h2>
			<div>
			<div className={home.floweritem}>
				{
					this.state.dresslist.map((item,i)=>{
						return(
							<div key={i} className={home.fitem}>
								<NavLink to={'/detail/'+item._id}>
								<img src={item.coverImg} className={home.fimg} alt=''/>
								<p>{item.descriptions}</p>
								<span className={home.hot}>抢购价:{item.price}¥</span>
								</NavLink>
							</div>
						)
					})
				}
			</div>
			</div>
			
			<img src='../imgs/before.png' className={home.before} alt=''/>
			<h2 id="正品专柜">正品专柜</h2>
			<div>
			<div className={home.floweritem}>
				{
					this.state.shipinlist.map((item,i)=>{
						return(
							<div key={i} className={home.fitem}>
								<NavLink to={'/detail/'+item._id}>
								<img src={item.coverImg} className={home.fimg} alt=''/>
								<p>{item.name}</p>
								<p>{item.descriptions}<span className={home.hot}>抢购价:{item.price}¥</span></p>
								</NavLink>
							</div>
						)
					})
				}
			</div>
			</div>
			
			<img src='../imgs/before.png' className={home.before} alt=''/>
			<h2 id="运动鞋">运动鞋</h2>
			<div>
			<div className={home.floweritem}>
				{
					this.state.shoelist.map((item,i)=>{
						return(
							<div key={i} className={home.fitem}>
								<NavLink to={'/detail/'+item._id}>
								<img src={item.coverImg} className={home.fimg} alt=''/>
								<p>{item.name}</p>
								<p>{item.descriptions}<span className={home.hot}>抢购价:{item.price}¥</span></p>
								</NavLink>
							</div>
						)
					})
				}
			</div>
			</div>
			
			<img src='../imgs/before.png' className={home.before} alt=''/>
			<h2 id="正品手机">正品手机</h2>
			<div>
			<div className={home.floweritem}>
				{
					this.state.mobilelist.map((item,i)=>{
						return(
							<div key={i} className={home.fitem}>
								<NavLink to={'/detail/'+item._id}>
								<img src={item.coverImg} className={home.fimg} alt=''/>
								<p>{item.name}<span className={home.hot}>抢购价:{item.price}¥</span></p>
								</NavLink>
							</div>
						)
					})
				}
			</div>
			</div>
			
			<img src='../imgs/before.png' className={home.before} alt=''/>
			<h2 id="休闲小说">休闲小说</h2>
			<div>
			<div className={home.floweritem}>
				{
					this.state.booklist.map((item,i)=>{
						return(
							<div key={i} className={home.bitem}>
								<NavLink to={'/detail/'+item._id}>
								<img src={item.coverImg} className={home.bimg} alt=''/>
								<p>{item.descriptions}</p>
								<span className={home.hot}>抢购价:{item.price}¥</span>
								</NavLink>
							</div>
						)
					})
				}
			</div>
			</div>
			
		</div>
		</div>
		
		<Anchor id="anchor"  targetOffset={this.state.targetOffset}>
			<Link href="#回到顶部" title="回到顶部" />
			<Link href="#活动礼品" title="活动礼品" />
			<Link href="#开业花篮" title="开业花篮" />
			<Link href="#精品服饰" title="精品服饰" />
			<Link href="#正品专柜" title="正品专柜" />
			<Link href="#运动鞋" title="运动鞋" />
			<Link href="#正品手机" title="正品手机" />
			<Link href="#休闲小说" title="休闲小说" />
		</Anchor>
		
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