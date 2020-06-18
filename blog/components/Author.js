import { Avatar, Divider, Popover, Tag } from 'antd'
import { GithubOutlined, WechatOutlined, QqOutlined, UserOutlined } from '@ant-design/icons'
import '../public/style/components/Author.css'

export default function Author(){
    const sociality = {
        github :'https://github.com/Wuxiaa',
        qq : 'QQ:380904956',
        wechat : 'Wechat:12314562232'
    }
    const popover = {
        trigger:"hover",
        style : {
            color : '#1e90ff',
            backgroundColor:'rgba(0, 0, 0, 0.3)',
            borderRadius:'1rem'
        }
    }
    return (
        <div className = 'author center'>
            <Avatar size = {100} style = {{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <div className = 'author_summary'>
                <h2 style = {{color:'#2db7f5'}}>Wuxia</h2>
                一个很菜的前端小白,我说菜 那就是真的菜
                {/* {author} */}
            </div>
            <div className = 'author_tag'>
                <Tag className = 'tag_text' color="green">英雄联盟</Tag>
                <Tag className = 'tag_text'color="cyan">懒</Tag>
                <Tag className = 'tag_text'color="blue">小白</Tag>
                <Tag className = 'tag_text'color="geekblue">贼帅</Tag>
                <Tag className = 'tag_text'color="purple">游戏控</Tag>
                <Tag className = 'tag_text'color="orange">网瘾少年</Tag>
            </div>
            <Divider>联系方式</Divider>
            <div className = 'sociality'>
                <ul  >
                    <li><Popover
                        style = {popover.style}
                        content = {sociality.github}
                    ><Avatar size = {30} icon ={<GithubOutlined />} className = 'sociality_icon' /></Popover></li>
                    <li className = 'padding'><Popover
                        style = {popover.style}
                        content = {sociality.wechat}
                    ><Avatar size = {30} icon ={<WechatOutlined /> } className = 'sociality_icon' /></Popover></li>
                    <li><Popover
                        style = {popover.style}
                        content = {sociality.qq}
                    ><Avatar size = {30} icon ={<QqOutlined />} className = 'sociality_icon' /></Popover></li>
                </ul>
            </div>
        </div>
    )
}