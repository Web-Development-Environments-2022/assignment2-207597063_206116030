var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var user = ""
var modelOn=false;
//array of users
var users = [
	//default user
	{
	  "username": "k",
	  "password": "k",
	  "fullname": "k",
	  "mail": "k@gmail.com",
	  "date": new Date('2017-01-03')
	}
]



$(document).ready(welcome())

function Game(){
	unShowAll();
	var game = document.getElementById("game");
	game.style.display = "block";
	var score = document.getElementById("score");
	score.style.display = "block";
	var time = document.getElementById("time");
	time.style.display = "block";
	context = canvas.getContext("2d");
	Start();
	window.location.href='#game';
}

function welcome(){
	unShowAll();
	var welcome = document.getElementById("welcome");
	welcome.style.display = "block";
	window.location.href='#welcome';
}

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) { //up
		return 1;
	}
	if (keysDown[40]) { //down
		return 2;
	}
	if (keysDown[37]) { //left
		return 3;
	}
	if (keysDown[39]) { //right
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) { //paci
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) { //food
				context.beginPath();
				context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
				context.fillStyle = "gold"; //color
				context.fill();
			} else if (board[i][j] == 4) { //wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "blue"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) { //up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) { //down
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) { //left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) { //right
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}



function unShowAll(){
	var welcome = document.getElementById("welcome");
	welcome.style.display = "none";
	var login = document.getElementById("Login");
	login.style.display = "none";
	var Unregistered = document.getElementById("Unregistered");
	Unregistered.style.display = "none";
	var register = document.getElementById("Register");
	register.style.display = "none";
	var alredySignin = document.getElementById("alredySignin");
	alredySignin.style.display = "none";
	var game = document.getElementById("game");
	game.style.display = "none";
	var score = document.getElementById("score");
	score.style.display = "none";
	var time = document.getElementById("time");
	time.style.display = "none";
}

function showRegister(){
	unShowAll();
	var register = document.getElementById("Register");
	register.style.display = "block";
	var alredySignin = document.getElementById("alredySignin");
	alredySignin.style.display = "block";
	window.location.href='#Register';
}

function showLogin(){
	unShowAll();
	var login = document.getElementById("Login");
	login.style.display = "block";
	var Unregistered = document.getElementById("Unregistered");
	Unregistered.style.display = "block";
	window.location.href='#Login';
}


// opens the model
function showAbout(){
	var modal = document.getElementById("about");
	modal.style.display = "block";
	modelOn=true;
}
// closes the model
function closeModel(){
	var modal = document.getElementById("about");
	modal.style.display = "none";
	modelOn=false;
}

// add an event listner for pressing escape to close the model window
// document.addEventListener("keydown", function(event) {
//     if (keysDown[27]) {
// 		closeModel()
//     }
// });
// add an event listner for click to close the model window
//document.addEventListener("click",closeModel,false);


function registerComplete(){
	var rgularExp = {
        containsNumber : /\d+/,
        containsAlphabet : /[a-zA-Z]/,
        onlyLetters : /^[A-Za-z]+$/,
    }
	var isOk=true;
	var pass=$("#password").value();
	var fullname=$("#fullname").value();
	var mail=$("#mail").value();
	var date=$("#date").value();
	var username=$("#username").value();

	//check all fileds are not empty 
	if(pass.length==0 || fullname.length==0 || mail.length==0 || username.length==0 || date.length==0){
		isOk=false;
	}

	//check password - longer then 6 and has numeric and alphabetic
	else if (pass.length < 6 || !rgularExp.containsNumber.test(pass) || !rgularExp.containsAlphabet.test(pass)){
		isOk=false;
	}

	//check valid mail
	else if(!mail.contains("@")){
		isOk=false;
	}

	//check name has no numbers
	else if(rgularExp.containsNumber.test(fullname)){
		isOk=false;
	}
	// if not ok - go back to register and change
	if(!isOk){
		showRegister()
		console.log("false");
	}
	// if ok - go to login
	else{
		//insert new user to the users array 
		//go to login page
		showLogin()
		console.log("true");

	}

}