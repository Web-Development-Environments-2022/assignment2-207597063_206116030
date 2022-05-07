var context;

//shapes for moving objects
var shape = new Object();
var m1Shape=new Object();
var m2Shape=new Object();
var m3Shape=new Object();
var m4Shape=new Object();
var angShape=new Object();

var board;
var score;
var audio = new Audio('images/song.mp3');
var pac_color;
var start_time;
var time_elapsed;
var interval; 
var userTitle = "";
var modelOn=false;
var numOfLifes=5;
var lastPrased=4;
var hasClock=false;
var hasMed=false;

//load images
const monster1=new Image();
const monster2=new Image();
const med=new Image();
const angel=new Image();
const clock=new Image();
monster1.src='images/ghost2.png';
monster2.src='images/ghost3.png';
med.src='images/pill.png';
angel.src='images/angel.png';
clock.src='images/clock.png';


//create local storage
localStorage.clear();
//default user
localStorage.setItem("k",JSON.stringify({
	username: "k",
	password: "k",
	fullname: "k",
	mail: "k@gmail.com",
	date: new Date('2017-01-03')}));

//load page
$(document).ready(function() {
	alert("did the ready part");
	welcome();
});


//game logic
function Start() {
	board = new Array();
	shape.i = 5;
	shape.j = 0;
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
			(i == 11 && j == 11))
			{
				board[i][j] = 5;
			}
			else if((i == 11 && j == 0) ||
			(i == 0 && j == 11)) {
				board[i][j]=9;
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
					context.arc(center.x, center.y, 20, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 10, center.y + 10, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if(x==2){
					context.beginPath();
					context.arc(center.x, center.y, 20, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x +12 , center.y + 10, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();				}
				else if(x==3){
					context.beginPath();
					context.arc(center.x, center.y, 20, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 5, center.y - 15, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();				}
				else{
					context.beginPath();
					context.arc(center.x, center.y, 20, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 3, 0, 2 * Math.PI); // circle
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
			else if (board[i][j] == 5) { //monster -life -10 score
				context.drawImage(monster1,center.x-15,center.y-15);
			}
			else if (board[i][j] == 6) { // angel +50 score
				context.drawImage(angel,center.x-15,center.y-15);

			}
			else if (board[i][j] == 7) { //med +life
				context.drawImage(med,center.x-15,center.y-15);

			}
			else if (board[i][j] == 8) { //clock + 20 sec
				context.drawImage(clock,center.x-15,center.y-15);

			}
			else if (board[i][j] == 9) { //monster -life -25 score
				context.drawImage(monster2,center.x-15,center.y-15);
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
			lastPrased=1;
		}
	}
	else if (x == 2) { //down
		if (shape.j < 11 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			lastPrased=2;
		}
	}
	else if (x == 3) { //left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			lastPrased=3;
		}
	}
	else if (x == 4) { //right
		if (shape.i < 11 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			lastPrased=4;
		}
	}
	else{
		x=lastPrased;
	}
	if (board[shape.i][shape.j] == 1) { //food
		score++;
	}
	if(board[shape.i][shape.j] == 5){ //monster
		score-=10;
		numOfLifes-=1;
		removeLife();
		drawAfterHit();
	}
	if(board[shape.i][shape.j] == 9){ //monster
		score-=25;
		numOfLifes-=1;
		removeLife();
		drawAfterHit();
	}
	if(board[shape.i][shape.j] == 6){ //angel
		score+=50;
	}
	if(board[shape.i][shape.j] == 7){ //med
		numOfLifes+=1;
		addLife();
		hasMed=false;
	}

	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;

	if(board[shape.i][shape.j] == 8){ //clock
		time_elapsed-=20;
		hasClock=false;
	}
	board[shape.i][shape.j] = 2;
	if(score>=0 && time_elapsed< 50){
		pac_color="yellow"
	}
	if (score < 0 || time_elapsed >= 50) {
		pac_color = "red";
	}
	if(numOfLifes<=2){
		if(!hasMed){
			drawMed();
		}
	}
	if(time_elapsed>=50){
		if(!hasClock){
			drawClock();
		}
	}
	if (score == 70) {
		window.clearInterval(interval);
		window.alert("Game completed");
	}
	else if(numOfLifes==0 || time_elapsed==60){
		window.clearInterval(interval);
		window.alert("Loser");
	}
	else {
		Draw(x);
	}
}

function drawMed(){
//med in random position
hasMed=true;
var x=Math.floor(Math.random() * 6 + 1);
if(x==1){
	board[6][11]=7;

}
else if(x==2){
	board[7][6]=7;

}
else if(x==3){
	board[9][5]=7;

}
else if(x==4){
	board[9][5]=7;

}
else if(x==5){
	board[0][6]=7;

}
else{
	board[10][0]=7;

}

}

function drawClock(){
	//clock in random position
	hasClock=true;
	var x=Math.floor(Math.random() * 6 + 1);
	if(x==1){
		board[4][5]=8;

	}
	else if(x==2){
		board[10][7]=8;

	}
	else if(x==3){
		board[0][9]=8;

	}
	else if(x==4){
		board[2][3]=8;

	}
	else if(x==5){
		board[2][9]=8;

	}
	else{
		board[8][7]=8;

	}

}

function drawAfterHit(){
	//monsters in the corners
	board[0][11]=9;
	board[0][0]=5;
	board[11][11]=5;
	board[11][0]=9;

	//pacman in random position
	var x=Math.floor(Math.random() * 6 + 1);
	if(x==1){
		board[5][2]=2;
		shape.i=5;
		shape.j=2;
	}
	else if(x==2){
		board[6][3]=2;
		shape.i=6;
		shape.j=3;
	}
	else if(x==3){
		board[9][5]=2;
		shape.i=9;
		shape.j=5;
	}
	else if(x==4){
		board[8][9]=2;
		shape.i=8;
		shape.j=9;
	}
	else if(x==5){
		board[4][6]=2;
		shape.i=4;
		shape.j=6;
	}
	else{
		board[0][3]=2;
		shape.i=0;
		shape.j=3;
	}


}

function addLife(){
	if(numOfLifes==5){
		$("#life5").show();
	}
	else if(numOfLifes==4){
		$("#life4").show();
	}
	else if(numOfLifes==3){
		$("#life3").show();
	}
	else if(numOfLifes==2){
		$("#life2").show();
	}
}
function removeLife(){
	if(numOfLifes==4){
		$("#life5").hide();
	}
	else if(numOfLifes==3){
		$("#life4").hide();
	}
	else if(numOfLifes==2){
		$("#life3").hide();
	}
	else if(numOfLifes==1){
		$("#life2").hide();
	}
	else if(numOfLifes==0){
		$("#life1").hide();
	}
}






//Presentation  logic
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
	var canvas = document.getElementById("canvas");
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
