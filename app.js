var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'))

.use(express.cookieParser())
.use(express.session({secret: 'todotopsecret'}))
.use(express.bodyParser())

.use(function(req, res, next) {
	if(!req.session.todos)
		req.session.todos = [];
	next();
})
.get('/', function(req, res) {
	res.render('todo.ejs', {todos: req.session.todos});
})
.get('/supprimer/:id', function(req, res) {
	req.session.todos.splice(req.params.id, 1);
	res.redirect('/');
})
.post('/ajouter', function(req, res) {
	if(req.body.task)
		req.session.todos.push(req.body.task);
	res.redirect('/');
});

app.listen(8080);