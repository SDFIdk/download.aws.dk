var express = require('express');
var request = require('request');
var async = require('async');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Express' });
});

router.get('/licens', function(req, res) {
  res.render('licens');
});

router.get('/adresser', function(req, res) {
	async.parallel([
		function(callback) {
			request("https://api.dataforsyningen.dk/kommuner",function(error, response, body) {
  			callback(null,JSON.parse(body));
			});
		},
		function(callback) {
			request("https://api.dataforsyningen.dk/regioner",function(error, response, body) {
  			callback(null,JSON.parse(body));
			});
		}],
		function(err, result) {
			res.render('adresser', { kommuner: result[0], regioner: result[1], url: "https://api.dataforsyningen.dk/adresser" });
		});
});

router.get('/adgangsadresser', function(req, res) {
	async.parallel([
		function(callback) {
			request("https://api.dataforsyningen.dk/kommuner",function(error, response, body) {
  			callback(null,JSON.parse(body));
			});
		},
		function(callback) {
			request("https://api.dataforsyningen.dk/regioner",function(error, response, body) {
  			callback(null,JSON.parse(body));
			});
		}],
		function(err, result) {
			res.render('adgangsadresser', { kommuner: result[0], regioner: result[1], url: "https://api.dataforsyningen.dk/adgangsadresser" });
		});
});

router.get('/vejnavne', function(req, res) {
	async.parallel([
		function(callback) {
			request("https://api.dataforsyningen.dk/kommuner",function(error, response, body) {
  			callback(null,JSON.parse(body));
			});
		}],
		function(err, result) {
			res.render('vejnavne', { kommuner: result[0], url: "https://api.dataforsyningen.dk/vejstykker" });
		});
});

router.get('/supplerendebynavne', function(req, res) {
	async.parallel([
		function(callback) {
			request("https://api.dataforsyningen.dk/kommuner",function(error, response, body) {
  			callback(null,JSON.parse(body));
			});
		}],
		function(err, result) {
			res.render('supplerendebynavne', { kommuner: result[0], url: "https://api.dataforsyningen.dk/supplerendebynavne" });
		});
});

router.get('/postnumre', function(req, res) {
	res.render('postnumre', { url: "https://api.dataforsyningen.dk/postnumre" });
});

router.get('/om', function(req, res) {
	res.render('om');
});

module.exports = router;
