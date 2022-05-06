var context;
var shape = new Object();
shape.i = 0;
shape.j = 0;
var board;
var score;
var audio = new Audio('images/song.mp3');
var pac_color;
var start_time;
var time_elapsed;
var interval; 
var userTitle = "";
var modelOn=false;
const monster1=new Image();
const monster2=new Image();
const monster3=new Image();
const med=new Image();
const angel=new Image();
const clock=new Image();
monster1.src='images/m1.png';
monster2.src='images/m2.png';
monster3.src='images/m3.png';
med.src='images/med1.png';
angel.src='images/angel.png';
clock.src='images/clock.png';



localStorage.clear();
//default user
localStorage.setItem("k",JSON.stringify({
	username: "k",
	password: "k",
	fullname: "k",
	mail: "k@gmail.com",
	date: new Date('2017-01-03')}));

$(document).ready(function() {
	alert("did the ready part");
	welcome();
});


function unShowAll(){
	audio.pause();
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
	var userName = document.getElementById("userName");
	userName.style.display = "none";
	var lifes = document.getElementById("life");
	lifes.style.display = "none";
	var time = document.getElementById("time");
	time.style.display = "none";

}

function Game(){
	unShowAll();
	context = canvas.getContext("2d");
	var game = document.getElementById("game");
	game.style.display = "block";
	var score = document.getElementById("score");
	score.style.display = "block";
	var time = document.getElementById("time");
	time.style.display = "block";
	var userName = document.getElementById("userName");
	userName.style.display = "block";
	var lifes = document.getElementById("life");
	lifes.style.display = "block";
	audio.play();
	window.location.href='#game';
	Start();
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
	var cnt = 144;
	var food_remain = 80;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 12; i++) {
		console.log(i);
		board[i] = new Array();
		for (var j = 0; j < 12; j++) {
			console.log(j);
			if (
				(i == 1 && j == 0) ||
				(i == 7 && j == 0) ||
				(i == 9 && j == 0) ||
				(i == 1 && j == 1) ||
				(i == 2 && j == 1) ||
				(i == 3 && j == 1) ||
				(i == 4 && j == 1) ||
				(i == 7 && j == 1) ||
				(i == 11 && j == 1) ||
				(i == 4 && j == 2) ||
				(i == 7 && j == 2) ||
				(i == 8 && j == 2) ||
				(i == 11 && j == 2) ||
				(i == 2 && j == 3) ||
				(i == 3 && j == 3) ||
				(i == 4 && j == 3) ||
				(i == 5 && j == 3) ||
				(i == 8 && j == 3) ||
				(i == 2 && j == 4) || //maybe delete later
				(i == 8 && j == 4) ||
				(i == 11 && j == 4) ||
				(i == 1 && j == 5) ||
				(i == 2 && j == 5) ||
				(i == 3 && j == 5) ||
				(i == 5 && j == 5) ||
				(i == 6 && j == 5) ||
				(i == 8 && j == 6) ||
				(i == 11 && j == 6) ||
				(i == 0 && j == 7) ||
				(i == 1 && j == 7) ||
				(i == 2 && j == 7) ||
				(i == 3 && j == 7) ||
				(i == 5 && j == 7) ||
				(i == 9 && j == 7) ||
				(i == 1 && j == 8) ||
				(i == 3 && j == 8) ||
				(i == 5 && j == 8) ||
				(i == 7 && j == 8) ||
				(i == 8 && j == 8) ||
				(i == 5 && j == 9) ||
				(i == 7 && j == 9) ||
				(i == 11 && j == 9) ||
				(i == 2 && j == 10) ||
				(i == 5 && j == 10) ||
				(i == 11 && j == 10) ||
				(i == 2 && j == 11) ||
				(i == 5 && j == 11) ||
				(i == 8 && j == 11) 
			) {
				board[i][j] = 4;
			}
			else if((i == 0 && j == 0) ||
			(i == 11 && j == 0) ||
			(i == 0 && j == 11) ||
			(i == 11 && j == 11))
			{
				board[i][j] = 5;


			} 
			else if((i==6 && j==6)){
				board[i][j] = 6;

			}
			else {
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
		console.log("food remain");
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	console.log("out of food remain");
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
	var i = Math.floor(Math.random() * 11 + 1);
	var j = Math.floor(Math.random() * 11+ 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 11 + 1);
		j = Math.floor(Math.random() * 11 + 1);
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

function Draw(x) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblUser.value=userTitle;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 12; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) { //paci
				if(x==1){
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 10, center.y + 10, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if(x==2){
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x +12 , center.y + 10, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();				}
				else if(x==3){
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();				}
				else{
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
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
			else if (board[i][j] == 5) {
				context.drawImage(monster1,center.x,center.y);
			}
			else if (board[i][j] == 6) {
				context.drawImage(angel,center.x,center.y);

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
		Draw(x);
	}
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



function registerComplete(){ 
	var rgularExp = {
        containsNumber : /\d+/,
        containsAlphabet : /[a-zA-Z]/,
        onlyLetters : /^[A-Za-z]+$/,
    }
	var isOk=true;
	var pass= document.getElementById("password").value;
	var fullname= document.getElementById("fullname").value;
	var mail= document.getElementById("mail").value;
	var date= document.getElementById("date").value;
	var username= document.getElementById("username").value;

	//check all fileds are not empty 
	if(pass.length===0 || fullname.length===0 || mail.length===0 || username.length===0 || date.length===0){
		alert("Please fill in all of the fields!");
		isOk=false;
	}

	//check password - longer then 6 and has numeric and alphabetic
	else if (pass.length < 6 || !rgularExp.containsNumber.test(pass) || !rgularExp.containsAlphabet.test(pass)){
		alert("You did not enter details properly! \n\npassword must contain at least 6 characters- numbers and letters.");
		isOk=false;
	}

	//check valid mail
	else if(!mail.includes("@")){
		alert("You did not enter details properly! \n\nMail address is not a valid mail address.");
		isOk=false;
	}

	//check name has no numbers
	else if(rgularExp.containsNumber.test(fullname)){
		alert("You did not enter details properly! \n\nFull name must contain only letters.");
		isOk=false;
	}

	// if not ok - go back to register and change
	if(!isOk){
		showRegister();
		console.log("false");
		return;
	}
	// if ok - start game
	else{
		//insert new user to the users array 
		localStorage.setItem(username,JSON.stringify({username: username, password: pass,
			fullname: fullname, mail: mail, date: date}));
		alert("added success");
		Game();
		
	}
	return;
}

function isUserValid(user, pass) {

	const userLS = JSON.parse(localStorage.getItem(user));
	if (userLS===null){ //user not exist
		return false;
	} 
	else{ //user exist
		if(userLS.password === pass){ //user and password is match
			return true;
		}
		else{ //password wrong
			return false;
		}
	}
  }


function login(){
	var pass= document.getElementById("pswLogin").value;
	var user= document.getElementById("userLogin").value;

	//check all fileds are not empty 
	if(pass.length===0 || user.length===0){
		alert("You did not enter your user name or password!");
		showLogin();
	}
	else{
		if (isUserValid(user, pass)) {
			console.log("true");
			alert("you entered everything ok");
			userTitle = user;
			Game();
			return;

		} else {
			console.log("false");
			alert("Sorry, wrong username and password!");
			showLogin();
			return;
		}	
	}
	return;
}
