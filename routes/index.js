var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');
/* GET home page. */
router.get('/', function(req, res, next) {
	var query = 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM boards';
		connection.query(query, function(err, rows) {
	  	console.log(rows);
	  	res.render('index', {
	  		title: 'はじめてのNode.js',
	  		boardList: rows 
	  	});
	  });
});

router.post('/',function(req, res, next){
	var title = req.body.title;
	var created_at = moment().format('YYYY-MM-DD HH:mm:ss');
	var query = 'INSERT INTO boards (title, created_at) VALUES ("' + title + '","' + created_at + '")';
	console.log(query);
	connection.query(query,function(err,rows){
		res.redirect('/');
	});
	console.log(title);
	console.log(created_at);
});
module.exports = router;
