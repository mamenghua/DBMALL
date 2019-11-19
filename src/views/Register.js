import React, { Component } from 'react';

import login from '../css/Login.module.css';
import '../css/reset.css'
import '../css/common.css'

export default class Register extends Component {
	constructor(props){
		super(props)
	}
	register(){
		console.log('注册新用户');
	}
	render() {
		return (
			<div>
				<div className={"content "+login.login_top}>
					<div className={login.loginl_logo}>
						<img src='../imgs/login_logo.svg' alt='' />
						<img src='../imgs/logo_02.png' alt='' />
					</div>
					<div className={login.loginr_logo}>
						<img src='../imgs/login_right.png' alt=''/>
					</div>
				</div>

				<div className={login.login_container}>
					<div className={login.login_box}>
						<h2>新用户注册</h2>
						<div className={login.input_box}>
							<input type="text" placeholder="请输入用户名" ref="userName"/>
						</div>
						<div className={login.input_box}>
							<input type="text" placeholder="请输入密码" ref="password"/>
						</div>
						<button className={login.login_btn} onClick={()=>this.register()}>
							注册
						</button>
					</div>
				</div>
			</div>
		)
	}
}