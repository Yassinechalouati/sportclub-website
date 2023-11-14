const express = require('express');
const router = express.Router()
const mysql = require('../Sql_connection')


// Sign-up endpoint
router.post('/modify', (req, res) => {
  const Customer_name = req.body.nomAd;
  const profile_pic = req.body.image;
  const prenom = req.body.prenomAd;
  const sport = req.body.sport;
  const date = req.body.date;
  const tel = req.body.tel;
  const oldNumb = req.body.Numb
 
  if (Customer_name !== '' && profile_pic !== '' && prenom !== '' & sport !=='' & date !=='' & tel !=='') {
   
    mysql.query('SELECT * FROM adhérent where num =? OR prenomAd= ?', [tel, prenom], (err, resu) => {
        if (err) {
            console.error('Error', err);
        res.status(500).json({ message: 'Internal server error' });
        }
        else if (resu.length > 0) {
            console.log(resu)
            if (resu[0].num == tel ){
                res.json({message:"tel Exists"})
            }

            else if (resu[0].prenomAd == prenom) {
                res.json({message:"prenom exists"})
            }
        }
        
        else {
            mysql.query('SELECT * FROM adhérent where num=?', [oldNumb], (err, results) => {
                if (err) {
                  console.error('Error', err);
                  res.status(500).json({ message: 'Internal server error' });
                } else if (results.length > 0)  {
                  mysql.query('UPDATE adhérent SET nomAd = ?, prenomAd= ?, dateN = ?, sportPrinciplae= ?, image= ?, num=? WHERE num=?', [Customer_name, prenom, date, sport, profile_pic, tel, oldNumb  ], (err, results) => {
                      if (err) {
                          console.error('Error', err);
                          res.status(500).json({ message: 'Internal server error' });
                      }
                      else {
                          res.json({message:"Succes"})
                      }
                  })
                }
                
              })
        }
    })
    

  }
})
  
module.exports = router
  