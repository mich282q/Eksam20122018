var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
mongo = require('mongodb')
var url = "mongodb://localhost:27017/";

router.get('/', function(req, res, next) {
    res.render('redigerkonti', { title: 'Crypto Bank' });
  }); 


 /* Post requests opretter en ny konti */
 router.post('/put', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("CryptoBank");
      var bruger_id = Number(req.body.bruger_id);
      var oldValues = {bruger_id:bruger_id}
      var newValues={$set: {bruger_id: req.body.bruger_id, kontonummer: req.body.kontonummer, valutatype: req.body.valutatype, transaktion: req.body.transaktion, saldo: Number(req.body.saldo)}}
    
        dbo.collection("konti").updateOne(oldValues, newValues, function (err, res) {
        if (err) throw err;
        console.log("1 konti er oprettet");
        db.close();
      });
      res.redirect("/cryptokonti");
    });
  }); 
  module.exports = router;