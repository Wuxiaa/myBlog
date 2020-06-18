import { useState, useEffect } from 'react'
import { Menu, Row, Col } from 'antd'
import { HomeOutlined, EditOutlined, UnorderedListOutlined, SmileOutlined } from '@ant-design/icons'
import '../public/style/components/Header.css'
import axios from 'axios'
import servicePath from '../config/ipUrl'
import Router from 'next/router'
import Link from 'next/link'

export default function Header (){
    const [navData,setNavData] = useState([])
    useEffect(() =>{
        const fetchData  = async () =>{
            await axios.get(servicePath.getTypeInfo).then(res =>{
                setNavData(res.data.data)
            })
        }
        fetchData()
    },[])

    const changePage = (e) =>{
        if(e.key === '0'){
            Router.push('/')
        }else{
            Router.push('/detailed/?id=' + e.key)
        }
    }
    return (
        <div className = 'header-main'>
            <Row type = 'flex' justify = 'center'>
                {/* 头部logo部分 */}
                <Col xs = {24} sm = {24} md = {14} lg = {12} xl = {12} >
                    <span className = 'header-logo'>
                        <Link href = '/'>
                            <a>Wuxia</a>
                        </Link>
                    </span>

                    <span className = 'hedaer-text'>没事做着玩的博客~</span>
                </Col>
                <Col xs = {0} sm = {0} md = {10} lg = {8} xl = {6}>
                    <Menu 
                        className = 'header-menu' 
                        mode="horizontal"
                        onClick = {changePage}
                    >
                        <Menu.Item key = '0' >
                            <HomeOutlined />首页
                        </Menu.Item>
                        {
                        navData.map(item =>{
                            return(
                                <Menu.Item key = {item.Id} >
                                    {item.typeName}
                                </Menu.Item>)}
                            )
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}