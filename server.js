const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');

const app = express();

var comments = [];
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/pages/searchproject', function(req,res,next) {
    console.log('In searchproject');
    var myRe = new RegExp("^" + req.query.q, 'g');
    console.log(myRe);
    let rawdata = fs.readFileSync('projects.json');
    let projects = JSON.parse(rawdata);
    console.log(projects.length);
        var jsonresult = [];
        for(var i = 0; i < projects.length; i++) {
          var result = projects[i].title.search(myRe);
          if(result != -1) {
            jsonresult.push({id: projects[i].id, title:projects[i].title});
          }
        }
        res.status(200).json(jsonresult);
    return;
});

app.get('/pages/listprojects', function(req,res,next) {
    console.log('In listproject');
    let rawdata = fs.readFileSync('projects.json');
    let projects = JSON.parse(rawdata);
        var jsonresult = [];
        for(var i = 0; i < projects.length; i++) {
            jsonresult.push({id: projects[i].id, title:projects[i].title});
        }
        res.status(200).json(jsonresult);
    return;
});

app.get('/pages/loadproject', function(req,res,next) {
    console.log('In loadproject');
    var myRe = new RegExp("^" + req.query.q, 'g');
    console.log(myRe);
    let rawdata = fs.readFileSync('projects.json');
    let projects = JSON.parse(rawdata);
        var jsonresult = [];
        for(var i = 0; i < projects.length; i++) {
          var result = projects[i].id.search(myRe);
          if(result != -1) {
            jsonresult.push({title:projects[i].title, desc:projects[i].desc,
              imgurl:projects[i].imageurl, difficulty:projects[i].difficulty});
          }
        }
        res.status(200).json(jsonresult);
    return;
});

app.post('/pages/submitcomment', function(req, res) {
    console.log("In Submit Comment");
    console.log(req.body);
    comments.push(req.body);
    res.end('{"success" : "Submitted Successfully", "status" : 200}');
}); 

app.get('/pages/loadcomments', function(req, res,) {
    console.log("In loadcomments");
    var jsonresult = [];
    for(var i = 0; i < comments.length; i++) {
            jsonresult.push({name: comments[i].name, comment: comments[i].comment, number: i});
        }
        res.status(200).json(jsonresult);
    return;
});

app.delete('/pages/resolvecomment', function(req, res) {
    console.log("In resolve comment");
    var i = req.query.q;
    console.log(i);
    if(i == -1) {
        comments = [];
    }
    else {
        comments.splice(i, 1);
    }
    res.end('{"success" : "Resolved Successfully", "status" : 200}');
}); 

app.listen(4205, () => console.log('Server listening on port 4205!'));