import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu, Dropdown,Icon } from 'antd';
import { Carousel } from 'antd';
import { Anchor } from 'antd';
import home from '../css/Home.module.css'
import '../css/reset.css'
import '../css/common.css'
import * as api from "../api/products.js";

export default class Home extends Component{

constructor(props){
	super(props)
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
	}
}
componentDidMount(){
	this.setState({
      targetOffset: window.innerHeight / 2,
    });
	api.getProducts({per:5}).then((data)=>{
		this.setState({productslist:data.data.products})
	})
	api.getProducts({per:8,name:"优典"}).then((data)=>{
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
	window.addEventListener('scroll', this.handleScroll.bind(this))
	
}
componentWillUnmount() {
	//移除监听器，以防多个组件之间导致this的指向紊乱
    window.removeEventListener('scroll', this.handleScroll.bind(this)) 
}
handleScroll = e => {
	if(e.srcElement.scrollingElement.scrollTop>600){
		document.getElementsByClassName("ant-anchor")[0].style.display='block'
	}else{
		document.getElementsByClassName("ant-anchor")[0].style.display='none'
	}
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
			<span>您好, 欢迎来到</span>
			<NavLink to="/home"> 地标商城 </NavLink>
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
				<img src='../imgs/logo_01.png' alt=''/>
				<img src='../imgs/logo_02.png' alt=''/>
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
							<NavLink to="/detail">
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
				<h2 id="优典新品">优典新品</h2>
				<div>
					<div className={home.youdianitem}>
						{
							this.state.youdianlist.map((item,i)=>{
								return(
									<div key={i} className={home.yditem}>
										<NavLink to="/detail">
										<img src={item.coverImg} className={home.ydimg} alt=''/>
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
			<h2 id="开业花篮">开业花篮</h2>
			<div>
			<div className={home.floweritem}>
				{
					this.state.flowerlist.map((item,i)=>{
						return(
							<div key={i} className={home.fitem}>
								<NavLink to="/detail">
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
								<NavLink to="/detail">
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
								<NavLink to="/detail">
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
								<NavLink to="/detail">
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
								<NavLink to="/detail">
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
								<NavLink to="/detail">
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
		<Anchor id="anchor"  targetOffset={this.state.targetOffset}>
			<Link href="#回到顶部" title="回到顶部" />
			<Link href="#优典新品" title="优典新品" />
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