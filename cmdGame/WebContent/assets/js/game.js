var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, 
    textStyle_Key, textStyle_Value, bmd;

var correct = [];
var word = "phaser";
var inputText = '';

var rectA;

var Game = {

    create : function() {
        snake = [];                     // sanke.png 를 얼마나 표시할지를 나타낼 변수
        apple = {};                     // 사과
        squareSize = 15;                // 사과/뱀의 1 블럭 사이즈
        score = 0;                      // Game score.
        speed = 0;                      // Game speed.
        updateDelay = 0;                // 게임 스피드와 연계되어 뱀의 속도를 결정짓는 변수
        direction = 'right';            // 시작시 뱀의 방향
        new_direction = null;           // 키 입력시 변경될 뱀의 방향
        addNew = false;                 // 뱀이 사과를 먹었을 때, 새로운 사과를 놓을지 여부
        
        for(var i=0;i<word.length;i++){
        	correct[word[i]]=false;
        }
        
        var chars = [
            [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ],
            [ 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T' ],
            [ 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>' ]
        ];
        var cursor = { x: 0, y: 0 };
 
        // 기본 Phaser 컨트롤러를 keyboard input 으로 받겠다고 명시
        cursors = game.input.keyboard.createCursorKeys();
        
        game.stage.backgroundColor = '#061f27';
        
        bmd = game.make.bitmapData(600,450);
        bmd.context.font = '15px sans-serif';
        bmd.context.fillStyle = '#ffffff';
//        bmd.context.fillText(word, 64, 64);
//        bmd.addToWorld();
 
        // 상단의 텍스트 (점수, 속도)
        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };
        
        // 입력창
        game.add.text(10, 400, ":", textStyle_Value);
        game.add.text(10, 10, "ABOUT JOOMAL", textStyle_Key);
        
        
        console.log("START");
        
        bmd.cls();
        game.input.keyboard.addCallbacks(this, null, null, keyPress2);        
        console.log("END");
        
    } 
};

function keyPress2(char) {
	bmd.cls();
	var event = char.charCodeAt();
	var returnFlag = false;
	console.log(event);
	
	while(true)
	{
	    if(event == 13 || event == 32) {
	    	console.log("STOP");
	    	bmd.cls();
	    	bmd.addToWorld();
	    	returnFlag=true;
	    }
	    else {
	    	console.log("INPUT: "+event);
	    	inputText += char;
	    	console.log("inputText: "+inputText);
	    	returnFlag = true;
	    	break;
	    }
	    if(returnFlag) break;
	}
	
	bmd.context.fillText(inputText, 30, 420);
	bmd.addToWorld();
	console.log("BREAK");
	return;
}

function keyPress(char) {
	bmd.cls();
	var x = 64;
	var bmd2;
	   for (var i = 0; i < word.length; i++)
	    {
	        var letter = word.charAt(i);

	        //  If they pressed one of the letters in the word, flag it as correct
	        if (char === letter)
	        {
	            correct[letter] = true;
	        }

	        //  Now draw the word, letter by letter, changing colour as required
	        if (correct[letter])
	        {
	            bmd.context.fillStyle = '#00ff00';
	        }
	        else
	        {
	            bmd.context.fillStyle = '#ffffff';
	        }
	        
	        bmd.context.fillText(letter, x, 128);
	        bmd2.context.fillText(char, 128, 128);
	        x += bmd.context.measureText(letter).width;
	    }
}