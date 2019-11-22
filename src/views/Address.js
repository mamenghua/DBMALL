import React, { Component } from 'react';
import address from '../css/Address.module.css'
import { Table, Button, Icon, Modal, message, Form, Col, Row, Input, Select, Cascader } from 'antd';

import * as api from '../api/address';

const { confirm } = Modal;
const { Option } = Select;

const options = [
    {
        value: '河南省',
        label: '河南省',
        children: [
            {
                value: '郑州市',
                label: '郑州市',
                children: [
                    {
                        value: '高新区',
                        label: '高新区',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];
function onChange(value) {
    console.log(value);
}
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
            isDefault:false
        }
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
        console.log(id);
        this.setState({
            editvisible: true,
        });
        // 根据id查询
        api.searchAddress(id,localStorage.getItem('token')).then((data)=>{
            console.log(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    handleOk = e => {
        console.log(e);
        console.log(this.refs.idDefault)
        let receiver = '';
        let mobile = 0;
        let regions = '';
        let idDefault = false;
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
        // if(this.refs.idDefault.state.value === 'true'){
        //     idDefault = true;
        // }
        if(this.refs.address.state.value !== undefined){
            address = this.refs.address.state.value;
        }
        // console.log(receiver , mobile , regions , idDefault , address);
        api.addAddress({
            receiver:receiver,
            mobile:mobile,
            regions:regions,
            address:address,
            idDefault:idDefault
        },localStorage.getItem('token')).then((data)=>{
            if(data.data.code === 'success'){
                message.success(data.data.message);
            }else{
                message.error('新增地址失败');
            }
        }).catch((err)=>{
            console.log(err);
        })

        api.getAddress({},localStorage.getItem('token')).then((data) => {
            let arrlist = data.data.addresses;
            let list = [];
            arrlist.map((item, i) => {
                let obj = {};
                obj.key = i;
                obj.receiver = item.receiver;
                obj.regions = item.regions;
                obj.address = item.address;
                obj.mobile = item.mobile;
                obj.id = item._id;
                obj._id = item._id;
                list.push(obj);
            })
            this.setState({ visible: false,data: list });
        })
        
        
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            editvisible: false,
        });
        
    };

    edithandleCancel = e => {
        console.log(e);
        this.setState({
            editvisible: false,
        });
    };
    componentDidMount() {
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
                obj.id = item._id;
                obj._id = item._id;
                list.push(obj);
            })
            this.setState({ data: list });
        })
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
                                <Input placeholder="请输入收货人姓名" ref="name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Mobile">
                                <Input placeholder="请输入手机号" ref="mobile"/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Regions">
                                <Cascader options={options} onChange={onChange} placeholder="Please select" ref="regions"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="idDefault">
                                <Select style={{width:'100%'}} ref="idDefault">
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
                                <Input placeholder="请输入收货人姓名" ref="editname"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Mobile">
                                <Input placeholder="请输入手机号" ref="editmobile"/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Regions">
                                <Cascader options={options} onChange={onChange} placeholder="Please select" ref="editregions"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="idDefault">
                                <Select style={{width:'100%'}} ref="editidDefault">
                                    <Option value="true">true</Option>
                                    <Option value="false">false</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Address">
                                <Input placeholder="请输入详细地址" ref="editaddress" />
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