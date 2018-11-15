/**
 * app.js 入口模块
 * 功能分析：
 *   相关服务配置：
 *      模板引擎
 *      body-parser 解析表单请求体
 *   挂载路由
 *   监听端口
 */

var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

// 利用 express.static 中间件托管静态资源
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public'))

app.engine('html', require('express-art-template'))

// 配置 body-parser 解析器
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extend: false }))
    // parse application/json
app.use(bodyParser.json())

app.use(router)

app.listen(3001, () => {
    console.log('Server is running in port 3001...')
})

module.exports = app