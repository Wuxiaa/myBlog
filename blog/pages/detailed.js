import { useState } from 'react'
import '../public/style/pages/detailed.css'
import Header from '../components/Header'
import Author from '../components/Author'
import { Row, Col, Tag, Breadcrumb, Affix } from 'antd'
import Footer from '../components/Footer'
import { CalendarOutlined, StarOutlined, FireOutlined } from '@ant-design/icons'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/ipUrl'


const Detailed = (articleDetaile) =>{
    const tocify = new Tocify()
    const renderer = new marked.Renderer()
    renderer.heading = function(text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    }

    marked.setOptions({
        renderer: renderer, 
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    }); 

    let html = marked(articleDetaile.content)

    const [article,setArticle] = useState(articleDetaile)
    return (
        <div>
           <Header />
            <Row type = 'flex' justify = 'center'>
                <Col xs = {22} sm = {22} md = {20} lg = {12} xl = {12} className = 'margin-right'>
                    <div className = 'detailed'>
                        <div className = 'breadcrumb'>
                            <Breadcrumb>
                                <Breadcrumb.Item><a href = '/'>首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>{article.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <header className = 'center'>
                            <div className = 'article_title'>{article.title}</div>
                            <ul className = 'article_tag'>
                                <li><Tag color = 'cyan'  style = {{borderRadius:'.3rem',padding :'0 .6rem'}}><CalendarOutlined /> {article.addTime}</Tag></li>
                                <li><Tag color = 'green'  style = {{borderRadius:'.3rem',padding :'0 .6rem'}}><StarOutlined /> {article.typeName}</Tag></li>
                                <li><Tag color = 'volcano'  style = {{borderRadius:'.3rem',padding :'0 .6rem'}}><FireOutlined /> {article.view_count}人</Tag></li>
                            </ul>
                        </header>
                        <article>
                            <div className = 'article_main'
                                dangerouslySetInnerHTML = {{__html:html}}
                            ></div>
                        </article>
                    </div>
                </Col>
                <Col xs = {0} sm = {0} md = {0} lg = {4} xl = {4}>
                    <Author />
                    <Affix offsetTop = {5}>
                        <div className = 'articleNav'>
                            <div className = 'nav_title'>日志目录</div>
                            <div className="toc-list">
                               {tocify && tocify.render()}
                            </div>
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}

Detailed.getInitialProps = async (context) =>{
    let id = context.query.id
    const promise = await new Promise(resolve =>{
        axios(servicePath.getDetailedById + id).then(res =>{
            resolve(res.data.data[0])
        })
    })
    return promise
}

export default Detailed