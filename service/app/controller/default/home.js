'use strict'

const Controller = require('egg').Controller;

class HomeController extends Controller{
    async index() {
        this.ctx.body = 'hello egg'
      }
    async getArticleList(){
        let sql = 'SELECT article.id as id,' +
                  'article.title as title,' +
                  'article.introduce as introduce,' +
                  "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime," +
                  'article.view_count as view_count,' +
                  'type.typeName as typeName ' +
                  //article表左连接type表,文章表标识type_id 对应 type表Id
                  'FROM article LEFT JOIN type ON article.type_id = type.id'


        let result = await this.app.mysql.query(sql)
        this.ctx.body = {data : result}
    }

    async getDetailedById(){
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,'+
                'article.title as title,'+
                'article.introduce as introduce,'+
                'article.article_content as content,'+
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
                'article.view_count as view_count ,'+
                'type.typeName as typeName ,'+
                'type.id as typeId '+
                'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                'WHERE article.id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body = {data:result}
    }

    async getTypeInfo(){
        const result = await this.app.mysql.select('type')
        this.ctx.body = {data:result}
    }

    // async getListById (){
    //     let id = this.ctx.params.id
    //     let sql = 'SELECT article.id as id,'+
    //     'article.title as title,'+
    //     'article.introduce as introduce,'+
    //     "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    //     'article.view_count as view_count ,'+
    //     'type.typeName as typeName '+
    //     'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    //     'WHERE type_id='+id
    //     const result = await this.app.mysql.query(sql)
    //     this.ctx.body={data:result}
    // }
}

module.exports = HomeController