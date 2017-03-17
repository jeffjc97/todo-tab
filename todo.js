// chrome.storage.sync.get(null, function (data) { console.info(data) });
// chrome.storage.sync.clear()

var todos;

$(document).ready(function() {
	populateTodo();
	registerHandlers();
});

function registerHandlers() {
	$('.todo-input').on('keyup', function (e) {
		if (e.keyCode == 13) {
			v = $('.todo-input').val();
			$('.todo-input').val("");
			createTodo(v);
		}
	});

	$(document).on('click', '.todo-toggle', function() {
		$(this).toggleClass("fa-square-o fa-check-square-o");
		completeTodo($('li').index($(this).parent()));
		$(this).parent().fadeOut(500, function() {
			$(this).remove();
		});
	});
}

function populateTodo() {
	chrome.storage.sync.get('todos', function(result) {
		todos = result['todos'];
		if (todos === undefined) {
			todos = [];
			chrome.storage.sync.set({'todos':[]});
		}
		todos.forEach(function(i) {
			appendTodo(i);
		});
	});
}

function prependTodo(v) {
	t = $('.dummy').clone();
	t.removeClass('dummy').find('.todo-text').text(v);
	$('.todo-list').prepend(t);
	t.show();
}

function appendTodo(v) {
	t = $('.dummy').clone();
	t.removeClass('dummy').find('.todo-text').text(v);
	$('.todo-list').append(t);
	t.show();
}

function createTodo(v) {
	if (v.length) {
		todos.unshift(v);
		chrome.storage.sync.set({'todos': todos});
		prependTodo(v);
	}
}

function completeTodo(i) {
	todos.splice(i, 1);
	chrome.storage.sync.set({'todos': todos});
}