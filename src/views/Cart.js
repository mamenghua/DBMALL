import React, { Component } from 'react';
import '../css/reset.css'
import '../css/common.css'
import cart from '../css/Cart.module.css'
import home from '../css/Home.module.css'
import { NavLink } from 'react-router-dom';
import { Table, Button, InputNumber, Icon, message } from 'antd';

import * as api from '../api/cart';

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
        // console.log(this)
        // console.log('changed', value,oldvalue,id);
        // console.log(value,oldvalue)
        let newValue = parseInt(value);
        let oldValue = parseInt(oldvalue);

        let diff = newValue - oldValue;
        console.log(diff, id);
        api.addCart({ product: id, quantity: diff }, localStorage.getItem('token')).then((data) => {
            console.log(data.data);
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
            console.log(this.state.selectedRowKeys)
            this.setState({ list: list  });
            console.log(data.data)
            let totalprice = 0;
            this.state.selectedRowKeys.map((item, i) => {
                totalprice += list[item].totalprice;
            })
            this.setState({ totalprice: totalprice })
        })

    }
    del = (delid) => {
        console.log(delid);
        console.log(this.state.list);
        console.log(this.state.selectedRowKeys)
        let list = this.state.list;
        list.map((item,i)=>{
            if(item.delid==delid){
                list.splice(i,1);
            }
        })
        this.setState({list:list,selectedRowKeys:[],totalprice:0})
        api.delCart(delid, localStorage.getItem('token')).then((data) => {
            //   message.success('删除成功');
            console.log(data.data)
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
    // componentWillMount(){

    // }
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
            console.log(data.data)
            // 购物车是否有数据
            if (list.length === 0) {
                document.getElementsByClassName('cartUnEmpty')[0].style.display = 'none';
            } else {
                document.getElementsByClassName('cartEmpty')[0].style.display = 'none';
            }
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
                    // console.log(record)
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
                        <Icon type="delete" theme="twoTone" onClick={() => this.del(text)} />
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
                                <NavLink to="">我的订单</NavLink>
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
                                <NavLink to="/home">
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
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.list} />
                                <h2>商品总价（不含运费）<span style={{ color: 'red' }}> {this.state.totalprice} </span> 元</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <div className={home.foot}>
                        <div className={home.foot_top}>
                            <img src='../imgs/foot_top.png' alt='' />
                        </div>
                        <div className={home.foot_nav}>
                            <NavLink to="">首页</NavLink> /
					<NavLink to="">网站地图</NavLink> /
					<NavLink to="">招聘英才</NavLink> /
					<NavLink to="">联系我们</NavLink> /
					<NavLink to="">关于我们</NavLink>
                        </div>
                        <div className={home.foot_img}>
                            <NavLink to=""><img src='../imgs/public_infomation.png' alt='' /></NavLink>
                            <NavLink to=""><img src='../imgs/online_110.png' alt='' /></NavLink>
                            <NavLink to=""><img src='../imgs/alipay_logo.png' alt='' /></NavLink>
                            <NavLink to=""><img src='../imgs/wxpay_logo.png' alt='' /></NavLink>
                            <NavLink to=""><img src='../imgs/dbmall_118.jpg' alt='' /></NavLink>
                            <NavLink to=""><img src='../imgs/gswj.png' alt='' /></NavLink>
                        </div>
                        <p>Copyright&copy;2019 dbmall.com, All Rights Reserved粤ICP备15109472号深公网安备4403300900603</p>
                        <p>食品流通许可证SP4403052015027332使用本网站即表示接受地标商城用户协议。版权所有深圳华夏地标电子商务有限公司</p>
                    </div>
                </footer>
            </div>
        )
    }
}