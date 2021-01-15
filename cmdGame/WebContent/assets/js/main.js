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

var game = new Phaser.Game(600, 450, Phaser.AUTO, null, {create:create});


function create ()
{
	console.log("create game");
	game.stage.backgroundColor = "#061F27";
	
	var cursors = this.input.keyboard.createCursorKeys();

	textStyle_info ={ font: "16px sans-serif", fill: "#46c0f9", align: "center" };
	textStyle_input_mark = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };
	textStyle_input = { font: "16px Courier", fill: "#fff"};
	textStyle_line = { font: "16px Courier", fill: "#ffff00"};
	
	this.add.text(10, 420, ":", textStyle_input_mark);
	this.add.text(470, 0, "ABOUT JOOMAL", textStyle_info);
	
	var textEntry = this.add.text(20,420, '', textStyle_input);
	var recentInput = "";

    this.input.keyboard.addCallbacks(this, null, null, function(char) {
    	var event = char.charCodeAt();
    	
    	if(event == 13) {
    		recentInput = textEntry.text;
    		textEntry.text = '';
    		console.log("input: "+recentInput);
    		make_line(recentInput);
    	}
    	else {
    		textEntry.text += char;
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

function moveUpEntries() {
	
	for (var i = 0; i < (entryArray.mark).length; i++) {
		console.log("entry mark : "+entryArray.mark[i]);
		(entryArray.mark[i]).y -= 20;
		(entryArray.content[i]).y -= 20;
	}
}

function make_line(recentInput) {	
	textStyle_input = { font: "16px Courier", fill: "#fff"};
	textStyle_comm = { font : "16px Courier", fill: "#50BCDF"};
	
	var comm = command(recentInput);
	
	printUserInput(recentInput);
	printCommand(comm);
}

function printUserInput(recentInput) {
	line += 1;
	input_line += 1;
	
	textStyle_input = { font: "16px Courier", fill: "#fff"};
	textStyle_line = { font: "16px Courier", fill: "#ffff00"};
	
	var markEntry = game.add.text(10, line_h*line, input_line, textStyle_line);
	var userInputEntry = game.add.text(20, line_h*line, recentInput, textStyle_input);
	
	(entryArray.mark).push(markEntry);
	(entryArray.content).push(userInputEntry);
}

function printCommand(comm) {
	line += 1;
	
	textStyle_comm = { font : "16px Courier", fill: "#50BCDF"};
	textStyle_line = { font: "16px Courier", fill: "#ffff00"};
	
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
	var command_list = "/help /stack /goal /clear";
	var temp_line = line+1;
	
	if(recentInput == " /help") {
		return command_list;
	}
	else if(recentInput == " /stack") {
		return "c/c++, python, java, jsp, mysql/oracle, linux";
	}
	else if(recentInput == " /goal") {
		return "Studying for Backend Developer, Living for mindful life";
	}
	else if(recentInput == " /joomal") {
		return "Hello world!";
	}
	else if(recentInput == " /clear") {
		clear();
	}
	else {
		return "unvalid command. check commands list with '/help'";
	}
}

var MAX_WIDTH = 30;
function clear() {
	this.scene.restart();
}