'use strict'

const Controller = require('egg').Controller

class MainController extends Controller{
    async index(){
        this.ctx.body = '<h2>我是刚刚写出来的页面 哟~</h2>'
    }

    async checkLogin(){
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password

        let sql = " SELECT userName FROM login WHERE userName = '"+userName +
        "' AND password = '"+password+"'"

        const result = await this.app.mysql.query(sql)
        if(result.length > 0){
            let openId = new Date().getTime()
            this.ctx.session.openId = openId
            this.ctx.body = {data : '登陆成功',openId}
        }else{
            this.ctx.body = {data : '登陆失败'}
        }
        
    }

    async getTypeInfo(){
        let result = await this.app.mysql.select('type')
        this.ctx.body = {data : result}
    }

    async addArticle(){
        let tempData = this.ctx.request.body
        let result = await this.app.mysql.insert('article',tempData)
        let insertSuccess = result.affectedRows === 1
        let insertId = result.insertId

        this.ctx.body = {
            isSuccess :insertSuccess,
            insertId
        }
    }

    async updateArticle(){
        const tempData = this.ctx.request.body
        const result = await this.app.mysql.update('article',tempData)
        const isSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess
        }
    }

    async getArticleList(){
        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            'article.view_count as view_count ,'+
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
            'type.typeName as typeName '+
            'FROM article LEFT JOIN type ON article.type_id = type.Id '+
            'ORDER BY article.id DESC '
        const result = await this.app.mysql.query(sql)

        this.ctx.body = {data :result}
    }

    async delArticle(){
        let id = this.ctx.params.id
        let result = await this.app.mysql.delete('article',{'Id':id })

        let isSuccess = result.affectedRows === 1

        this.ctx.body = {isSuccess}
    }

    async getArticleById(){
        let id = this.ctx.params.id
    
        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}
    }
}

module.exports = MainController