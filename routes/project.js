var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/topic/:id/:name', function(req, res, next) {
    var teamId = req.params.id;
    var sql = "select * from topic T, project P where T.pro_id=? and P.pro_id";

    connection.query(sql , teamId , function(err, topics) {
        // body...
        console.log("New select id : "+ teamId);
        req.session.selectProject=teamId;
        console.log("New select project id : "+ teamId);
        res.render('index', {
            mode: 'Topic',
            pro_name: req.params.name,
            pro_img:teamId,
            title: "",
            topics: topics,
            usr: req.session.usr
        });
    });

});


router.get('/add' , function(req, res, next){
    res.render('index',{
        mode: "AddProject",
        pro_name: "JANDI",
        title: "프로젝트 생성",
        usr: req.session.usr
    });
});


router.post('/add' , function(req, res, next) {
    if( !req.files ){
            console.log("No files");
    }

    var proImg, filename, gettime=new Date(), addid;
    var newProject = {
        name : req.body.project_name,
        description: req.body.description
    }
    var sql = [
        "insert into project(pro_name, pro_description, pro_img, pro_date) values(?,?,?, now())",
        "insert into team(pro_id, usr_id, tm_part) values(?, ?, ?)"
    ];
    
    //파일명 생성
    proImg =req.files.projectImgFile;
    filename = proImg.name;
    addid = gettime.getTime();
    filename = "public/uploadFile/project-images/"+addid+"-"+filename; 

    var inst = [newProject.name, newProject.description, filename];
    connection.query(sql[0], inst, function(err, insertId) {
        

        // console.log("insert id : "+insertId.pro_id);
        // console.log(insertId.insertId);
        // console.log(JSON.stringify(insertId));
        
        connection.query(sql[1], [ insertId.insertId, req.session.usr.id, "개발" ], function(err) {
                if(err){
                    console.log("Project upload Err: "+err);
                    res.send({ "result" : "ERROR" });
                }else{
                    proImg.mv(filename , function(err) {
                        if(err){
                            console.log("File Upload Err : "+err);
                            res.send({ "result" : "failed" });
                        }else{
                            console.log("File upload Success!");
                            res.send( { "result" : filename } );
                        }
                    });
                }//else
        });//connection

    });//connection



});









module.exports = router;


/**
 * Created by KIM-ATIV on 2016-12-13.
 */
