import React,{useState,useEffect} from 'react'
import {Table,Button, message,Modal} from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'
import servicePath from '../config/ipUrl'

export default (props) =>{
    const [listData,setListData] = useState([])
    const [isShow,setIsShow] = useState(false)
    const [delItem,setDelItem] = useState('')
    const getList = () =>{
        axios({
            method:'get',
            url:servicePath.getArticleList,
            withCredentials:true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(res =>{
            setListData(res.data.data)
        })
    }
    useEffect(() =>{
        getList()
    },[])

    const deleteArticle = (id) =>{
        console.log(id)
        setIsShow(false)
        axios({
            method:'get',
            url : servicePath.delArticle + id,
            withCredentials:true
        }).then(res =>{
            if(res.data.isSuccess){
                setTimeout(() =>{
                    message.success('删除成功')
                    getList()
                },400)
            }
            
        })
    }

    const changeArticle= (id)=>{
        props.history.push('/index/addArticle/'+id)
    }
    let columns = [
        {
            title : '标题',
            key : '标题',
            dataIndex : 'title'
        },{
            title : '类别',
            key : '类别',
            dataIndex : 'typeName'
        },{
            title : '发布时间',
            key : '发布时间',
            dataIndex: 'addTime'
        },{
            title : '浏览量',
            key : '浏览量',
            dataIndex: 'view_count'
        },{
            title : '操作',
            key : '操作',
            render:(one,record) =>(
                <>              
                    <Button danger className = 'margin-right'
                        onClick = {() =>{
                            setIsShow(true)
                            setDelItem(record.id)
                        }}
                    >删除</Button>
                    <Button type = 'primary' onClick = {() =>changeArticle(record.id)}>修改</Button>
                </>
            )
        }
    ]

    return (
       <>
            <Table 
                columns = {columns}
                dataSource = {listData}
                rowKey = {record => record.id}
            />
            <Modal
                title = 'Delete Article'
                visible = {isShow}
                onOk = {() =>deleteArticle(delItem)}
                onCancel = {() =>setIsShow(false)}
            >确定删除这篇文章吗</Modal>
       </>
    )
}