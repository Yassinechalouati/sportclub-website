const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const mysql = require('../Sql_connection')

router.post('/delete', (req, res) => {

    const number = req.body.Numb

    mysql.query('SELECT * FROM adhérent where num =? ', [number], (err, results) => {
        if (err) {
            console.log(err)
            res.json({message: "Internal Server Error"})
        }
        else if (results.length > 0) {
            mysql.query('DELETE FROM adhérent WHERE num = ?;', [number], (err, result) => {
                if (err) {
                    console.log(err)
                }
                else{
                    res.json({message:"Deleted"})
                }
            })
        }
    })
      
})


module.exports = router