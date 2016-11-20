var express = require('express');
var moment = require('moment');
var router = express.Router();
var connection = require('../mysqlConnection');

router.get('/:board_id', function(req, res, next) {
	var boardId = req.params.board_id;
  var query = 'SELECT * FROM boards WHERE board_id = ' + boardId;
  var msgquery = 'SELECT * FROM messages WHERE board_id = ' + boardId	
  connection.query(query, function(err, board) {
  	connection.query(msgquery,function(err,msgs_row){
	    res.render('boards', {
	      title: board[0].title,
	      board: board[0],
	      messages:msgs_row
	    });
	});
  });
});

router.post('/:board_id',function(req,res,next){
	var message = req.body.message;
	var created_at = moment().format('YYYY-MM-DD HH:mm:ss');
	var query = 'INSERT INTO messages (message, board_id, created_at) VALUES ("' + message + '", ' + '"' + req.params.board_id + '", ' + '"' + created_at + '")';
	connection.query(query, function(err, rows) {
	  res.redirect('/boards/' + req.params.board_id);
	});
});
module.exports = router;