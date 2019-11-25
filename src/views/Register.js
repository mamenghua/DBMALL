import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import login from '../css/Login.module.css';
import '../css/reset.css'
import '../css/common.css'

import { Upload, Icon, message } from 'antd';

import * as api from '../api/user';

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

// 上传之前，文件判断，是否可以上传
function beforeUpload(file) {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('图片文件大小大于2MB!');
	}
	return isJpgOrPng && isLt2M;
}

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state={
			loading: false
		}
	}
	register() {
		let avantImg = ''
		if(this.state.upload===undefined){
			console.log('图片未上传，使用默认图片');
		}else{
			avantImg = this.state.upload;
		}
		api.register({userName:this.refs.userName.value,
			password:this.refs.password.value,
			nickName:this.refs.userName.value,
			avatar:avantImg
		}).then((data)=>{
			// 登录成功
			if(data.data.code === "success"){
				localStorage.setItem('token',data.data.token);
				this.props.history.push('/loginsuccess');
			}else{
				message.error('注册用户失败！');
			}
			
		})
	}
	// 上传中、完成、失败都会调用这个函数
	handleChange = info => {
		// console.log(info.file.response)
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl =>
				this.setState({
					imageUrl,
					loading: false,
				}),
			);
			// 如果上传成功，保存服务器返回的图片路径
			if(info.file.response.code === 'success'){
				this.setState({
					upload : "http://api.cat-shop.penkuoer.com"+info.file.response.info
				})
			}
		}
	};
	render() {
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		const { imageUrl } = this.state;
		return (
			<div>
				<div className={"content " + login.login_top}	>
					<div className={login.loginl_logo}>
						<img src='../image/login_logo.svg' alt='' />
						<img src='../image/logo_02.png' alt='' />
					</div>
					<div className={login.loginr_logo}>
						<img src='../image/login_right.png' alt='' />
					</div>
				</div>
				<div className={login.login_container}>
					<div className={login.login_box}>
						<h2>新用户注册</h2>
						<Upload
							name="file"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							action="http://api.cat-shop.penkuoer.com/api/v1/common/file_upload"
							method="post"
							beforeUpload={beforeUpload}
							onChange={this.handleChange}
						>
							{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
						</Upload>
						<div className={login.input_box}>
							<input type="text" placeholder="请输入用户名" ref="userName" />
						</div>
						<div className={login.input_box}>
							<input type="text" placeholder="请输入密码" ref="password" />
						</div>
						<button className={login.login_btn} onClick={() => this.register()}>
							注册
						</button>
						<NavLink to="/login"> 已有账户，直接登录 </NavLink>
					</div>
				</div>
			</div>
		)
	}
}