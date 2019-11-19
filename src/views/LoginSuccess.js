import React, { Component } from 'react';
import { Result, Button } from 'antd';

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state={
            time:5,
        }
    }
    render(){
        return(
            <div>
            <Result
					status="success"
                    title="用户登录成功"
                    extra={<div>
                        <p>倒计时 {this.state.time} ，自动跳转到首页...</p>
					    <Button type="primary" onClick={()=>this.toHome()}>
						    去首页
					    </Button>
                    </div>
					}
				/>
            </div>
        )
    }
    toHome(){
        this.props.history.push('/home');
    }
    
    componentDidMount(){
        this.timer = setInterval(()=>{
            let number = this.state.time-1;
            this.setState({time:number})
            if(this.state.time<=0){
                this.toHome();
            }
        },1000);  
    }
    
    componentWillUnmount(){
        clearTimeout(this.timer);
    }
}