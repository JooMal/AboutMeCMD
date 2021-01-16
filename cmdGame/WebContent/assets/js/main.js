class Queue {
  constructor() {
	    this._arr = [];
	  }
	  enqueue(item) {
	    this._arr.push(item);
	  }
	  dequeue() {
	    return this._arr.shift();
	  }
	  size() {
		  return this._arr.length;
	  }
}

var game = new Phaser.Game(600, 450, Phaser.AUTO, null, {preload:preload, create:create});

function preload() {
	game.load.image("logo", "assets/images/logo.jpg");
	game.load.image("inputBox", "assets/images/cmdGameInputBox.jpg");
}
function create ()
{
	console.log("create game");
	game.stage.backgroundColor = "#061F27";
	
	var cursors = this.input.keyboard.createCursorKeys();

	textStyle_info ={ font: "16px sans-serif", fill: "#46c0f9", align: "center" };
	textStyle_input_mark = { font: "bold 16px sans-serif", fill: "#fff", align: "center" };
	textStyle_input = { font: "16px Courier", fill: "#fff"};
	textStyle_line = { font: "14x Courier", fill: "#ffff00"};
	
	console.log("420");
	game.add.image(0,420,"inputBox");
	this.add.text(10, 420, ":", textStyle_input_mark);
	this.add.text(470, 0, "ABOUT JOOMAL", textStyle_info); // if fail to load logo image, this text will be displayed
	game.add.image(0,0,"logo");
	
	get_keys();
}

var textEntry;
function get_keys() {
	//var textEntry = game.add.text(30,425, '', textStyle_input);
	var recentInput = "";
	
	textEntry = game.add.text(30,425, '', textStyle_input);
    game.input.keyboard.addCallbacks(this, null, null, function(char) {   
    	var event = char.charCodeAt();
    	
    	if(event == 13) {
    		//recentInput = textEntry.text;
    		textEntry.text = '';
    		console.log("input: "+recentInput);
    		make_line(recentInput);
    		drawInputBox();
    		recentInput = "";
    		return;
    	}
    	if(event == 92) {
    		console.log("delete");
    		recentInput = recentInput.substring(0, recentInput.length-1);
    		textEntry.text = recentInput;
    	}
    	else {
    		console.log(event);
    		recentInput += char;
    		textEntry.text = recentInput;
    		//textEntry.text += char;
    	}
    });
}

var line_h = 20;
var line = 0;
var input_line = 0;

var input_history = [];
var MAX_Q_LEN = 20;

var entryArray = {
	mark : [],
	content : []
}

function drawInputBox() {
	textStyle_input_mark = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };
	game.add.image(0,420,"inputBox");
	game.add.text(10, 420, ":", textStyle_input_mark);
	game.add.image(0,0,"logo");
	textEntry = game.add.text(30,425, '', textStyle_input);
}

function moveUpEntries() {
	for (var i = 0; i < (entryArray.mark).length; i++) {
		console.log("entry mark : "+entryArray.mark[i]);
		(entryArray.mark[i]).y -= line_h;
		(entryArray.content[i]).y -= line_h;
	}
}

function make_line(recentInput) {	
	textStyle_input = { font: "14px Courier", fill: "#fff"};
	textStyle_comm = { font : "14px Courier", fill: "#50BCDF"};
	
	var comm = command(recentInput);
	
	printUserInput(recentInput);
	printCommand(comm);
}

function printUserInput(recentInput) {
	if(line < MAX_Q_LEN) line += 1;
	input_line += 1;
	
	textStyle_input = { font: "16px Courier", fill: "#fff"};
	textStyle_line = { font: "14px Courier", fill: "#ffff00"};
	
	var markEntry = game.add.text(10, line_h*line, input_line, textStyle_line);
	var userInputEntry = game.add.text(30, line_h*line, recentInput, textStyle_input);
	
	(entryArray.mark).push(markEntry);
	(entryArray.content).push(userInputEntry);
}

function printCommand(comm) {
	line += 1;
	
	textStyle_comm = { font : "14px Courier", fill: "#50BCDF"};
	textStyle_line = { font: "14px Courier", fill: "#ffff00"};
	
	var markEntry = game.add.text(10, line_h*line, ">", textStyle_comm);
	var commInputEntry = game.add.text(20, line_h*line, comm, textStyle_line);	
	
	(entryArray.mark).push(markEntry);
	(entryArray.content).push(commInputEntry);
	
	if(line >= MAX_Q_LEN) {
		console.log("display is full. move up entries");
		moveUpEntries();
	}
}

function command(recentInput) {
	var command_list = "you can use : /help /stack /goal /hello /clear";
	var temp_line = line+1;
	
	if(recentInput == "/help") {
		return command_list;
	}
	else if(recentInput == "/stack") {
		return "c/c++, python, java, jsp, mysql/oracle, linux";
	}
	else if(recentInput == "/goal") {
		return "Studying for Backend Developer, Living for mindful life";
	}
	else if(recentInput == "/joomal") {
		return "me!";
	}
	else if(recentInput == "/hello") {
		return "Hello world!";
	}
	else if(recentInput == "/clear") {
		clear();
	}
	else {
		return "unvalid command. check commands list with '/help'";
	}
}

function clear() {
	for (var i = 0; i < (entryArray.mark).length; i++) {
		console.log("entry mark : "+entryArray.mark[i]);
		(entryArray.mark[i]).text = '';
		(entryArray.content[i]).text = '';
	} 
	line = -2;
}