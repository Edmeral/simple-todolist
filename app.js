var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

var PORT = process.env.PORT || 8080;

var placeholders = ['Wash the dishes', 'Pick up the milk', 'Watch all seasons of GOT in one day',
	'Build the next Facebook', 'Learn how to tap dance', 'Learn Ninjutsu', 'Master Rasengan', 'Kill Madara'
];

app.use(express.static(__dirname + '/public'))

	.use(cookieParser())
	.use(session({
		secret: 'todotopsecret',
		saveUninitialized: true,
    resave: true,
	}))
	.use(bodyParser.urlencoded({ extended: true }))

.use(function(req, res, next) {
	if (!req.session.todos)
		req.session.todos = [];
	next();
})
	.get('/', function(req, res) {
		var placeholder = placeholders[Math.floor(Math.random() * placeholders.length)]; // Getting a random todo entry
		res.render('todo.ejs', {
			todos: req.session.todos,
			placeholder: placeholder
		});
	})
	.get('/supprimer/:id', function(req, res) {
		req.session.todos.splice(req.params.id, 1);
		res.redirect('/');
	})
	.post('/ajouter', function(req, res) {
		if (req.body.task)
			req.session.todos.push(req.body.task);
		res.redirect('/');
	});

app.listen(PORT);
console.log("Magic at http://localhost:" + PORT);