var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* 在主页获取新闻时的请求 */
router.get('/', function(req, res, next) {
  var newstype= req.query.newstype;

    var connection=mysql.createConnection({
        host:'localhost',

        user:'root',
        password:'',
        database:'baidunews'
    });

    connection.connect();

    connection.query('select * from `news` where `newstype`=?',[newstype], function(err, rows, fields) {
        if (err) throw err;

        //console.log('The solution is: ', rows[0].solution);
        console.log('查询结果：',rows);
        res.json(rows);
    });
});

module.exports = router;
