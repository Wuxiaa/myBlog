import React,{useState} from 'react'
import { Spin, Input, Card, Button, message} from 'antd'
import 'antd/dist/antd.css'
import {UserOutlined, SearchOutlined} from '@ant-design/icons'
import '../static/Login.css'
import axios from 'axios'
import servicePath from '../config/ipUrl'
const Login =(props) =>{
    const [isLoading,setIsLoading] = useState(false)
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const checkLogin = () =>{
        const userData = {
            userName,
            password
        }
        if(!userName){
            setIsLoading(true)
            setTimeout(() =>{
                message.error('请输入用户名')
                setIsLoading(false)
            },500)
        }else if(!password){
            setIsLoading(true)
            setTimeout(() =>{
                message.error('请输入密码')
                setIsLoading(false)
            },500)
        }
        axios({
            method : 'post',
            url : servicePath.checkLogin,
            data :userData,
            withCredentials : true
        }).then(res =>{
            if(res.data.data === '登陆成功'){
                localStorage.setItem('openId',res.data.openId)
                props.history.push('/index')
            }else if(userName && password){
                setIsLoading(true)
                setTimeout(() =>{
                    message.error('用户名密码错误')
                    setIsLoading(false)
                },500) 
            }
        })    
    }

    const changeUserName = (e) =>{
        setUserName(e.target.value)
    }

    const changePassword = (e) =>{
        setPassword(e.target.value)
    }
    return (
        <div className = 'login_main'>
            <Spin tip = 'Loading...' spinning = {isLoading}>
                <Card title = 'Login System' style = {{width : '100%'}} bordered={true} > 
                    <Input 
                        className = 'loginInput' 
                        placeholder = 'Enter your userName'
                        prefix = {<UserOutlined />}
                        onChange = {changeUserName}
                        value = {userName}
                        
                    />
                    <Input.Password 
                        className = 'loginInput' 
                        placeholder = 'Enter your password'
                        prefix = {<SearchOutlined />}
                        onChange = {changePassword}
                        value = {password}
                    />
                    <Button
                        onClick = { checkLogin }
                        className = 'login_in' 
                        type = 'primary'
                    >Login in</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login