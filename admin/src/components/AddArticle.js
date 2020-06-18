import React,{useState,useEffect} from 'react'
import {Input, Row, Col, Select, Button, DatePicker, message} from 'antd'
import '../static/AddArticle.css'
import marked from 'marked'
import axios from 'axios'
import servicePath from '../config/ipUrl'


export default function AddArticle (props){
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('文章简介') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState(1) //选择的文章类别

    useEffect(() =>{
        getArticleType()
        let id = props.match.params.id
        if(id){
            getArticleById(id)
            setArticleId(id)
        }
        
    },[])
    const getArticleType = () =>{
        axios({
            method : 'get',
            url : servicePath.getTypeInfo,
            withCredentials: true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(res => {
            if(res.data.data === '未登录'){
                localStorage.removeItem('openId')
                props.history.puth('/')
            }else{
                setTypeInfo(res.data.data)
            }
        })
        
  }
    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
      }); 

    const changeArticleContent = (e) =>{
        let value = e.target.value
        setArticleContent(value)
        let html = marked(value)
        setMarkdownContent(html)
    }
    const changeArticleIntroduce = (e) =>{
        let value = e.target.value
        let html = marked(value)
        setIntroducemd(value)
        setIntroducehtml(html)    
    }

    const addArticle = () =>{
        let datetext= showDate ? showDate.replace('-','/') : new Date().getTime() //把字符串转换成时间戳
        let addTime =(new Date(datetext).getTime())/1000
        let dataProps = {
            title : articleTitle,
            introduce :introducemd,
            article_content:articleContent,
            addTime,
            type_id:selectedType
        }
        if(articleId === 0){
            axios({
                method:'post',
                url : servicePath.addArticle,
                withCredentials: true,
                data:dataProps
            }).then(res =>{
                if(res.data.isSuccess){
                    setArticleId(res.data.insertId)
                    message.success('发布成功')
                }else{
                    message.error('发布失败')
                }
            })
        }else{
            dataProps.id = articleId 
            axios({
                method : 'post',
                url : servicePath.updateArticle,
                data : dataProps,
                header:{ 'Access-Control-Allow-Origin':'*' },
                withCredentials: true
            }).then(res =>{
                if(res.data.isSuccess){
                    message.success('文章修改成功')
                }else{
                    message.error('文章修改失败')
                }
            })
        }
    }
    const saveArticle = () =>{
        if(!articleTitle){
            message.error('请输入文章标题')
            return
        }else if(!articleContent){
            message.error('请输入文章内容')
            return
        }else if(!introducemd){
            message.error('请输入文章简介')
            return
        }else if(!typeInfo){
            message.error('请选择文章类别')
            return
        }
        // else if(!showDate){
        //     message.error('请选择发布日期')
        //     return
        // }
        else{
            addArticle()
        }
        
    }

    const getArticleById = (id) =>{
        axios({
            method:'get',
            url : servicePath.getArticleById +id,
            withCredentials:true
        }).then(res =>{
            let result = res.data.data[0]
            setArticleTitle(result.title)
            setArticleContent(result.article_content)
            let html=marked(result.article_content)
            setMarkdownContent(html)
            setIntroducemd(result.introduce)
            let tmpInt = marked(result.introduce)
            setIntroducehtml(tmpInt)
            setShowDate(result.addTime)
            setSelectType(result.typeId)
        })
    }
    return (
        <Row gutter ={5}>
            <Col span = {16} >
                <Row gutter = {10}>
                    <Col span = {20}>
                        <Input 
                            placeholder = '博客标题'
                            size = 'large'
                            onChange = {e => {setArticleTitle(e.target.value)}}
                            value = {articleTitle}
                        />
                    </Col>
                    <Col span = {4}>
                        <Select
                            size = 'large' 
                            defaultValue = '博客类型'
                            onChange = {value => {setSelectType(value)}}
                        >
                            {
                                typeInfo.map((item,index) =>(
                                    <Select.Option key = {index} value = {item.Id}>{item.typeName}</Select.Option>
                                ))
                            }
                        </Select>
                    </Col>
                </Row>
                <Row gutter= {10} className = 'margin'>
                    <Col span = {12}>
                        <Input.TextArea
                            className = 'border_radius' 
                            placeholder = '文章预览'
                            rows = {34}
                            onChange = {changeArticleContent}
                            value = {articleContent}
                        />
                    </Col>
                    <Col span = {12}>
                        <div className = 'show_html border_radius'
                            dangerouslySetInnerHTML = {{__html:markdownContent}}
                        ></div>
                    </Col>
                </Row>
            </Col>
            <Col span = {8}>
                <div style = {{width:'100%',textAlign:'right'}}>
                    <Button 
                        type = 'primary' 
                        size='large' 
                        onClick = {saveArticle}
                    >发布文章</Button>
                </div>
                <Input.TextArea 
                    placeholder = '文章简介'
                    rows = {5}
                    className = 'margin border_radius'
                    onChange = {changeArticleIntroduce}
                    value = {introducemd}
                />
                <div className = 'article_introduce'
                    dangerouslySetInnerHTML = {{__html:introducehtml}}
                ></div>
                <DatePicker 
                    size = 'large'
                    placeholder="发布日期"
                    onChange = {(date,dateString) => setShowDate(dateString)}
                />
            </Col>

        </Row>
    )
}
