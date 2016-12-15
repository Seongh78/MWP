var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  var mode, view='index';
  
  if(req.session.usr === undefined){
      res.redirect("/users/login");

  }else{
    var sql = "select P.pro_id as proId, P.pro_name as proName, P.pro_date as proDate from project P, team T where T.usr_id=? and P.pro_id=T.pro_id";

    connection.query(sql , req.session.usr.id , function(err, result) {
        res.render("index", {
                  mode: "Projects",
                  pro_name: "",
                  title: "Choose team",
                  projects: result,
                  usr: req.session.usr
        });//render

    }); // connection

  } // else

}); // router





module.exports = router;


