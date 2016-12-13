var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  var mode;
  if(req.session.user === undefined){
      mode = "Login";
  }else{
      mode = "Projects";
  }

  res.render('index', {
            mode: "Projects",
            pro_name: "",
            title: "Choose team",
            projects: teams
  });

});


var teams = [
    {
        "id" : "team01",
        "title" : "IOS 프로젝트",
        "discription" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    },
    {
        "id" : "team02",
        "title" : "Android 프로젝트",
        "discription" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    }
];


module.exports = router;


