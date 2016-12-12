var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', {
          mode: 'topic',
          title: "Topic"
  });

});

module.exports = router;
