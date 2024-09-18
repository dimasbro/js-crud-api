const express = require('express')
const app = express()
const conn = require('./config/db')

app.use(express.json())

app.get('/get-mahasiswa', function(req, res) {
    const queryStr = 'select * from mahasiswa where deleted_at is null'
    conn.query(queryStr, (err, results) => {
        if (err) {
            console.log(err)
            res.error(err.sqlMessage, res)
        } else {
            res.status(200).json({
                'sucsess': true,
                'message': 'Sukses menampilkan data',
                'data': results
            })
        }
    })
})

app.post('/store-mahasiswa', function(req, res) {
    const param = req.body
    const name = param.name
    const jurusan = param.jurusan
    const now = new Date()

    const queryStr = 'insert into mahasiswa(name, jurusan, created_at) values(?,?,?)'
    const values = [name, jurusan, now]

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                'success': false,
                'message': err.sqlMessage,
                'data': null
            })
        }  else {
            res.status(200).json({
                'success': true,
                'message': 'Sukses menyimpan data',
                'data': results
            })
        }
    })
})

app.get('/get-mahasiswa-by-id/:id', function(req, res) {
    const {id} = req.params

    const queryStr = 'select * from mahasiswa where id=? and deleted_at is null'
    const values = [id]

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                'success': false,
                'message': err.sqlMessage,
                'data': null
            })
        }  else {
            res.status(200).json({
                'success': true,
                'message': 'Sukses menampilkan data',
                'data': results
            })
        }
    })
})

app.put('/update-mahasiswa/:id', function(req, res) {
    const param = req.body
    const {id} = req.params
    const name = param.name
    const jurusan = param.jurusan

    const queryStr = 'update mahasiswa set name=?, jurusan=? where id=? and deleted_at is null'
    const values = [name, jurusan, id]

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                'success': false,
                'message': err.sqlMessage,
                'data': null
            })
        }  else {
            res.status(200).json({
                'success': true,
                'message': 'Sukses update data',
                'data': results
            })
        }
    })
})

app.delete('/delete-mahasiswa/:id', function(req, res) {
    const {id} = req.params
    const now = new Date()

    const queryStr = 'update mahasiswa set deleted_at=? where id=? and deleted_at is null'
    const values = [now, id]

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                'success': false,
                'message': err.sqlMessage,
                'data': null
            })
        }  else {
            res.status(200).json({
                'success': true,
                'message': 'Sukses update data',
                'data': results
            })
        }
    })
})

app.listen(3000)