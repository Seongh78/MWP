var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/topics', function(req, res, next) {
    var sql = "select T.top_contents as contents, T.top_id as id, T.top_date as date, U.usr_name as usrName, U.usr_img as usrImg from topic T, users U where T.pro_id=? and T.usr_id=U.usr_id order by T.top_date desc";
    console.log("selector: "+req.session.selectProject);
    connection.query(sql, req.session.selectProject, function (err, topics) {
        res.send(topics);
    });
});



router.post('/insert', function(req, res, next) {
    var txt = req.body.txt;
    var sql = "insert into topic(pro_id, top_contents, top_type, top_date, usr_id) values(?,?,'text',now(),?)";
    // console.log(txt);

    connection.query(sql, [req.session.selectProject, txt, req.session.usr.id], function (err) {
        // body...
        // sql = "select * from topic where pro_id";
        res.send( {result:true} );
    });
});

router.get('/view/:id' , function(req, res, next) {
    // body...
    var viewid = req.params.id;
    var sql = "select T.top_contents as contents, T.top_date as date, U.usr_name as usrName, U.usr_img as usrImg from topic T, users U where T.top_id=? and T.usr_id=U.usr_id order by T.top_date desc"
    connection.query(sql, viewid, function(err, viewTopic) {
        res.render('index', {
            mode: 'ViewTopic',
            pro_name: "req.params.name",
            // pro_img:teamId,
            title: "댓글",
            viewTopic: viewTopic,
            usr: req.session.usr
        });
    });
});


module.exports = router;