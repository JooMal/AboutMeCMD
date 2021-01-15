var game = new Phaser.Game(600, 450, Phaser.AUTO, null, {preload:preload, create:create});
var textStyle_info ={ font: "16px sans-serif", fill: "#46c0f9", align: "center" };
var textStyle_input_mark = { font: "bold 16px sans-serif", fill: "#fff", align: "center" };
var textStyle_input = { font: "16px Courier", fill: "#fff"};
var textStyle_line_mark = { font: "16x Courier", fill: "#ffff00"};
var textStyle_comm_mark = { font: "16x Courier", fill: "#50BCDF"};
var textStyle_comm = { font: "14px Courier", fill: "#ffff00"};
var textEntry;
var line_h = 20;
var line = 0;
var input_line = 0;
var MAX_LINE_NUM = 20;
var entryArray = {
	mark : [],
	content : []
}


function preload() {
	game.load.image("logo", "assets/images/logo.jpg");
	game.load.image("inputBox", "assets/images/cmdGameInputBox.jpg");
}

function create ()
{
	console.log("---create cmd starts---");
	game.stage.backgroundColor = "#061F27";
	
	var cursors = this.input.keyboard.createCursorKeys();

	game.add.image(0,420,"inputBox");
	this.add.text(10, 420, ":", textStyle_input_mark);
	this.add.text(470, 0, "ABOUT JOOMAL", textStyle_info); // if fail to load logo image, this text will be displayed
	game.add.image(0,0,"logo");
	
	get_keys();
}

function get_keys() {
	var recentInput = "";
	
	textEntry = game.add.text(30,425, '', textStyle_input);
    game.input.keyboard.addCallbacks(this, null, null, function(char) {   
    	var event = char.charCodeAt();
    	
    	if(event == 13) {
    		textEntry.text = '';
    		make_line(recentInput);
    		drawInputBox();
    		recentInput = "";
    		return;
    	}
    	if(event == 92) {
    		recentInput = recentInput.substring(0, recentInput.length-1);
    		textEntry.text = recentInput;
    	}
    	else {
    		recentInput += char;
    		textEntry.text = recentInput;
    	}
    });
}

function drawInputBox() {
	game.add.image(0,420,"inputBox");
	game.add.text(10, 420, ":", textStyle_input_mark);
	game.add.image(0,0,"logo");
	textEntry = game.add.text(30,425, '', textStyle_input);
}

function moveUpEntries() {
	for (var i = 0; i < (entryArray.mark).length; i++) {
		(entryArray.mark[i]).y -= line_h;
		(entryArray.content[i]).y -= line_h;
	}
}

function make_line(recentInput) {		
	var comm = command(recentInput);
	
	printUserInput(recentInput);
	printCommand(comm);
}

function printUserInput(recentInput) {
	if(line < MAX_LINE_NUM) line += 1;
	input_line += 1;
	
	var markEntry = game.add.text(10, line_h*line, input_line, textStyle_line_mark);
	var userInputEntry = game.add.text(30, line_h*line, recentInput, textStyle_input);
	
	(entryArray.mark).push(markEntry);
	(entryArray.content).push(userInputEntry);
}

function printCommand(comm) {
	line += 1;
	
	var markEntry = game.add.text(10, line_h*line, ">", textStyle_comm_mark);
	var commInputEntry = game.add.text(20, line_h*line, comm, textStyle_comm);	
	
	(entryArray.mark).push(markEntry);
	(entryArray.content).push(commInputEntry);
	
	if(line >= MAX_LINE_NUM) {
		console.log("display is full. move up entries");
		moveUpEntries();
	}
}

function clear() {
	for (var i = 0; i < (entryArray.mark).length; i++) {
		(entryArray.mark[i]).text = '';
		(entryArray.content[i]).text = '';
	} 
	line = -2;
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
