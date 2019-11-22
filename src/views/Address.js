import React, { Component } from 'react';
import address from '../css/Address.module.css'
import { Table, Button, Icon, Modal, message, Form, Col, Row, Input, Select, Cascader } from 'antd';

import * as api from '../api/address';
import Position from './Postion';

const { confirm } = Modal;
const { Option } = Select;

export default class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
            editvisible: false,
            receiver:'',
            mobile:'',
            regions:[],
            address:'',
            isDefault:false,
            modid:''
        }
    }
    // 展示列表，封装为函数，供多处调用
    showAddress = ()=>{
        api.getAddress({}, localStorage.getItem('token')).then((data) => {
            let arrlist = data.data.addresses;
            let list = [];
            arrlist.map((item, i) => {
                let obj = {};
                obj.key = i;
                obj.receiver = item.receiver;
                obj.regions = item.regions;
                obj.address = item.address;
                obj.mobile = item.mobile;
                if(item.isDefault === true){
                    obj.isDefault = true;
                }else{
                    obj.isDefault = false;
                }
                obj.id = item._id;
                obj._id = item._id;
                list.push(obj);
            })
            this.setState({ data: list });
        })
    }
    // 判断是否删除
    showConfirm = (delid) => {
        let _this = this;
        confirm({
            title: '你确定要删除' + delid + '这条地址吗',
            onOk() {
                _this.del(delid);
            },
            onCancel() { },
        });
    }
    del = (delid) => {
        let data = this.state.data;
        data.map((item, i) => {
            if (item._id == delid) {
                data.splice(i, 1);
            }
        })
        this.setState({ list: data, selectedRowKeys: [] })
        api.delAddress(delid, localStorage.getItem('token')).then((data) => {
            if (data.data !== null) {
                message.success('删除成功')
            } else {
                message.error('删除失败')
            }
        }).catch((err) => {
            message.error('删除失败' + err)
        });

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    editshowModal = (id)=>{
        this.setState({
            editvisible: true,
        });
        // 根据id查询
        api.searchAddress(id,localStorage.getItem('token')).then((data)=>{
            this.setState({
                receiver:data.data.receiver,
                mobile:data.data.mobile,
                regions:[...data.data.regions.split('-')],
                address:data.data.address,
                isDefault:data.data.isDefault,
                modid:id
            });
        }).catch((err)=>{
            console.log(err);
        })
    }
    // 新增
    handleOk = e => {
        let _this = this;
        let receiver = '';
        let mobile = 0;
        let regions = '';
        let address = '';
        if(this.refs.name.state.value !== undefined){
            receiver = this.refs.name.state.value;
        }
        if(this.refs.mobile.state.value !== undefined){
            mobile = parseInt(this.refs.mobile.state.value);
        }
        if(this.refs.regions.state.value !== undefined){
            regions = this.refs.regions.state.value.join('-');
        }
        if(this.refs.address.state.value !== undefined){
            address = this.refs.address.state.value;
        }
        api.addAddress({
            receiver:receiver,
            mobile:mobile,
            regions:regions,
            address:address,
            isDefault:this.state.isDefault
        },localStorage.getItem('token')).then((data)=>{
            if(data.data.code === 'success'){
                message.success(data.data.message);
            }else{
                message.error('新增地址失败');
            }
            // 新增列表之后，刷新列表页面
            _this.showAddress();

        }).catch((err)=>{
            console.log(err);
        })
        this.setState({ visible: false });
        
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    edithandleOk = e => {
        this.setState({
            editvisible: false,
        });
        let _this = this;
        api.modAddress(this.state.modid,{
            receiver:this.state.receiver,
            mobile:this.state.mobile,
            regions:this.state.regions.join('-'),
            address:this.state.address,
            isDefault:this.state.isDefault
        },localStorage.getItem('token')).then((data)=>{
            _this.showAddress();
        }).catch((err)=>{
            console.log(err);
        })
    };

    edithandleCancel = e => {
        this.setState({
            editvisible: false,
            receiver: '',
            mobile:'',
            regions:[...this.state.regions.splice(0)],
            address:'',
            isDefault:false
        });
    };

    changeReceiver = e =>{
        this.setState({
            receiver:e.target.value
        })
    }
    changeMobile = e =>{
        this.setState({
            mobile:e.target.value
        })
    }
    changeRegions = e =>{
        this.setState({
            regions:e
        })
    }
    changeIsDefault = e =>{
        this.setState({
            isDefault:e
        })
    }
    changeAddress = e =>{
        this.setState({
            address:e.target.value
        })
    }
    componentDidMount() {
        // 调用展示列表函数，显示
        this.showAddress();
    }
    render() {
        const columns = [
            {
                title: ' ',
                dataIndex: 'key',
            },
            {
                title: '收货人',
                dataIndex: 'receiver',
            },
            {
                title: '所在地区',
                dataIndex: 'regions',
            },
            {
                title: '街道地址',
                dataIndex: 'address',
            },
            {
                title: '电话/手机',
                dataIndex: 'mobile',
            },
            {
                title: '是否默认true/false',
                dataIndex: 'isDefault',
                render: (text, record, index) => ''+text
            },
            {
                title: '操作',
                dataIndex: 'id',
                render: (text, record, index) => {
                    return (
                        <Icon type="edit" theme="twoTone" onClick={() => this.editshowModal(text)} />
                    )
                }
            },
            {
                title: '删除',
                dataIndex: '_id',
                render: (text, record, index) => {
                    return (
                        <Icon type="delete" theme="twoTone" onClick={() => this.showConfirm(text)} />
                    )
                }
            },
        ];
        return (
            <div className={address.section}>
                <h3 className={address.tit}>
                    地址列表
                    <Button type="danger" style={{ float: 'right' }} onClick={this.showModal}>新增地址</Button>
                </h3>
                <Modal
                    title="新增地址"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="新增"
                    cancelText="取消"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Name">
                                <Input placeholder="请输入收货人姓名" maxLength={4} ref="name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Mobile">
                                <Input placeholder="请输入手机号" maxLength={11} ref="mobile"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Regions">
                                <Cascader options={Position} placeholder="Please select" ref="regions"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="isDefault">
                                <Select style={{width:'100%'}} value={''+this.state.isDefault} onChange={this.changeIsDefault.bind(this)} >
                                    <Option value="true">true</Option>
                                    <Option value="false">false</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Address">
                                <Input placeholder="请输入详细地址" ref="address" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Modal>


                <Modal
                    title="修改地址"
                    visible={this.state.editvisible}
                    onOk={this.edithandleOk}
                    onCancel={this.edithandleCancel}
                    okText="保存"
                    cancelText="取消"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Name">
                                <Input placeholder="请输入收货人姓名" maxLength={4} value={this.state.receiver} onChange={this.changeReceiver.bind(this)}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Mobile">
                                <Input placeholder="请输入手机号" maxLength={11} value={this.state.mobile} onChange={this.changeMobile.bind(this)}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Regions">
                                <Cascader options={Position} onChange={this.changeRegions.bind(this)} placeholder="Please select" 
                                            value={this.state.regions} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="isDefault">
                                <Select style={{width:'100%'}} value={''+this.state.isDefault} onChange={this.changeIsDefault.bind(this)} >
                                    <Option value="true">true</Option>
                                    <Option value="false">false</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Address">
                                <Input placeholder="请输入详细地址" value={this.state.address} onChange={this.changeAddress.bind(this)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Modal>

                <div className={address.tipBox}>
                    <h4>提示操作：</h4>
                    <p>最多可保存10个有效地址</p>
                </div>
                <Table columns={columns} dataSource={this.state.data} pagination={{ hideOnSinglePage: true }} />
            </div>
        )
    }
}