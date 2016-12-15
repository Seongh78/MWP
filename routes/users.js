var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
	
	/*var sql = "select * from users where usr_id= ? and usr_pwd= ?";
	connection.query(sql , ['admin01', '123123'], function(err,result) {
		sql ="select P.pro_id as proId, P.pro_name as proName, P.pro_date as proDate, P.pro_img as proImg from project P, team T where T.usr_id=? and P.pro_id=T.pro_id";
		connection.query(sql,);
		req.session.usr = result[0];
		res.redirect('/');
	});*/
	res.render('login');
});

router.post('/login' , function(req, res, next) {
	var access=false;
	var usr = {
		id : req.body.usr_id,
		pwd: req.body.usr_pwd
	}
	var sql = [
		"select * from users where usr_id= ? and usr_pwd= ?",
		"select P.pro_id as proId, P.pro_name as proName, P.pro_date as proDate, P.pro_img as proImg from project P, team T where T.usr_id=? and P.pro_id=T.pro_id"
	];
	// console.log("user id: "+usr.id);
	connection.query(sql[0], [usr.id , usr.pwd], function (err, result) {

		// body...
		if(result[0] !== undefined){
			connection.query(sql[1], result[0].usr_id, function(err, projectList) {
			     req.session.usr = {
				id : result[0].usr_id,
				name: result[0].usr_name,
				img: result[0].usr_img != undefined ? result[0].usr_img : "data:image/png;base64,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",
				projects: projectList
			     }; // session
			access= true;
			res.send( { result : access } );
			}); //connection

		}else{
			res.send( { result : access } );
		}
	});
});


router.get('/logout' , function (req, res, next) {
	req.session.destroy(function (err) {
		if (err) {
			console.log("Err: "+err);
		}
		res.redirect('/');
	});
});


router.get('/join' , function (req, res, next) {
	res.end("join");
});

router.post('/join' , function (req, res, next) {
	res.end("join ok");
});


router.get('/members', function (req, res, next) {
	var sql = "select U.usr_id as id, U.usr_img as img, U.usr_name as name from team T, users U where T.pro_id=1 and U.usr_id=T.usr_id";
	connection.query(sql, req.session.seletProject, function(err, mList) {
		res.send(mList);
	});
});

router.get('/find/:findid', function (req, res, next) {
	var finduser = req.params.findid;
	var sql = "select * from users where usr_id like '%"+finduser+"%'";
	connection.query(sql , function (err, findList) {
		res.json(findList);
	});
});

router.post('/request', function (req, res, next) {
	var rid = req.body.rid;
	var pid = req.session.selectProject;

	var sql= "insert into request(req_team, req_type, req_usr) values(?,'X',?)";
	connection.query(sql, [pid,rid], function (err) {
		res.send( { result:"OK" } );
	});

});




module.exports = router;
