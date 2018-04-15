var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://jeffgoes:jeffgoes@ds061395.mlab.com:61395/todo');

//create a schema - like a blueprint
var todoSchema = new mongoose.Schema({
	item: String
});

//create database Model
var Todo = mongoose.model('Todo', todoSchema); 

/*TO ADD AN ITEM
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
	if(err){
		throw err;
	}
	else
		console.log('item saved');
});*/

//dummy data for testing
//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app){

	app.get('/todo', function(req, res){
		Todo.find({}, function(err, data){
			if(err) throw err;
			res.render('todo', {todos: data});
		});
	});

	app.post('/todo', urlencodedParser, function(req, res){
		var newTodo = Todo(req.body).save(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	});

	app.delete('/todo/:item', function(req, res){
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
			if (err) throw err;
			res.json(data);
		})

		/*data = data.filter(function(todo){
			return todo.item.replace(/ /g, '-') !== req.params.item;
		});
		res.json(data);*/
	});
};