var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/topic/:id', function(req, res, next) {
    var teamId = req.params.id;
    var team = {};

    for(var a = 0; a<teams.length; a++){
        if(teams[a].id == teamId){
            team = teams[a];
        }
    }

    res.render('index', {
        mode: 'Topic',
        pro_name: team.title,
        title: ""
    });

});


router.get('/add' , function(req, res, next){
    res.render('index',{
        mode: "AddProject",
        pro_name: "JANDI",
        title: "프로젝트 생성"
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


/**
 * Created by KIM-ATIV on 2016-12-13.
 */
