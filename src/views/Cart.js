import React, { Component } from 'react';
import '../css/reset.css'
import '../css/common.css'
import cart from '../css/Cart.module.css'
import mymall from '../css/Mymall.module.css'
import { NavLink } from 'react-router-dom';
import { Table, Button, InputNumber, Icon, message, Modal } from 'antd';
import * as api from '../api/cart';
import * as API from "../api/user.js";
const { confirm } = Modal;

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            list: [],
            totalprice: 0,
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
        }

    }
    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };
    numberChange = (value, oldvalue, id) => {
        // console.log( value,oldvalue,id);
        let newValue = parseInt(value);
        let oldValue = parseInt(oldvalue);
        let diff = newValue - oldValue;
        api.addCart({ product: id, quantity: diff }, localStorage.getItem('token')).then((data) => {
            // console.log(data.data);
        }).catch((err) => {
            message.error('购物车更改失败！' + err);
        })
        // 获取用户购物车数据
        api.getCarts(localStorage.getItem('token')).then((data) => {
            let cartlist = data.data;
            let list = [];
            cartlist.map((item, i) => {
                let obj = {};
                if (item.product === null) {
                    obj.id = item._id;
                    obj.name = "默认name";
                    obj.price = 0;
                    obj.totalprice = 0;
                    obj.coverImg = 'http://api.cat-shop.penkuoer.com//uploads/20190917/1569590406607.jpg';
                } else {
                    obj.id = item.product._id;
                    obj.name = item.product.name;
                    obj.price = item.product.price;
                    obj.totalprice = item.product.price * item.quantity;
                    obj.coverImg = item.product.coverImg;
                }
                obj.key = i;
                obj.number = item.quantity;
                obj.delid = item._id;
                list.push(obj);
            });
            this.setState({ list: list });
            let totalprice = 0;
            this.state.selectedRowKeys.map((item, i) => {
                totalprice += list[item].totalprice;
            })
            this.setState({ totalprice: totalprice })
        })

    }
    showConfirm = (delid) => {
        let _this = this;
        confirm({
            title: '你确定要删除' + delid + '这件商品吗',
            onOk() {
                _this.del(delid);
            },
            onCancel() { },
        });
    }
    del = (delid) => {
        let list = this.state.list;
        list.map((item, i) => {
            if (item.delid == delid) {
                list.splice(i, 1);
            }
        })
        this.setState({ list: list, selectedRowKeys: [], totalprice: 0 })
        api.delCart(delid, localStorage.getItem('token')).then((data) => {
            if (data.data !== null) {
                message.success('删除成功')
                // 获取用户购物车数据
            } else {
                message.error('删除失败')
            }
        }).catch((err) => {
            message.error('删除失败' + err)
        });
        // 购物车是否有数据
        if (this.state.list.length === 0) {
            document.getElementsByClassName('cartUnEmpty')[0].style.display = 'none';
            document.getElementsByClassName('cartEmpty')[0].style.display = 'block';
        } else {
            document.getElementsByClassName('cartEmpty')[0].style.display = 'none';
            document.getElementsByClassName('cartUnEmpty')[0].style.display = 'block';
        }

    }
    onSelectChange = selectedRowKeys => {
        let totalprice = 0;
        selectedRowKeys.map((item, i) => {
            totalprice += this.state.list[item].totalprice;
        })
        this.setState({ totalprice: totalprice, selectedRowKeys })
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
    };

    componentDidMount() {
        // 用户名
        if (localStorage.getItem('token')) {
            document.getElementsByClassName('user')[0].style.display = 'none';
            document.getElementsByClassName('user')[1].style.display = 'block';
        } else {
            document.getElementsByClassName('user')[0].style.display = 'block';
            document.getElementsByClassName('user')[1].style.display = 'none';
        }

        // 获取用户购物车数据
        api.getCarts(localStorage.getItem('token')).then((data) => {
            let cartlist = data.data;
            let list = [];
            cartlist.map((item, i) => {
				console.log(item)
                let obj = {};
                if (item.product === null) {
                    obj.id = "默认id";
                    obj.name = "默认name";
                    obj.price = 0;
                    obj.totalprice = 0;
                    obj.coverImg = 'http://api.cat-shop.penkuoer.com//uploads/20190917/1569590406607.jpg';
                } else {
                    obj.id = item.product._id;
                    obj.name = item.product.name;
                    obj.price = item.product.price;
                    obj.totalprice = item.product.price * item.quantity;
                    obj.coverImg = item.product.coverImg;
                }
                obj.key = i;
                obj.number = item.quantity;
                obj.delid = item._id;
                list.push(obj);
            });
            this.setState({ list: list });
            // 购物车是否有数据
            if (this.state.list.length === 0) {
                document.getElementsByClassName('cartUnEmpty')[0].style.display = 'none';
                document.getElementsByClassName('cartEmpty')[0].style.display = 'block';
            } else {
                document.getElementsByClassName('cartEmpty')[0].style.display = 'none';
                document.getElementsByClassName('cartUnEmpty')[0].style.display = 'block';
            }
        }).catch((err) => {
            document.getElementsByClassName('cartUnEmpty')[0].style.display = 'none';
            document.getElementsByClassName('cartEmpty')[0].style.display = 'block';
        })
        // 判断用户信息
        API.usermsg(localStorage.getItem("token")).then((data)=>{
            this.setState({user:data.data.userName})
        }).catch((data)=>{
            this.setState({user:' 您暂未登录 '})
        })

    }
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        const columns = [
            {
                title: '商品',
                dataIndex: 'name',
                render: (text, record, index) => {
                    return (
                        <div>
                            <img src={record.coverImg} style={{ width: '120px', height: '80px', marginRight: '20px' }} />
                            <span style={{ display: 'inline-block', width: '200px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{text}</span>
                        </div>)
                }
            },
            {
                title: '单价（元）',
                dataIndex: 'price',
            },
            {
                title: '数量',
                dataIndex: 'number',
                render: (text, record, index) => {
                    return (<div>
                        <InputNumber size="large" min={1} max={100000} defaultValue={text} onChange={(e) => this.numberChange(e, text, record.id)} dataid={record.id} />
                    </div>)
                }
            },
            {
                title: '小计（元）',
                dataIndex: 'totalprice',
            },
            {
                title: '操作',
                dataIndex: 'delid',
                render: (text, record, index) => {
                    return (
                        <Icon type="delete" theme="twoTone" onClick={() => this.showConfirm(text)} />
                    )
                }
            },
        ];

        return (
            <div>
                <header>
                    <div className={cart.head_content} id="回到顶部">
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
                                    <NavLink to="/home" onClick={() => { localStorage.removeItem('token'); window.location.reload() }}>[注销]</NavLink>
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
                                <NavLink to="">关注我们<Icon type="caret-down" /></NavLink>

                            </li>
                        </ul>
                    </div>
                    <div className={cart.logo}>
                        <div className={cart.logo_content}>
                            <img src='../imgs/logo_01.png' alt='' />
                            <img src='../imgs/logo_02.png' alt='' />
							<NavLink className={mymall.mycart} to="/cart">
							我的购物车
							</NavLink>
							<NavLink className={mymall.mymall} to="/mymall">
							我的商城
							</NavLink>
                        </div>
                    </div>

                </header>
                <div className={cart.container}>
                    <div className="content">
                        {/* 购物车为空时 */}
                        <div className={"cartEmpty " + cart.cartEmpty}>
                            <img src='../imgs/cart.png' alt='' className={cart.cartImg} />
                            <h2>您的购物车还没有商品</h2>
                            <p>
                                <NavLink to="/home">
                                    <Icon type="rollback" />
                                    马上去购物
                            </NavLink>
                                <NavLink to="/order">
                                    <Icon type="file-done" />
                                    查看自己的订单
                            </NavLink>
                            </p>
                        </div>
                        {/* 购物车有数据时 */}
                        <div className={"cartUnEmpty " + cart.cartUnEmpty}>
                            <h2>我的购物车</h2>
                            <h4>查看购物车商品清单，增加减少商品数量，并勾选想要的商品进入下一步操作。</h4>
                            <div>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                                        Reload
          </Button>
                                    <span style={{ marginLeft: 8 }}>
                                        {hasSelected ? `选中了 ${selectedRowKeys.length} 条商品` : ''}
                                    </span>
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.list} pagination={{ pageSize: 6 }} />
                                <h2>商品总价（不含运费）<span style={{ color: 'red' }}> {this.state.totalprice} </span> 元</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}