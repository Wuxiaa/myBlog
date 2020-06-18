import React,{useState} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined
} from '@ant-design/icons';
import '../static/AdminIndex.css'
import AddArticle from '../components/AddArticle'
import ArticleList from '../components/ArticleList'
import { Route} from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default function AdminIndex(props){
    const [collapsed,setcollapsed]= useState(false)
    const onCollapse = collapsed => {
      setcollapsed(collapsed );
    }

    const handleClickRouter = e =>{
      if(e.key === 'articleList'){
        props.history.push('/index/list')
      }else if(e.key === 'addArticle'){
        props.history.push('/index/addArticle')
      }
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              工作台
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu 
              key="sub1" 
              icon={<UserOutlined />} 
              title="文章管理"
              onClick = {handleClickRouter}
            >
              <Menu.Item key="addArticle">添加文章</Menu.Item>
              <Menu.Item key="articleList">文章列表</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />} >留言管理</Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 400 }}>
                <Route path = '/index' exact component = {AddArticle}/> 
                <Route path = '/index/addArticle' exact component = {AddArticle}/>
                <Route path = '/index/addArticle/:id' exact component = {AddArticle}/>
                <Route path = '/index/list' exact component = {ArticleList}/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
}