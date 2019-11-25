import React, { Component } from 'react';
import footer from '../css/Footer.module.css'

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div className={footer.foot}>
                    <div className={footer.foot_top}>
                        <img src='../image/foot_top.png' alt='' />
                    </div>
                    <div className={footer.foot_nav}>
                        <a href='#'>&nbsp;首页&nbsp;</a>/  
                        <a href='#'>&nbsp;网站地图&nbsp;</a>/
                        <a href='#'>&nbsp;招聘英才&nbsp;</a>/
                        <a href='#'>&nbsp;联系我们&nbsp;</a>/
                        <a href='#'>&nbsp;关于我们&nbsp;</a> 
                    </div>
                    <div className={footer.foot_img}>
                        <a href='#'>
                            <img src='../image/public_infomation.png' alt=''/>
                        </a>
                        <a href='#'>
                            <img src='../image/online_110.png' alt=''/>
                        </a>
                        <a href='#'>
                            <img src='../image/alipay_logo.png' alt=''/>
                        </a>
                        <a href='#'>
                            <img src='../image/wxpay_logo.png' alt=''/>
                        </a>
                        <a href='#'>
                            <img src='../image/dbmall_118.jpg' alt=''/>
                        </a>
                        <a href='#'>
                            <img src='../image/gswj.png' alt=''/>
                        </a>
                    </div>
                    <p>Copyright&copy;2019 dbmall.com, All Rights Reserved粤ICP备15109472号深公网安备4403300900603</p>
                    <p>食品流通许可证SP4403052015027332使用本网站即表示接受地标商城用户协议。版权所有深圳华夏地标电子商务有限公司</p>
                </div>
            </footer>
        )
    }
}