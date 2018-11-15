/**
 * student.js
 * 功能分析：
 *    根据功能要求操作项目所需数据
 */

var fs = require('fs')

var dbPath = './db.json'

/**
 * 获取学生列表
 */
exports.find = function(callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return callback(err)

        callback(null, JSON.parse(data).students)
    })
}

/**
 * 根据 id 获取学生信息对象
 */
exports.findById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return callback(err)

        var students = JSON.parse(data).students
        var ret = students.find(item => {
            return item.id === parseInt(id)
        })

        callback(null, ret)
    })
}

/**
 * 添加保存学生
 */
exports.save = function(student, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return callback(err)
        var students = JSON.parse(data).students

        if (students.length == 0) {
            student.id = 1
        } else {
            student.id = parseInt(students[students.length - 1].id) + 1
        }

        students.push(student)

        var fileData = JSON.stringify({
            students: students
        })

        fs.writeFile(dbPath, fileData, err => {
            if (err) return callback(err)
            callback(null)
        })
    })
}

exports.updateById = function(student, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return callback(err)

        var id = parseInt(student.id)
        var students = JSON.parse(data).students
        var ret = students.find(item => {
            return item.id === id
        })
        for (var key in student) {
            ret[key] = student[key]
        }
        ret.id = parseInt(student.id)
        console.log(students)

        var fileData = JSON.stringify({
            "students": students
        })
        console.log(fileData)
        fs.writeFile(dbPath, fileData, err => {
            if (err) return callback(err)
            callback(null)
        })
    })
}

exports.deleteById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return callback(err)

        var students = JSON.parse(data).students

        var deleteId = students.findIndex(item => {
            return item.id === parseInt(id)
        })

        console.log(deleteId)

        students.splice(deleteId, 1)
        console.log(students)

        var fileData = JSON.stringify({
            "students": students
        })
        fs.writeFile(dbPath, fileData, err => {
            if (err) return callback(err)
            callback(null)
        })
    })
}