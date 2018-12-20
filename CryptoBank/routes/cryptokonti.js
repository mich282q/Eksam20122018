var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
mongo = require('mongodb');

/* Viser konti som JSON */
router.get('/json', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("CryptoBank");
      dbo.collection("konti").find({}).toArray(function (err, result) {
        if (err) throw err;
     
        var obj = {};
        obj.cryptokonti = result;
        res.json(obj);
        db.close();
      });
    });
  });

    /* Viser konti som en HTML side */
router.get('/', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("CryptoBank");
      dbo.collection("konti").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        var obj = {};
        obj.cryptokonti = result;
        res.render('cryptokonti', obj);
        db.close();
      });
    });
  });

   /* Post requests opretter en ny konti */
router.post('/json', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("CryptoBank");
      var cryptokonti = {};
      cryptokonti.bruger_id = req.body.bruger_id;
      cryptokonti.kontonummer = req.body.kontonummer;
      cryptokonti.valutatype = req.body.valutatype;
      cryptokonti.transaktion = req.body.transaktion;
      cryptokonti.saldo = Number(req.body.saldo);// burder være parseInt eller parseDouble (req.body.usernameId) for det bliver lavet til en String nu
  
      console.log("konti er oprettet ") ;
      dbo.collection("konti").insertOne(cryptokonti, function (err, res) {
        if (err) throw err;
        console.log("1 konti er oprettet");
        db.close();
      });
      res.redirect("/cryptokonti/json");
    });
  });  
  router.post('/delete/:id', function (req, res) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("CryptoBank");
    var id = req.params.id;
    dbo.collection("konti").deleteOne({ _id: new mongo.ObjectId(id) }, function (err, results) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  
    //res.json({ success: id })
    res.redirect("/cryptokonti");
  });
  });
module.exports = router;