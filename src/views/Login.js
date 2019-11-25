import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import login from '../css/Login.module.css';
import '../css/reset.css'
import '../css/common.css'

import * as api from '../api/user';

import { message } from 'antd';
// 防抖方法
function debounce(fn,ms = 500){
	let timeoutId
	return function(){
		clearTimeout(timeoutId);
		timeoutId = setTimeout(()=>{
			fn.apply(this,arguments);
		},ms)
	}
}
export default class Login extends Component {
	constructor(props) {
		super(props);
		// 调用设定好的防抖方法
		this.login = debounce(this.login);
	}
	login(){
		let userName = this.refs.userName.value;
		let password = this.refs.password.value;
		api.login({
			userName:userName,password:password
		}).then((data)=>{
			if(data.data.code === "success"){
				localStorage.setItem('token',data.data.token);
				this.props.history.push('/loginsuccess');
			}else{
				message.error('用户名或密码错误，请重新输入！');
			}
		})
	}
	
	render() {
		return (
			<div>
				<div className={"content "+login.login_top}>
					<div className={login.loginl_logo}>
						<img src='../image/login_logo.svg' alt=''/>
						<img src='../image/logo_02.png' alt=''/>
					</div>
					<div className={login.loginr_logo}>
						<img src='../image/login_right.png' alt=''/>
					</div>
				</div>

				<div className={login.login_container}>
					<div className={login.login_box}>
						<h2>用户名密码登录</h2>
						<div className={login.input_box}>
							<input type="text" placeholder="请输入用户名" ref="userName"/>
						</div>
						<div className={login.input_box}>
							<input type="text" placeholder="请输入密码" ref="password"/>
						</div>
						<button className={login.login_btn} onClick={()=>this.login()}>
							登录
						</button>
						<NavLink to="/register"> 暂无账号，前去注册 </NavLink>
					</div>
				</div>
			</div>
		)
	}
}