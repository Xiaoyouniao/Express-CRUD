/**
 * router.js 路由模块
 * 功能分析：
 *  处理路由
 *  根据不同请求方法和请求路径设置具体的请求处理函数
 */

var fs = require('fs')
var Student = require('./student')

var express = require('express')

//  1.创建一个路由容器
var router = express.Router()

//  2.将路由挂载至 router 路由容器中
//  2.1 渲染学生列表页面
router.get('/', (req, res) => {
    res.redirect('/students')
})

router.get('/students', (req, res) => {
    Student.find((err, students) => {

        if (err) return res.status(500).send('Server error')
        res.render('index.html', {
            fruits: [
                { "name": '苹果', "img": '/public/img/01.jpg' },
                { "name": '香蕉', "img": '/public/img/02.jpg' },
                { "name": '橘子', "img": '/public/img/03.jpg' }
            ],
            students: students
        })
    })
})

//  2.2 渲染添加学生页面
router.get('/students/new', (req, res) => {
    res.render('new.html')
})

//  2.3 处理添加学生业务
router.post('/students/new', (req, res) => {
    Student.save(req.body, err => {
        if (err) return res.status(500).send('Server error')
        res.redirect('/students')
    })
})

//  2.4 渲染编辑学生页面
router.get('/students/edit', (req, res) => {
    Student.findById(parseInt(req.query.id), (err, student) => {
        if (err) return res.status(500).send('Server error')
            // console.log(student)
        res.render('edit.html', {
            student: student
        })
    })
})

// 2.5 处理编辑学生
router.post('/students/edit', (req, res) => {
    Student.updateById(req.body, (err) => {
        if (err) return res.status(500).send('Server error')
        res.redirect('/students')
    })
})

// 2.6 处理删除学生
router.get('/students/delete', (req, res) => {
    Student.deleteById(req.query.id, (err) => {
        if (err) return res.status(500).send('Server error')
        res.redirect('/students')
    })
})

module.exports = router