'use strict'

module.exports = app =>{
    const {router,controller} = app
    router.get('/',controller.default.home.index)
    router.get('/default/getArticleList',controller.default.home.getArticleList)
    router.get('/default/getDetailedById/:id',controller.default.home.getDetailedById)
    router.get('/default/getTypeInfo',controller.default.home.getTypeInfo)
}