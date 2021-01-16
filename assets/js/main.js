var textEntry;
var line_h = 20;
var line = 0;
var input_line = 0;
var MAX_LINE_NUM = 20;
var firstStart = true;
var entryArray = {
	mark : [],
	content : []
};

/*
 * ------------------- User Variables -------------------
 * textStyle_info : fail_load_logo_message의 textStyle
 * textStyle_input_mark : 유저 input 앞에 붙는 마크(:)의 textStyle
 * textStyle_input : cmd창 하단에 타이핑되는 text의 textStyle
 * textStyle_line_mark : 입력 후 cmd창에 추가되는 line의 line number의 textStyle
 * textStyle_comm_mark : input의 응답으로 나타나는 command mark(>)의 textStyle
 * textStyle_comm : input의 응답으로 나타나는 command의 textStyle
 * */
// textStyles
var textStyle_info ={ font: "16px sans-serif", fill: "#46c0f9", align: "center" };
var textStyle_input_mark = { font: "bold 16px sans-serif", fill: "#fff", align: "center" };
var textStyle_input = { font: "16px Courier", fill: "#fff"};
var textStyle_line_mark = { font: "16x Courier", fill: "#ffff00"};
var textStyle_comm_mark = { font: "16x Courier", fill: "#50BCDF"};
var textStyle_comm = { font: "14px Courier", fill: "#ffff00"};

// context and messages
var logo_img_context = "assets/images/logo.jpg";
var inputBox_context = "assets/images/cmdGameInputBox.jpg";
var start_message = "HELLO!";
var start_message_output = "welcome! type /HELP for information!";
var fail_load_logo_message = "ABOUT JOOMAL";
var cmd_backgroundColor = "#061F27";
/* ------------------- User Variables ------------------- */

var config = {
		type: Phaser.AUTO,
		width : 600,
		height : 450,
		backgroundColor: cmd_backgroundColor,
		scene: {
			preload: preload,
			create: create
		}
};

var game = new Phaser.Game(config);

function preload() {
	this.load.image("logo", logo_img_context);
	this.load.image("inputBox", inputBox_context);
}

function create ()
{
	var cursors = this.input.keyboard.createCursorKeys();

	this.add.image(300,430,"inputBox");
	this.add.text(10, 420, ":", textStyle_input_mark);
	this.add.text(470, 0, fail_load_logo_message, textStyle_info); // if fail to load logo image, this text will be displayed
	this.add.image(300,10,"logo");
	
	make_line(this,start_message);
	get_keys(this);

}

function get_keys(game) {
	var recentInput = "";
	
	textEntry = game.add.text(30,425, '', textStyle_input);
	
	game.input.keyboard.on('keydown', function (event) {
		var char = String.fromCharCode(event.keyCode);
		console.log(event.keyCode);
		console.log(char);
		if(event.keyCode == 13) { //Enter
			console.log(recentInput);
			textEntry.text = '';
			make_line(game, recentInput);
			drawInputBox(game);
    		recentInput = "";
    		return;
		}
		else if(event.keyCode == 8) { //Delete
    		recentInput = recentInput.substring(0, recentInput.length-1);
    		textEntry.text = recentInput;
    	}
		else if(32 <= event.keyCode && event.keyCode <= 122) {
			recentInput += char;
    		textEntry.text = recentInput;
		}
		else if(event.keyCode == 191) { //Slash
			recentInput += '/';
			textEntry.text = recentInput;
		}
	});
}

function drawInputBox(game) {
	game.add.image(300,430,"inputBox");
	game.add.text(10, 420, ":", textStyle_input_mark);
	game.add.image(300,10,"logo");
	textEntry = game.add.text(30,425, '', textStyle_input);
}

function moveUpEntries() {
	for (var i = 0; i < (entryArray.mark).length; i++) {
		(entryArray.mark[i]).y -= line_h;
		(entryArray.content[i]).y -= line_h;
	}
}

function make_line(game, recentInput) {		
	var comm = command(recentInput);
	
	printUserInput(game, recentInput);
	printCommand(game, comm);
}

function printUserInput(game, recentInput) {
	if(line < MAX_LINE_NUM) line += 1;
	input_line += 1;
	
	var markEntry = game.add.text(10, line_h*line, input_line, textStyle_line_mark);
	var userInputEntry = game.add.text(30, line_h*line, recentInput, textStyle_input);
	
	(entryArray.mark).push(markEntry);
	(entryArray.content).push(userInputEntry);
}

function printCommand(game, comm) {
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
	var command_list = "you can use : /HELP /STACK /GOAL /HELLO /CLEAR";
	var temp_line = line+1;
	
	if(recentInput == "/HELP") {
		return command_list;
	}
	else if(recentInput == start_message){
		return start_message_output;
	}
	else if(recentInput == "/STACK") {
		return "c/c++, python, java, jsp, mysql/oracle, linux";
	}
	else if(recentInput == "/GOAL") {
		return "Studying for Backend Developer, Living for mindful life";
	}
	else if(recentInput == "/JOOMAL") {
		return "me!";
	}
	else if(recentInput == "/HELLO") {
		return "Hello world!";
	}
	else if(recentInput == "/CLEAR") {
		clear();
	}
	else {
		return "unvalid command. check commands list with '/HELP'";
	}
}
