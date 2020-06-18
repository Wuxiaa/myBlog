import { useState } from 'react'
import Header from '../components/Header'
import Author from '../components/Author'
import { List, Row, Col, Tag } from 'antd'
import Footer from '../components/Footer'
import { CalendarOutlined, StarOutlined, FireOutlined } from '@ant-design/icons'
import axios from 'axios'
import Link from 'next/link'
import servicePath from '../config/ipUrl'



const Home = (articleList)=> {
  const [myList,setMyList] = useState(articleList.data)
  return (
    <div >
      <title>my Blog</title>
      <Header />
      <Row type = 'flex' justify = 'center'>
        <Col xs = {22} sm = {22} md = {20} lg = {12} xl = {12} className = 'margin-right'>
          <div className = 'list-main'>
            <List
              itemLayout = "vertical" 
              header = {<div className = 'list-header'>最新日志</div>}
              dataSource = {myList}
              renderItem = {item =>(
                  <List.Item>
                    <header className = 'list-title'>
                      <Link href ={{pathname:'./detailed',query :{id :item.id}}}><a>{item.title}</a></Link>
                    </header>
                    <div >
                      <ul className = 'article_tag'>
                        <li><Tag color = 'cyan'  style = {{borderRadius:'.3rem',padding :'0 .6rem'}}><CalendarOutlined /> {item.addTime}</Tag></li>
                        <li><Tag color = 'green'  style = {{borderRadius:'.3rem',padding :'0 .6rem'}}><StarOutlined /> {item.typeName}</Tag></li>
                        <li><Tag color = 'volcano'  style = {{borderRadius:'.3rem',padding :'0 .6rem'}}><FireOutlined /> {item.view_count}人</Tag></li>
                      </ul>
                    </div>
                    <article className = 'list-introduce'>{item.introduce}</article>
                  </List.Item>
              )}
            />
          </div>
        </Col>
        <Col xs = {0} sm = {0} md = {0} lg = {4} xl = {4}>
          <Author />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Home.getInitialProps = async () =>{
  let promise = await new Promise(resolve =>{
    axios.get(servicePath.getArticleList).then(res =>{
      resolve(res.data)
    })
  })
  return promise
}

export default Home
